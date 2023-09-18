import type { Rule } from 'postcss';
import { Container } from 'postcss';

export type SelectorsMapValue = {
    physicalSrc: Container;
    logicalSrc: Container;
    rtlSrc?: Rule;
};

export type Selectors = Map<string, SelectorsMapValue>;
