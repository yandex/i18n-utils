module.exports = {
	'use-logical-spec': [
		{
			source: 'body { margin-start: 0; }',
			expect: 'body { margin-block-start: 0; margin-inline-start: 0; }',
			args: 'always',
		},
		{
			source: 'body { margin-end: 0; }',
			expect: 'body { margin-block-end: 0; margin-inline-end: 0; }',
			args: 'always',
		},
		{
			source: 'body { margin: -23px 0 20px -23px; }',
			expect: 'body { margin-block: -23px 20px; margin-inline: -23px 0; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin: -23px 0 20px -23px; }',
			expect:
				'body { margin-block-start: -23px; margin-block-end: 20px; margin-inline-start: -23px; margin-inline-end: 0; }',
			args: 'always',
		},
		{
			source: 'body { margin-inline: -23px 20px; }',
			expect: 'body { margin-inline-start: -23px; margin-inline-end: 20px; }',
			args: 'always',
		},
		{
			source: 'body { margin-inline: -23px 20px; }',
			warnings: [
				'"margin-inline" is a shorthand which not allowed with always option. Use expanded props like "margin-inline-start, margin-inline-end". (use-logical-spec)',
			],
			args: 'always',
		},
		{
			source: 'body { margin-inline: -23px 20px; }',
			warnings: 0,
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-end: 0; }',
			warnings: [
				'"padding-end" is not part of CSS specs. Use "padding-block-end, padding-inline-end". (use-logical-spec)',
			],
			args: 'always',
		},
		{
			source: 'body { left: 0 }',
			args: 'always',
			warnings: 1,
		},
		{
			source: 'body { left: 0 }',
			args: ['always', { except: 'left' }],
			warnings: 0,
		},
		{
			source: 'body { top: 0; left: 0 }',
			args: 'always',
			warnings: 2,
		},
		{
			source: 'body { border-left: 0; left: 0 }',
			args: 'always',
			warnings: 2,
		},
		{
			source: 'body { top: 0; margin-left: 0 }',
			args: 'always',
			warnings: 2,
		},
		{
			source: 'body { top: 0; margin-left: 0 }',
			args: ['always', { except: ['top', /^margin/] }],
			warnings: 0,
		},
		{
			source: 'body { padding-left: 0; margin-right: 0 }',
			args: 'always',
			warnings: 2,
		},
		{
			source: 'body { clear: left }',
			args: 'always',
			warnings: 1,
		},
		{
			source: 'body { float: left }',
			args: 'always',
			warnings: 1,
		},
		{
			source: 'body { text-align: left }',
			args: 'always',
			warnings: 1,
		},
		{
			source: 'body:dir(ltr) { top: 0; margin-left: 0; float: left }',
			args: 'always',
			warnings: 0,
		},
		{
			source: 'body { padding-left: 10px; padding-right: 20px; }',
			expect: 'body { padding-inline: 10px 20px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-left: 10px; padding-right: 20px; }',
			expect: 'body { padding-inline-start: 10px; padding-inline-end: 20px; }',
			args: 'always',
		},
		{
			source: 'body { padding-inline: 10px 20px; }',
			warnings: 0,
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-inline: 10px 20px; }',
			warnings: 1,
			args: 'always',
		},
		{
			source: 'body { left: 0 }',
			expect: 'body { inset-inline-start: 0 }',
			args: 'always',
		},
		{
			source: 'body { left: 0; right: 0 }',
			expect: 'body { inset-inline: 0 }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { left: 0; right: 1px; }',
			expect: 'body { inset-inline: 0 1px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { left: 0; right: 1px; }',
			expect: 'body { inset-inline-start: 0; inset-inline-end: 1px; }',
			args: 'always',
		},
		{
			source: 'body { top: 0; right: 0; bottom: 0; left: 0 }',
			expect:
				'body { inset-block-start: 0; inset-inline-end: 0; inset-block-end: 0; inset-inline-start: 0 }',
			args: 'always',
		},
		{
			source: 'body { top: 0; right: 0; bottom: 0; left: 0 }',
			expect: 'body { inset-block: 0; inset-inline: 0 }',
			args: 'allow-shorthands',
		},
		{
			source:
				'body { margin-top: 10px; margin-right: 10px; margin-bottom: 10px; margin-left: 10px }',
			expect: 'body { margin: 10px }',
			args: 'always',
		},
		{
			source: 'body { top: 10px; right: 20px; bottom: 10px; left: 20px }',
			expect: 'body { inset-block: 10px; inset-inline: 20px }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { top: 10px; right: 20px; bottom: 10px; left: 20px }',
			expect:
				'body { inset-block-start: 10px; inset-inline-end: 20px; inset-block-end: 10px; inset-inline-start: 20px }',
			args: 'always',
		},
		{
			source: 'body { top: 10px; right: 20px; bottom: 20px; left: 20px }',
			expect: 'body { inset-block: 10px 20px; inset-inline: 20px }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { top: 10px; right: 20px; bottom: 20px; left: 20px }',
			expect:
				'body { inset-block-start: 10px; inset-inline-end: 20px; inset-block-end: 20px; inset-inline-start: 20px }',
			args: 'always',
		},
		{
			source: 'body { top: 10px; right: 20px; bottom: 20px; left: 30px }',
			expect: 'body { inset-block: 10px 20px; inset-inline: 30px 20px }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { top: 10px; right: 20px; bottom: 20px; left: 30px }',
			expect:
				'body { inset-block-start: 10px; inset-inline-end: 20px; inset-block-end: 20px; inset-inline-start: 30px }',
			args: 'always',
		},
		{
			source: 'body { top: 10px; right: 20px; bottom: 20px; left: 30px }',
			expect: 'body { inset-block: 10px 20px; inset-inline: 20px 30px }',
			args: ['allow-shorthands', { direction: 'rtl' }],
		},
		{
			source: 'body { top: 10px; right: 20px; bottom: 20px; left: 30px }',
			expect:
				'body { inset-block-start: 10px; inset-inline-start: 20px; inset-block-end: 20px; inset-inline-end: 30px }',
			args: ['always', { direction: 'rtl' }],
		},
		{
			source: 'body { margin: 0; }',
			expect: 'body { margin: 0; }',
			args: 'always',
		},
		{
			source: 'body { padding: 20px 0; }',
			expect: 'body { padding-block: 20px; padding-inline: 0; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding: 20px 0; }',
			expect:
				'body { padding-block-start: 20px; padding-block-end: 20px; padding-inline-start: 0; padding-inline-end: 0; }',
			args: 'always',
		},
		{
			source: 'body { inset: 20px 30px 10px; }',
			expect: 'body { inset-block: 20px 10px; inset-inline: 30px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { inset: 20px 30px 10px; }',
			expect:
				'body { inset-block-start: 20px; inset-block-end: 10px; inset-inline-start: 30px; inset-inline-end: 30px; }',
			args: 'always',
		},
		{
			source: 'body { inset: calc(20px * 1) calc(30px * 1) calc(10px * 1); }',
			expect: 'body { inset-block: calc(20px * 1) calc(10px * 1); inset-inline: calc(30px * 1); }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { inset: calc(20px * 1) calc(30px * 1) calc(10px * 1); }',
			expect:
				'body { inset-block-start: calc(20px * 1); inset-block-end: calc(10px * 1); inset-inline-start: calc(30px * 1); inset-inline-end: calc(30px * 1); }',
			args: 'always',
		},
		{
			source: 'body { margin: 20px 30px 10px 40px; }',
			expect: 'body { margin-block: 20px 10px; margin-inline: 40px 30px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin: 20px 30px 10px 40px; }',
			expect:
				'body { margin-block-start: 20px; margin-block-end: 10px; margin-inline-start: 40px; margin-inline-end: 30px; }',
			args: 'always',
		},
		{
			source: 'body { margin: 20px 30px 10px 40px; }',
			expect: 'body { margin-block: 20px 10px; margin-inline: 30px 40px; }',
			args: ['allow-shorthands', { direction: 'rtl' }],
		},
		{
			source: 'body { margin: 20px 30px 10px 40px; }',
			expect:
				'body { margin-block-start: 20px; margin-block-end: 10px; margin-inline-start: 30px; margin-inline-end: 40px; }',
			args: ['always', { direction: 'rtl' }],
		},
		{
			source: 'body { margin-top: 0; margin-right: 0; margin-bottom: 0; margin-left: 0 }',
			expect: 'body { margin: 0 }',
			args: 'always',
		},
		{
			source:
				'body { margin-top: 10px; margin-right: 20px; margin-bottom: 10px; margin-left: 20px }',
			expect: 'body { margin-block: 10px; margin-inline: 20px }',
			args: 'allow-shorthands',
		},
		{
			source:
				'body { margin-top: 10px; margin-right: 20px; margin-bottom: 10px; margin-left: 20px }',
			expect:
				'body { margin-block-start: 10px; margin-inline-end: 20px; margin-block-end: 10px; margin-inline-start: 20px }',
			args: 'always',
		},
		{
			source:
				'body { padding-top: 10px; padding-right: 20px; padding-bottom: 20px; padding-left: 20px }',
			expect: 'body { padding-block: 10px 20px; padding-inline: 20px }',
			args: 'allow-shorthands',
		},
		{
			source:
				'body { padding-top: 10px; padding-right: 20px; padding-bottom: 40px; padding-left: 30px }',
			expect:
				'body { padding-block-start: 10px; padding-inline-end: 20px; padding-block-end: 40px; padding-inline-start: 30px }',
			args: 'always',
		},
		{
			source:
				'body { padding-top: 10px; padding-right: 20px; padding-bottom: 20px; padding-left: 30px }',
			expect: 'body { padding-block: 10px 20px; padding-inline: 30px 20px }',
			args: 'allow-shorthands',
		},
		{
			source:
				'body { padding-top: 10px; padding-right: 20px; padding-bottom: 20px; padding-left: 30px }',
			expect:
				'body { padding-block-start: 10px; padding-inline-end: 20px; padding-block-end: 20px; padding-inline-start: 30px }',
			args: 'always',
		},
		{
			source: 'body { margin-top: 0; margin-right: 0; margin-bottom: 0; }',
			expect: 'body { margin-block: 0; margin-inline-end: 0; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-top: 10px; margin-right: 0; margin-bottom: 20px; }',
			expect: 'body { margin-block-start: 10px; margin-inline-end: 0; margin-block-end: 20px; }',
			args: 'always',
		},
		{
			source: 'body { margin-top: 0; margin-right: 0; margin-bottom: 0; }',
			expect: 'body { margin-block: 0; margin-inline-start: 0; }',
			args: ['allow-shorthands', { direction: 'rtl' }],
		},
		{
			source: 'body { margin-top: 10px; margin-right: 0; margin-bottom: 20px; }',
			expect: 'body { margin-block-start: 10px; margin-inline-end: 0; margin-block-end: 20px; }',
			args: 'always',
		},
		{
			source: 'body { margin-top: 10px; margin-right: 0; margin-bottom: 20px; }',
			expect: 'body { margin-block-start: 10px; margin-inline-start: 0; margin-block-end: 20px; }',
			args: ['always', { direction: 'rtl' }],
		},
		{
			source: 'body { margin-left: 0; }',
			expect: 'body { margin-inline-start: 0; }',
			args: 'always',
		},
		{
			source: 'body { clear: left }',
			expect: 'body { clear: inline-start }',
			args: 'always',
		},
		{
			source: 'body { float: right }',
			expect: 'body { float: inline-end }',
			args: 'always',
		},
		{
			source: 'body { text-align: left }',
			expect: 'body { text-align: start }',
			args: 'always',
		},
		{
			source: 'body:dir(ltr) { text-align: left }',
			expect: 'body:dir(ltr) { text-align: left }',
			args: ['always'],
		},
		{
			source: 'body { float: left; text-align: left }',
			expect: 'body { float: left; text-align: start }',
			args: [
				'always',
				{
					except: [/^float$/i],
				},
			],
		},
		{
			source: 'body { border-left: 0; }',
			expect: 'body { border-inline-start: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-right: 0; }',
			expect: 'body { border-inline-end: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-top: 0; }',
			expect: 'body { border-block-start: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-bottom: 0; }',
			expect: 'body { border-block-end: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-left-color: 0; }',
			expect: 'body { border-inline-start-color: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-right-color: 0; }',
			expect: 'body { border-inline-end-color: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-top-color: 0; }',
			expect: 'body { border-block-start-color: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-bottom-color: 0; }',
			expect: 'body { border-block-end-color: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-left-style: 0; }',
			expect: 'body { border-inline-start-style: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-right-style: 0; }',
			expect: 'body { border-inline-end-style: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-top-style: 0; }',
			expect: 'body { border-block-start-style: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-bottom-style: 0; }',
			expect: 'body { border-block-end-style: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-left-width: 0; }',
			expect: 'body { border-inline-start-width: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-right-width: 0; }',
			expect: 'body { border-inline-end-width: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-top-width: 0; }',
			expect: 'body { border-block-start-width: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-bottom-width: 0; }',
			expect: 'body { border-block-end-width: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-top-left-radius: 0; }',
			expect: 'body { border-start-start-radius: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-top-right-radius: 0; }',
			expect: 'body { border-start-end-radius: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-bottom-left-radius: 0; }',
			expect: 'body { border-end-start-radius: 0; }',
			args: 'always',
		},
		{
			source: 'body { border-bottom-right-radius: 0; }',
			expect: 'body { border-end-end-radius: 0; }',
			args: 'always',
		},
		{
			source: 'body { margin-top: 0.5rem; margin-bottom: 0.5rem; }',
			expect: 'body { margin-top: 0.5rem; margin-bottom: 0.5rem; }',
			args: ['always', { except: ['margin-top', 'margin-bottom'] }],
			warnings: 0,
		},
		{
			source: 'body { height: 250rem; }',
			expect: 'body { height: 250rem; }',
			args: 'always',
		},
		{
			source: 'body { min-height: 250rem; }',
			expect: 'body { min-height: 250rem; }',
			args: 'always',
		},
		{
			source: 'body { max-height: 250rem; }',
			expect: 'body { max-height: 250rem; }',
			args: 'always',
		},
		{
			source: 'body { width: 250rem; }',
			expect: 'body { width: 250rem; }',
			args: 'always',
		},
		{
			source: 'body { min-width: 250rem; }',
			expect: 'body { min-width: 250rem; }',
			args: 'always',
		},
		{
			source: 'body { max-width: 250rem; }',
			expect: 'body { max-width: 250rem; }',
			args: 'always',
		},
		{
			source: 'body { transition-property: border-top-color; }',
			expect: 'body { transition-property: border-block-start-color; }',
			args: 'always',
		},
		{
			source: 'body { will-change: padding-left; }',
			expect: 'body { will-change: padding-inline-start; }',
			args: 'always',
		},
		{
			source: 'body { transition: width 1s, top 2s, left 3s; }',
			expect: 'body { transition: width 1s, inset-block-start 2s, inset-inline-start 3s; }',
			args: 'always',
		},
		{
			source: 'body { transition: width 1s, top 2s, left 3s; }',
			expect: 'body { transition: width 1s, inset-block-start 2s, inset-inline-end 3s; }',
			args: ['always', { direction: 'rtl' }],
		},
		{
			source: 'body { transition: width 1s, top 2s, left 3s; }',
			expect: 'body { transition: width 1s, inset-block-start 2s, inset-inline-start 3s; }',
			args: ['always', { except: ['width'] }],
		},
		{
			source: 'body { will-change: padding-left; transition: width 1s, top 2s, left 3s; }',
			warnings: 2,
			args: 'always',
		},
		{
			source: 'body { margin: 20px; }',
			expect: 'body { margin: 20px; }',
			args: 'always',
		},
		{
			source: 'body { margin: map-get($spacers, 4); }',
			expect: 'body { margin: map-get($spacers, 4); }',
			args: 'always',
		},
		{
			source: 'body { margin: map-get($spacers, 4) map-get($spacers, 2); }',
			expect: 'body { margin-block: map-get($spacers, 4); margin-inline: map-get($spacers, 2); }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin: map-get($spacers, 4) map-get($spacers, 2); }',
			expect:
				'body { margin-block-start: map-get($spacers, 4); margin-block-end: map-get($spacers, 4); margin-inline-start: map-get($spacers, 2); margin-inline-end: map-get($spacers, 2); }',
			args: 'always',
		},
		{
			source: 'body { padding: 10px 0 20px; }',
			expect: 'body { padding-block: 10px 20px; padding-inline: 0; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding: 10px 0 20px; }',
			expect:
				'body { padding-block-start: 10px; padding-block-end: 20px; padding-inline-start: 0; padding-inline-end: 0; }',
			args: 'always',
		},
		{
			source: 'body { padding-inline: 10px; padding-block: 20px; }',
			expect: 'body { padding-inline: 10px; padding-block: 20px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-inline: 10px; padding-block: 20px; }',
			warnings: 0,
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-inline: 10px; padding-block: 20px; }',
			expect:
				'body { padding-inline-start: 10px; padding-inline-end: 10px; padding-block-start: 20px; padding-block-end: 20px; }',
			args: 'always',
		},
		{
			source: 'body { padding-inline: 10px; padding-block: 20px; }',
			warnings: 2,
			args: 'always',
		},
		{
			source: 'body { inset-inline: 10px 30px; inset-block: 20px; }',
			expect: 'body { inset-inline: 10px 30px; inset-block: 20px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { inset-inline: 10px 30px; inset-block: 20px; }',
			warnings: 0,
			args: 'allow-shorthands',
		},
		{
			source: 'body { inset-inline: 10px 30px; inset-block: 20px; }',
			expect:
				'body { inset-inline-start: 10px; inset-inline-end: 30px; inset-block-start: 20px; inset-block-end: 20px; }',
			args: 'always',
		},
		{
			source: 'body { inset-inline: 10px 30px; inset-block: 20px; }',
			warnings: 2,
			args: 'always',
		},
		{
			source: 'body { padding: 10px 20px; margin: 30px 40px; }',
			expect:
				'body { padding-block: 10px; padding-inline: 20px; margin-block: 30px; margin-inline: 40px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding: 10px 20px; margin: 30px 40px; }',
			expect:
				'body { padding-block-start: 10px; padding-block-end: 10px; padding-inline-start: 20px; padding-inline-end: 20px; margin-block-start: 30px; margin-block-end: 30px; margin-inline-start: 40px; margin-inline-end: 40px; }',
			args: 'always',
		},
		{
			source: 'body { margin: -23% 0 20% -27%; }',
			expect:
				'body { margin-block-start: -23%; margin-block-end: 20%; margin-inline-start: -27%; margin-inline-end: 0; }',
			args: 'always',
		},
		{
			source: 'body { margin: -23% 20px -27%; }',
			expect:
				'body { margin-block-start: -23%; margin-block-end: -27%; margin-inline-start: 20px; margin-inline-end: 20px; }',
			args: 'always',
		},
		{
			source: 'body { margin: -23% 20% -27%; }',
			expect:
				'body { margin-block-start: -23%; margin-block-end: -27%; margin-inline-start: 20%; margin-inline-end: 20%; }',
			args: 'always',
		},
		{
			source: 'body { padding-block: $s_vertical_padding - $button_border; }',
			expect:
				'body { padding-block-start: $s_vertical_padding - $button_border; padding-block-end: $s_vertical_padding - $button_border; }',
			args: 'always',
		},
		{
			source: 'body { padding-block: 23px % 40px 34px / 50px; }',
			expect: 'body { padding-block-start: 23px % 40px; padding-block-end: 34px / 50px; }',
			args: 'always',
		},
		{
			source: 'body { padding-block: 23px + 40px 34px - 50px; }',
			expect: 'body { padding-block-start: 23px + 40px; padding-block-end: 34px - 50px; }',
			args: 'always',
		},
		{
			source: 'body { padding-block: 23px / -40px 34px * 50px; }',
			expect: 'body { padding-block-start: 23px / -40px; padding-block-end: 34px * 50px; }',
			args: 'always',
		},
		{
			source: 'body { padding: 23px / -40px 34px * 50px 30% -20%; }',
			expect:
				'body { padding-block-start: 23px / -40px; padding-block-end: 30%; padding-inline-start: -20%; padding-inline-end: 34px * 50px; }',
			args: 'always',
		},
		{
			source: 'body { padding-block: - 23px; }',
			expect: 'body { padding-block-start:  - 23px; padding-block-end:  - 23px; }',
			args: 'always',
		},
		{
			source: 'body { padding-block-start: -23px; padding-block-end: -23px; }',
			expect: 'body { padding-block: -23px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-block-start: -23px; padding-block-end: -23px; }',
			args: 'always',
			warnings: 0,
		},
		{
			source: 'body { padding-inline-start: -23px; padding-inline-end: -23px; }',
			expect: 'body { padding-inline: -23px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-inline-start: -23px; padding-inline-end: -23px; }',
			args: 'always',
			warnings: 0,
		},
		{
			source: 'body { margin-block-start: -23px; margin-block-end: -23px; }',
			expect: 'body { margin-block: -23px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-block-start: -23px; margin-block-end: -23px; }',
			args: 'always',
			warnings: 0,
		},
		{
			source: 'body { margin-inline-start: -23px; margin-inline-end: -23px; }',
			expect: 'body { margin-inline: -23px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-inline-start: -23px; margin-inline-end: -23px; }',
			args: 'always',
			warnings: 0,
		},
		{
			source: 'body { inset-inline-start: -23px; inset-inline-end: -23px; }',
			expect: 'body { inset-inline: -23px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { inset-inline-start: -23px; inset-inline-end: -23px; }',
			args: 'always',
			warnings: 0,
		},
		{
			source: 'body { inset-block-start: -23px; inset-block-end: -23px; }',
			expect: 'body { inset-block: -23px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { inset-block-start: -23px; inset-block-end: -23px; }',
			args: 'always',
			warnings: 0,
		},
		{
			source:
				'body { inset-block-start: -23px; inset-inline-start: 35px; inset-inline-end: 70px; inset-block-end: -23px; }',
			expect: 'body { inset-block: -23px; inset-inline: 35px 70px; }',
			args: 'allow-shorthands',
		},
		{
			source:
				'body { inset-block-start: -23px; inset-inline-start: 35px; inset-inline-end: 70px; inset-block-end: -23px; }',
			args: 'always',
			warnings: 0,
		},
		{
			source: 'body { inset: 0; }',
			expect:
				'body { inset-block-start: 0; inset-block-end: 0; inset-inline-start: 0; inset-inline-end: 0; }',
			args: 'always',
		},
		{
			source: 'body { inset: 0; }',
			expect: 'body { inset-block: 0; inset-inline: 0; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { inset-block: 32px unset; }',
			expect: 'body { inset-block-start: 32px; inset-block-end: unset; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { inset-block: 32px inherit; }',
			warnings: [
				'"inset-block" is a shorthand where global value exist. Use separate props like "inset-block-start, inset-block-end" for this. (use-logical-spec)',
			],
			args: 'allow-shorthands',
		},
		{
			source: 'body { inset-block-start: 32px; inset-block-end: unset; }',
			expect: 'body { inset-block-start: 32px; inset-block-end: unset; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { top: 32px; bottom: unset; }',
			expect: 'body { inset-block-start: 32px; inset-block-end: unset; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { top: unset; bottom: 32px; }',
			expect: 'body { inset-block-start: unset; inset-block-end: 32px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { left: 32px; right: unset; }',
			expect: 'body { inset-inline-start: 32px; inset-inline-end: unset; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { left: unset; right: 32px; }',
			expect: 'body { inset-inline-start: unset; inset-inline-end: 32px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-block: 32px initial; }',
			expect: 'body { margin-block-start: 32px; margin-block-end: initial; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-block: 32px inherit; }',
			warnings: [
				'"margin-block" is a shorthand where global value exist. Use separate props like "margin-block-start, margin-block-end" for this. (use-logical-spec)',
			],
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-block-start: 32px; margin-block-end: initial; }',
			expect: 'body { margin-block-start: 32px; margin-block-end: initial; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-top: 32px; margin-bottom: initial; }',
			expect: 'body { margin-block-start: 32px; margin-block-end: initial; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-top: revert; margin-bottom: 32px; }',
			expect: 'body { margin-block-start: revert; margin-block-end: 32px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-left: 32px; margin-right: revert; }',
			expect: 'body { margin-inline-start: 32px; margin-inline-end: revert; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-left: revert; margin-right: 32px; }',
			expect: 'body { margin-inline-start: revert; margin-inline-end: 32px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-block: 32px inherit; }',
			expect: 'body { padding-block-start: 32px; padding-block-end: inherit; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-block: 32px inherit; }',
			warnings: [
				'"padding-block" is a shorthand where global value exist. Use separate props like "padding-block-start, padding-block-end" for this. (use-logical-spec)',
			],
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-block-start: 32px; padding-block-end: inherit; }',
			expect: 'body { padding-block-start: 32px; padding-block-end: inherit; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-top: 32px; padding-bottom: inherit; }',
			expect: 'body { padding-block-start: 32px; padding-block-end: inherit; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-top: revert-layer; padding-bottom: 32px; }',
			expect: 'body { padding-block-start: revert-layer; padding-block-end: 32px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-left: 32px; padding-right: revert-layer; }',
			expect: 'body { padding-inline-start: 32px; padding-inline-end: revert-layer; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-left: revert-layer; padding-right: 32px; }',
			expect: 'body { padding-inline-start: revert-layer; padding-inline-end: 32px; }',
			args: 'allow-shorthands',
		},
		{
			source: 'body { padding-block: inherit; }',
			warnings: 0,
			args: 'allow-shorthands',
		},
		{
			source: 'body { margin-block: initial; }',
			warnings: 0,
			args: 'allow-shorthands',
		},
		{
			source: 'body { inset-inline: unset; }',
			warnings: 0,
			args: 'allow-shorthands',
		},
	],
};
