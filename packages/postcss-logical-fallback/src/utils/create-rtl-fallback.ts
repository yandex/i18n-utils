import type { UtilsProps } from '../types';

import { RTL_MAPPING } from '../constants';
import { deepRuleClone } from './postcss/deep-rule-clone';

export const createRtlFallback = ({ helpers, selectorId, selectors, decl, declParent, initialValue }: UtilsProps) => {
    let roots = selectors.get(selectorId);

    if (!roots) {
        throw decl.error(`selector ${selectorId} was not found`);
    }

    let isFirstNode = false;
    if (!roots?.rtlSrc) {
        const [rtlRoot, rtlSrc] = deepRuleClone(declParent, decl, {
            dirRtl: true,
        });

      (declParent.parent || declParent).append(rtlRoot);

        roots = { ...roots, rtlSrc };
        selectors.set(selectorId, roots);
        isFirstNode = true;
    }

    if (!roots.rtlSrc) {
        throw decl.error(`no rtl src found for selector ${selectorId}`);
    }

    if (isFirstNode) {
        const rtlInitDecl = decl.clone();
        rtlInitDecl.cleanRaws();
        rtlInitDecl.value = initialValue;
        roots.rtlSrc.append(rtlInitDecl);
    } else {
        let exists = false;
        roots.rtlSrc.walkDecls((rtlDecl) => {
            if (rtlDecl.prop === RTL_MAPPING[decl.prop]) {
                rtlDecl.value = decl.value;
                exists = true;
            }
        });

        if (exists) return;
    }
    const rtlDecl = new helpers.Declaration({ prop: RTL_MAPPING[decl.prop], value: decl.value });

    roots.rtlSrc.append(rtlDecl);
};
