import type { ChildNode } from 'postcss';
import { areEqual } from './are-equal';

export const hasNode = (root: ChildNode, container: ChildNode): boolean => {
    if (root.type === 'comment') {
      return false;
    }

    if (root.type === 'decl') {
      return areEqual(root, container);
    }

    let has = false;
    root.walk((node) => {
        if (areEqual(container, node)) {
            has = true;
        }
    });

    return has;
};
