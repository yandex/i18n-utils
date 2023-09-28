const postcssValueParser = require('postcss-value-parser');

import type { Node } from 'postcss-value-parser';

const SCSS_NUMERIC_OPERATORS = ['+', '-', '*', '/', '%'];
const END_BRACKETS = ['}', ']'];
const SIGNIFICANT_NODES = ['word', 'div', 'string', 'function'];

const isSignificantNode = (node: Node) => SIGNIFICANT_NODES.includes(node.type);
const stringifyNode = (node: Node) =>
	SCSS_NUMERIC_OPERATORS.includes(node.value) ? node.value : postcssValueParser.stringify(node);

export const scssValueSplit = (input: string): string[] => {
	let values: string[];
	try {
		values = postcssValueParser(input).nodes.filter(isSignificantNode).map(stringifyNode);
	} catch (e) {
		return [];
	}

	const parsedValues: string[] = [];
	let isPrevOperator = false;

	values.forEach((value) => {
		const isOperator = SCSS_NUMERIC_OPERATORS.includes(value);
		const isEndBracket = END_BRACKETS.includes(value);

		if (isOperator || isPrevOperator || isEndBracket) {
			if (!parsedValues.length) {
				parsedValues.push('');
			}

			parsedValues[parsedValues.length - 1] += isOperator ? ` ${value} ` : value;
			isPrevOperator = isOperator;
			return;
		}

		parsedValues.push(value);
	});

	return parsedValues;
};

// console.log(scssValueSplit('3px  0 5px'));
// -> [ '3px', '0', '5px' ]
// console.log(scssValueSplit('3px calc(--bla, 0) 5px'));
// -> [ '3px', 'calc(--bla, 0)', '5px' ]
// console.log(scssValueSplit('3px map-get($spacers, 2) 5px'));
// -> [ '3px', 'map-get($spacers, 2)', '5px' ]
// console.log(scssValueSplit('-#{map-get($spacers, 2)} #{map-get($spacers, 3)} 5px'));
// -> [ '-#{map-get($spacers, 2)}', '#{map-get($spacers, 3)}', '5px' ]
// console.log(scssValueSplit('-#{function("something ) else\')\\" bla", 2)} #{map-get($spacers, 3)} 5px'));
// [ `-#{function("something ) else')\\" bla", 2)}`, '#{map-get($spacers, 3)}', '5px' ]
