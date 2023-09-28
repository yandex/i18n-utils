import type { Dir, LogicalProps } from './types';

import { scssValueSplit } from './value-split';

const optimizeCssValues = (value: string): string => {
	if (!value) return '';

	const values = scssValueSplit(value);
	if (values.length === 2 && values[0] === values[1]) {
		return values[0];
	}
	return value;
};

export const convertToLogicalValues = (input: string[], dir: Dir): Record<LogicalProps, string> => {
	let block = '',
		inline = '',
		inlineStart = '',
		inlineEnd = '',
		blockStart = '',
		blockEnd = '';

	if (input.length === 1) {
		block = blockStart = blockEnd = input[0];
		inline = inlineStart = inlineEnd = input[0];
	}

	if (input.length === 2) {
		block = blockStart = blockEnd = input[0];
		inline = inlineStart = inlineEnd = input[1];
	}

	if (input.length === 3) {
		block = input[0] + ' ' + input[2];
		blockStart = input[0];
		blockEnd = input[2];

		inline = inlineStart = inlineEnd = input[1];
	}

	if (input.length === 4) {
		block = input[0] + ' ' + input[2];
		blockStart = input[0];
		blockEnd = input[2];

		inline = dir === 'ltr' ? input[3] + ' ' + input[1] : input[1] + ' ' + input[3];
		inlineStart = dir === 'ltr' ? input[3] : input[1];
		inlineEnd = dir === 'ltr' ? input[1] : input[3];
	}

	return {
		block: optimizeCssValues(block),
		inline: optimizeCssValues(inline),
		'block-end': blockEnd,
		'block-start': blockStart,
		'inline-end': inlineEnd,
		'inline-start': inlineStart,
	};
};
