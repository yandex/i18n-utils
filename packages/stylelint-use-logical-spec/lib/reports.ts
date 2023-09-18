import type { Reporter } from './types';

import stylelint from 'stylelint';
import messages from './messages';
import ruleName from './rule-name';

export const reportUnexpectedProperty: Reporter = (decl, logicalProperty, result) =>
	stylelint.utils.report({
		message: messages.unexpectedProp(decl.prop, logicalProperty),
		node: decl,
		result,
		ruleName,
	});

export const reportUnsupportedProp: Reporter = (decl, logicalProperty, result) =>
	stylelint.utils.report({
		message: messages.unsupportedProp(decl.prop, logicalProperty),
		node: decl,
		result,
		ruleName,
	});

export const reportUnexpectedValue: Reporter = (node, value, result) =>
	stylelint.utils.report({
		message: messages.unexpectedValue(node.prop, node.value, value),
		node,
		result,
		ruleName,
	});

export const reportShorthandedProp: Reporter = (decl, logicalProperty, result) =>
	stylelint.utils.report({
		message: messages.shorthandedProp(decl.prop, logicalProperty),
		node: decl,
		result,
		ruleName,
	});

export const reportGlobalValue: Reporter = (decl, logicalProperty, result) =>
	stylelint.utils.report({
		message: messages.globalValuesProp(decl.prop, logicalProperty),
		node: decl,
		result,
		ruleName,
	});
