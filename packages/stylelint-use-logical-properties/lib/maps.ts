import type { Dir } from './types';

const inline = {
	start: { ltr: 'left', rtl: 'right' },
	end: { ltr: 'right', rtl: 'left' },
};

export const propsThatContainPropsInValue = /^(transition(-property)?|will-change)$/i;

export const shorthand4Prop: [string[], string][] = [
	[['margin-top', 'margin-left', 'margin-bottom', 'margin-right'], 'margin'],
	[['padding-top', 'padding-left', 'padding-bottom', 'padding-right'], 'padding'],
];

export const physicalShorthandProp = ['inset', 'margin', 'padding'];
export const forbiddenShorthandSingleValue = ['inset'];

export const shorthand2Prop = (dir: Dir): [string[], string][] => [
	[['top', 'bottom'], 'inset-block'],
	[[inline.start[dir], inline.end[dir]], 'inset-inline'],
	[['inset-inline-start', 'inset-inline-end'], 'inset-inline'],
	[['inset-block-start', 'inset-block-end'], 'inset-block'],

	[['margin-top', 'margin-bottom'], 'margin-block'],
	[['margin-inline-start', 'margin-inline-end'], 'margin-inline'],
	[['margin-block-start', 'margin-block-end'], 'margin-block'],
	[[`margin-${inline.start[dir]}`, `margin-${inline.end[dir]}`], 'margin-inline'],

	[['padding-top', 'padding-bottom'], 'padding-block'],
	[['padding-inline-start', 'padding-inline-end'], 'padding-inline'],
	[['padding-block-start', 'padding-block-end'], 'padding-block'],
	[[`padding-${inline.start[dir]}`, `padding-${inline.end[dir]}`], 'padding-inline'],
];

export const mappings = (dir: Dir): [string[], string][] => [
	[['top'], 'inset-block-start'],
	[['bottom'], 'inset-block-end'],
	[[inline.start[dir]], 'inset-inline-start'],
	[[inline.end[dir]], 'inset-inline-end'],

	[['margin-top'], 'margin-block-start'],
	[['margin-bottom'], 'margin-block-end'],
	[[`margin-${inline.start[dir]}`], 'margin-inline-start'],
	[[`margin-${inline.end[dir]}`], 'margin-inline-end'],

	[['padding-top'], 'padding-block-start'],
	[['padding-bottom'], 'padding-block-end'],
	[[`padding-${inline.start[dir]}`], 'padding-inline-start'],
	[[`padding-${inline.end[dir]}`], 'padding-inline-end'],

	// border
	[['border-top'], 'border-block-start'],
	[['border-bottom'], 'border-block-end'],
	[[`border-${inline.start[dir]}`], 'border-inline-start'],
	[[`border-${inline.end[dir]}`], 'border-inline-end'],

	[['border-top-color'], 'border-block-start-color'],
	[['border-top-style'], 'border-block-start-style'],
	[['border-top-width'], 'border-block-start-width'],
	[['border-bottom-color'], 'border-block-end-color'],
	[['border-bottom-style'], 'border-block-end-style'],
	[['border-bottom-width'], 'border-block-end-width'],

	[[`border-${inline.start[dir]}-color`], 'border-inline-start-color'],
	[[`border-${inline.start[dir]}-style`], 'border-inline-start-style'],
	[[`border-${inline.start[dir]}-width`], 'border-inline-start-width'],
	[[`border-${inline.end[dir]}-color`], 'border-inline-end-color'],
	[[`border-${inline.end[dir]}-style`], 'border-inline-end-style'],
	[[`border-${inline.end[dir]}-width`], 'border-inline-end-width'],

	[[`border-top-${inline.start[dir]}-radius`], 'border-start-start-radius'],
	[[`border-bottom-${inline.start[dir]}-radius`], 'border-end-start-radius'],
	[[`border-top-${inline.end[dir]}-radius`], 'border-start-end-radius'],
	[[`border-bottom-${inline.end[dir]}-radius`], 'border-end-end-radius'],
];

export const physicalValue = (dir: Dir): [RegExp, Record<string, string>][] => [
	[
		/^clear$/i,
		{
			[inline.start[dir]]: 'inline-start',
			[inline.end[dir]]: 'inline-end',
		},
	],
	[
		/^float$/i,
		{
			[inline.start[dir]]: 'inline-start',
			[inline.end[dir]]: 'inline-end',
		},
	],
	[
		/^text-align$/i,
		{
			[inline.start[dir]]: 'start',
			[inline.end[dir]]: 'end',
		},
	],
];

export const migrationExpandSpec: [string[], string[]][] = [
	[['margin-start'], ['margin-block-start', 'margin-inline-start']],
	[['margin-end'], ['margin-block-end', 'margin-inline-end']],

	[['padding-start'], ['padding-block-start', 'padding-inline-start']],
	[['padding-end'], ['padding-block-end', 'padding-inline-end']],

	[['inset-start'], ['inset-inline-start', 'inset-block-start']],
	[['inset-end'], ['inset-inline-end', 'inset-block-end']],
];

export const shorthandsExpandSpec: [string[], string[]][] = [
	[['margin-inline'], ['margin-inline-start', 'margin-inline-end']],
	[['margin-block'], ['margin-block-start', 'margin-block-end']],

	[['padding-inline'], ['padding-inline-start', 'padding-inline-end']],
	[['padding-block'], ['padding-block-start', 'padding-block-end']],

	[['inset-inline'], ['inset-inline-start', 'inset-inline-end']],
	[['inset-block'], ['inset-block-start', 'inset-block-end']],
];

/**
 * Global values due to https://developer.mozilla.org/en-US/docs/Web/CSS/padding-inline#syntax
 * These values can't be combined in shorthands
 * On these values based two logics:
 * - don't shorthand props if there are value from this array
 * - if shorthands with some of these props found - expand it to full props
 */
export const singleValuesOnly = ['initial', 'unset', 'revert', 'revert-layer', 'inherit']
