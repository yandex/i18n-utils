import type { ChildNode } from 'postcss';

export const isEmpty = (container: ChildNode): boolean => {
    let res = true;

    if (container.type === 'atrule' || container.type === 'rule') {
        container.walkDecls(() => {
            res = false;
        });
    }

    return res;
};
