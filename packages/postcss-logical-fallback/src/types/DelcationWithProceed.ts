import type { Declaration } from 'postcss';
import { visited } from '../utils';

export interface DeclarationWithProceed extends Declaration {
    [visited]?: boolean;
}
