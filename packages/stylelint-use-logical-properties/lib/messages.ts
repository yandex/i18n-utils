import stylelint from 'stylelint';
import ruleName from './rule-name';

export default stylelint.utils.ruleMessages(ruleName, {
	unexpectedProp(physicalProperty, logicalProperty) {
		return `Unexpected "${physicalProperty}" property. Use "${logicalProperty}".`;
	},
	unexpectedValue(property, physicalValue, logicalValue) {
		return `Unexpected "${physicalValue}" value in "${property}" property. Use "${logicalValue}".`;
	},
	unsupportedProp(physicalProperty, logicalAnalogs) {
		return `"${physicalProperty}" is not part of CSS specs. Use "${logicalAnalogs}".`;
	},
	shorthandedProp(shorthandProperty, logicalAnalogs) {
		return `"${shorthandProperty}" is a shorthand which not allowed with always option. Use expanded props like "${logicalAnalogs}".`;
	},
	globalValuesProp(shorthandProperty, logicalAnalogs) {
		return `"${shorthandProperty}" is a shorthand where global value exist. Use separate props like "${logicalAnalogs}" for this.`;
	},
});
