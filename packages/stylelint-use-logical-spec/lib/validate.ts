import type { ChildNode, Node } from 'postcss';
import type { SingleNodeCallback, FourNodesCallback, TwoNodesCallback } from './types';

import { isNodeWithChildren } from './utils';

export function validateRuleWithProps(root: Node, props: string[], fn: SingleNodeCallback): void;
export function validateRuleWithProps(root: Node, props: string[], fn: TwoNodesCallback): void;
export function validateRuleWithProps(root: Node, props: string[], fn: FourNodesCallback): void;

export function validateRuleWithProps(
	root: Node,
	props: string[],
	fn: SingleNodeCallback | TwoNodesCallback | FourNodesCallback,
) {
	// conditionally walk nodes with children
	if (isNodeWithChildren(root) && root.nodes && root.nodes.length) {
		const args: (ChildNode | number)[] = [];

		const hasProps = props.every((prop) => {
			if (!root.nodes || !root.nodes.length) {
				return;
			}

			const declIndex = root.nodes.findIndex(
				(child) => child.type === 'decl' && child.prop === prop,
			);
			const decl = root.nodes[declIndex];

			if (decl) {
				args.push(decl, declIndex);
			}

			return decl;
		});

		if (hasProps) {
			if (args.length === 2) {
				(fn as SingleNodeCallback)(...(args as Parameters<SingleNodeCallback>));
			}

			if (args.length === 4) {
				(fn as TwoNodesCallback)(...(args as Parameters<TwoNodesCallback>));
			}

			if (args.length === 8) {
				(fn as FourNodesCallback)(
					...(args.filter((arg) => typeof arg !== 'number') as Parameters<FourNodesCallback>),
				);
			}
		}
	}
}
