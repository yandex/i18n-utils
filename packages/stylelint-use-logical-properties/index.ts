import type { LogicalProps, Method } from './lib/types';
import type { Declaration, Node, Result } from 'postcss';

import stylelint  from "stylelint";
import {
	mappings,
	shorthand2Prop,
	physicalShorthandProp,
	shorthand4Prop,
	physicalValue,
	migrationExpandSpec,
	propsThatContainPropsInValue,
	shorthandsExpandSpec,
	forbiddenShorthandSingleValue, singleValuesOnly
} from "./lib/maps";
import { validateRuleWithProps } from './lib/validate';
import { scssValueSplit } from './lib/value-split';
import ruleName from './lib/rule-name';
import walk from './lib/walk';
import {
	isContextAutoFixing,
	isDecl,
	isDeclAnException,
	isDeclReported,
	isMethodAllowShortHands,
	isMethodAlways,
	isMethodIndifferent,
	isNodeMatchingDecl,
	isSingleDeclValueOnly,
	isValueAnException,
} from './lib/utils';
import {
	reportGlobalValue,
	reportShorthandedProp,
	reportUnexpectedProperty,
	reportUnexpectedValue,
	reportUnsupportedProp
} from "./lib/reports";
import { expandProp } from './lib/expand-prop';
import { reduceCssValues } from './lib/reduce-css-values';
import { convertToLogicalValues } from './lib/convert-to-logical-values';

const reportedDecls = new WeakSet<Declaration>();

// TS ожидает, что сразу в правиле будет ruleName и message, они же экспортируются отдельно
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export default stylelint.createPlugin(ruleName, (method: Method, opts, context) => {
	const propExceptions = [].concat(Object(opts).except || []);
	const isAutofix = isContextAutoFixing(context);
	const dir = /^rtl$/i.test(Object(opts).direction) ? 'rtl' : 'ltr';

	return (root: Node, result: Result) => {
		// validate the method
		const isMethodValid = stylelint.utils.validateOptions(result, ruleName, {
			actual: method,
			possible() {
				return (
					isMethodIndifferent(method) || isMethodAlways(method) || isMethodAllowShortHands(method)
				);
			},
		});

		if (isMethodValid && (isMethodAlways(method) || isMethodAllowShortHands(method))) {
			walk(root, (node) => {
				// MIGRATION from out of date props https://github.com/csstools/stylelint-use-logical/issues/1
				expandProp({
					node,
					result,
					reportedDecls,
					isAutofix,
					spec: migrationExpandSpec,
					reporter: reportUnsupportedProp,
				});

				if (isMethodAlways(method)) {
					expandProp({
						node,
						result,
						reportedDecls,
						isAutofix,
						spec: shorthandsExpandSpec,
						reporter: reportShorthandedProp,
					});
				}

				expandProp({
					node,
					result,
					reportedDecls,
					isAutofix,
					spec: shorthandsExpandSpec,
					reporter: reportGlobalValue,
					shouldExpandValues: singleValuesOnly,
				});

				/* logical shorthands do not work yet in browsers */
				/* but we can still use shorthand if all values are the same */
				// validate or autofix 4 physical properties as logical shorthands
				shorthand4Prop.forEach(([props, prop]) => {
					validateRuleWithProps(
						node,
						props,
						(
							blockStartDecl: Declaration,
							inlineStartDecl: Declaration,
							blockEndDecl: Declaration,
							inlineEndDecl: Declaration,
						) => {
							const firstInlineDecl = blockStartDecl;
							const values = reduceCssValues([
								blockStartDecl.value,
								inlineStartDecl.value,
								blockEndDecl.value,
								inlineEndDecl.value,
							]);
							if (
								!isDeclAnException(blockStartDecl, propExceptions) &&
								!isDeclAnException(inlineStartDecl, propExceptions) &&
								!isDeclAnException(blockEndDecl, propExceptions) &&
								!isDeclAnException(inlineEndDecl, propExceptions) &&
								values.length === 1 // only report issues if there is 1 value after shortening
							) {
								if (isAutofix && isDecl(firstInlineDecl)) {
									firstInlineDecl.cloneBefore({
										prop,
										value: values.join(' '),
									});

									blockStartDecl.remove();
									inlineStartDecl.remove();
									blockEndDecl.remove();
									inlineEndDecl.remove();
								} else if (
									!isDeclReported(blockStartDecl, reportedDecls) &&
									!isDeclReported(inlineStartDecl, reportedDecls) &&
									!isDeclReported(blockEndDecl, reportedDecls) &&
									!isDeclReported(inlineEndDecl, reportedDecls)
								) {
									reportUnexpectedProperty(firstInlineDecl, prop, result);

									reportedDecls.add(blockStartDecl);
									reportedDecls.add(inlineStartDecl);
									reportedDecls.add(blockEndDecl);
									reportedDecls.add(inlineEndDecl);
								}
							}
						},
					);
				});

				// validate or autofix shorthand properties that are not supported
				physicalShorthandProp.forEach((prop) => {
					validateRuleWithProps(node, [prop], (physicalDecl) => {
						if (!isDecl(physicalDecl)) return;
						const values = scssValueSplit(physicalDecl.value);
						if (
							!isDeclAnException(physicalDecl, propExceptions) &&
							(values.length !== 1 || forbiddenShorthandSingleValue.includes(physicalDecl.prop))
						) {
							if (isAutofix) {
								const logicalValues = convertToLogicalValues(values, dir);
								const logicalProps: LogicalProps[] = isMethodAllowShortHands(method)
									? ['block', 'inline']
									: ['block-start', 'block-end', 'inline-start', 'inline-end'];

								logicalProps.forEach((type) => {
									physicalDecl.cloneBefore({
										prop: prop + '-' + type,
										value: logicalValues[type],
									});
								});

								physicalDecl.remove();
							} else if (!isDeclReported(physicalDecl, reportedDecls)) {
								const message = isMethodAlways(method)
									? `${prop}-block-start, ${prop}-block-end, ${prop}-inline-start and ${prop}-inline-end`
									: `${prop}-block and ${prop}-inline`;
								reportUnexpectedProperty(physicalDecl, message, result);

								reportedDecls.add(physicalDecl);
							}
						}
					});
				});

				if (isMethodAllowShortHands(method)) {
					// validate or autofix 2 physical properties as logical shorthands
					shorthand2Prop(dir).forEach(([props, prop]) => {
						validateRuleWithProps(
							node,
							props,
							(
								startDecl: Declaration,
								startIndex: number,
								endDecl: Declaration,
								endStartIndex: number,
							) => {
								const firstInlineDecl = startIndex < endStartIndex ? startDecl : endDecl;

								if (
									!isDeclAnException(startDecl, propExceptions) &&
									!isDeclAnException(endDecl, propExceptions) &&
									!isSingleDeclValueOnly(startDecl) &&
									!isSingleDeclValueOnly(endDecl)
								) {
									if (isAutofix) {
										firstInlineDecl.cloneBefore({
											prop,
											value:
												startDecl.value === endDecl.value
													? startDecl.value
													: [startDecl.value, endDecl.value].join(' '),
										});

										startDecl.remove();
										endDecl.remove();
									} else if (
										!isDeclReported(startDecl, reportedDecls) &&
										!isDeclReported(endDecl, reportedDecls)
									) {
										reportUnexpectedProperty(firstInlineDecl, prop, result);

										reportedDecls.add(startDecl);
										reportedDecls.add(endDecl);
									}
								}
							},
						);
					});
				}

				// validate or autofix physical properties as logical
				mappings(dir).forEach(([props, prop]) => {
					validateRuleWithProps(node, props, (physicalDecl) => {
						if (!isDeclAnException(physicalDecl, propExceptions)) {
							if (isAutofix) {
								physicalDecl.prop = prop;
							} else if (!isDeclReported(physicalDecl, reportedDecls)) {
								reportUnexpectedProperty(physicalDecl, prop, result);

								reportedDecls.add(physicalDecl);
							}
						}
					});
				});

				// validate or autofix physical values as logical
				physicalValue(dir).forEach(([regexp, props]) => {
					if (
						isNodeMatchingDecl(node, regexp) &&
						isDecl(node) &&
						!isDeclAnException(node, propExceptions)
					) {
						const valueKey = node.value.toLowerCase();

						if (valueKey in props) {
							const value = props[valueKey];

							if (isAutofix) {
								node.value = value;
							} else {
								reportUnexpectedValue(node, value, result);

								reportedDecls.add(node);
							}
						}
					}
				});

				// validate or autofix physical values containing properties as logical
				if (isNodeMatchingDecl(node, propsThatContainPropsInValue) && isDecl(node)) {
					const originalValue = node.value.toLowerCase();
					let value = originalValue;

					mappings(dir).forEach(([props, prop]) => {
						if (!isDeclAnException(node, propExceptions) && Array.isArray(props)) {
							props.forEach((searchProp) => {
								if (!isValueAnException(searchProp, propExceptions)) {
									const regex = new RegExp('(?<!-)' + searchProp + '(?!-)', 'g');
									if (regex.test(value)) {
										value = value.replace(regex, prop);
									}
								}
							});
						}
					});

					if (value !== originalValue) {
						if (isAutofix) {
							node.value = value;
						} else {
							reportUnexpectedValue(node, value, result);

							reportedDecls.add(node);
						}
					}
				}
			});
		}
	};
});

export { ruleName };
