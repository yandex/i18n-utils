import type { Node, Declaration, Result } from 'postcss';
import type { Reporter } from './types';

import { validateRuleWithProps } from './validate';
import { scssValueSplit } from './value-split';
import { hasSome, isDecl, isDeclReported } from './utils';

type ExpandPropProps = {
	node: Node;
	spec: [string[], string[]][];
	isAutofix: boolean;
	result: Result;
	reportedDecls: WeakSet<Declaration>;
	reporter: Reporter;
	shouldExpandValues?: string[];
};

export const expandProp = ({
	node,
	reportedDecls,
	spec,
	result,
	isAutofix,
	reporter,
	shouldExpandValues = [],
}: ExpandPropProps) => {
	spec.forEach(([prop, props]) => {
		validateRuleWithProps(node, prop, (outDateDecl) => {
			const value = scssValueSplit(outDateDecl.value);
			node.error(JSON.stringify({ value, shouldExpandValues }));
			if (!shouldExpandValues?.length || (hasSome(shouldExpandValues, value) && value.length > 1)) {
				if (isAutofix) {
					outDateDecl.cloneBefore({
						prop: props[0],
						value: value[0],
					});
					outDateDecl.cloneAfter({
						prop: props[1],
						value: value[1] || value[0],
					});
					outDateDecl.remove();
				} else if (isDecl(outDateDecl) && !isDeclReported(outDateDecl, reportedDecls)) {
					reporter(outDateDecl, `${props[0]}, ${props[1]}`, result);
					reportedDecls.add(outDateDecl);
				}
			}
		});
	});
};
