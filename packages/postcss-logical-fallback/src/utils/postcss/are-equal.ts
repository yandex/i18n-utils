import type { ChildNode } from 'postcss';

export const areEqual = (lhs: ChildNode, rhs: ChildNode): boolean => {
    if (rhs.type === 'rule' && lhs.type === 'rule' && lhs.selector === rhs.selector) {
        return true;
    }

    if (
        lhs.type === 'atrule' &&
        rhs.type === 'atrule' &&
        lhs.name === rhs.name &&
        lhs.params === rhs.params
    ) {
        return true;
    }

    return lhs.type === 'decl' &&
      rhs.type === 'decl' &&
      lhs.prop === rhs.prop &&
      lhs.value === rhs.value;


};
