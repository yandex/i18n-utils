import type { Declaration, Result } from 'postcss';

export type Dir = 'rtl' | 'ltr';

export type LogicalProps =
	| 'block'
	| 'inline'
	| 'block-start'
	| 'block-end'
	| 'inline-start'
	| 'inline-end';

export type Method = 'always' | 'allow-shorthands' | true | 'ignore' | false | null;

export type SingleNodeCallback = (node: Declaration, idx: number) => void;
export type TwoNodesCallback = (
	startNode: Declaration,
	startIdx: number,
	endNode: Declaration,
	endIdx: number,
) => void;
export type FourNodesCallback = (
	blockStartNode: Declaration,
	inlineStartNode: Declaration,
	blockEndNode: Declaration,
	inlineEndNode: Declaration,
) => void;

export type Reporter = (decl: Declaration, logicalProperty: string, result: Result) => void;
