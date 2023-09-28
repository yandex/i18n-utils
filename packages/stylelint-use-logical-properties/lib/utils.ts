import type { Method } from './types';
import type { RuleTesterContext } from 'stylelint';
import type { Node, AtRule, Declaration, Root, Rule } from 'postcss';

import { singleValuesOnly } from './maps';

export const isMethodIndifferent = (method: Method) =>
	method === 'ignore' || method === false || method === null;

export const isMethodAlways = (method: Method) => method === 'always' || method === true;

export const isMethodAllowShortHands = (method: Method) => method === 'allow-shorthands';

export const isContextAutoFixing = (context: RuleTesterContext) => Boolean(Object(context).fix);

export const isNodeMatchingDecl = (decl: Node, regexp: RegExp) =>
	decl.type === 'decl' && regexp.test(decl.prop);

export const isDeclAnException = (decl: Declaration, propExceptions: (string | RegExp)[]) =>
	isValueAnException(decl.prop, propExceptions);

export const isValueAnException = (value: string, propExceptions: (string | RegExp)[]) =>
	propExceptions.some((match) =>
		match instanceof RegExp
			? match.test(value)
			: String(match || '').toLowerCase() === String(value || '').toLowerCase(),
	);

export const isDeclReported = (decl: Declaration, reportedDecls: WeakSet<Declaration>) =>
	reportedDecls.has(decl);

export const isNodeWithChildren = (node: Node): node is Rule | AtRule | Root =>
	node.type === 'atrule' || node.type === 'rule' || node.type === 'root';

export const isDecl = (node: Node | number): node is Declaration =>
	typeof node !== 'number' && node.type === 'decl';

export const isSingleDeclValueOnly = (decl: Declaration): boolean =>
	singleValuesOnly.includes(decl.value);

export const hasSome = (rhs: string[], lhs: string[]): boolean =>
	rhs.some((value) => lhs.includes(value));
