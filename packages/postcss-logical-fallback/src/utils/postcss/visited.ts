import type { Declaration } from 'postcss';

export const visited = Symbol('visited');

export const markVisited = (decl: Declaration) => {
    decl[visited] = true;
};

export const isVisited = (decl: Declaration): boolean => decl[visited];
