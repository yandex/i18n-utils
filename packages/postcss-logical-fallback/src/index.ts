import {AtRule, Declaration, Root, Rule} from "postcss";
import {
  cleanEmptyAtRules,
  cleanEmptyRules,
  isBorderDecl,
  isDeclWithRtlFallback,
  isFloatDecl,
  isInsetDecl,
  parseCssValue,
  hasEmptyChildNodes,
  isProcessed,
  markProcessed,
  markFallback
} from "./utils";
import {
  borderRadiusProcessorPositioned,
  floatProcessor,
  insetBlockProcessorPositioned,
  insetInlineProcessor,
  insetInlineProcessorPositioned,
  processor,
  shorthandProcessor
} from "./decl-processors";

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  // Work with options here
  return {
    postcssPlugin: 'postcss-logical-fallback',
    async Once(root: Root, { AtRule }) {
      const nodes = root.nodes.filter(i => !isProcessed(i) && i.type !== 'comment')
      const supportsAtRules: AtRule[] = []

      for (const check of [isInsetDecl, isBorderDecl, isFloatDecl]) {
        const supports: AtRule = new AtRule({
          name: 'supports',
        })

        for (const node of nodes) {
          const cloned = node.clone()
          cloned.cleanRaws()
          supports.append(cloned)
        }

        let supportsParam = '';

        // clean decls
        supports.walkDecls(decl => {
          if (!check(decl)) {
            decl.remove()
          } else {
            if (!supportsParam) {
              supportsParam = decl.toString()
            }
            markProcessed(decl)
          }
        })

        supports.params = `(${supportsParam})`

        cleanEmptyRules(supports)
        cleanEmptyAtRules(supports)

        if (hasEmptyChildNodes(supports)) continue

        supportsAtRules.push(supports)
        supportsAtRules.push(supports.clone({
          params: `not (${supportsParam})`
        }))

        // clean decls
        root.walkDecls(decl => {
          if (check(decl)) {
            decl.remove()
          }
        })

        cleanEmptyRules(root)
        cleanEmptyAtRules(root)
      }

      for (const supports of supportsAtRules) {
        root.append(supports)
        markProcessed(supports)
      }

    },
    async Rule(rule: Rule) {
      if (isProcessed(rule)) {
        return
      }

      if (rule.some(i => i.type === 'decl' && isDeclWithRtlFallback(i))) {
        const cloned = rule.clone({
          selectors: rule.selectors.map(s => `[dir="rtl"] ${s}`)
        })

        cloned.walkDecls(decl => {
          if (isDeclWithRtlFallback(decl)) {
            const [start, end = start] = parseCssValue(decl.value)
            const cloned = decl.clone({
              prop: decl.prop,
            })

            if (!(decl.prop === 'inset-inline' && start === end)) {
              markFallback(cloned)
              decl.parent?.insertBefore(decl, cloned)
            }
          }
          decl.remove()
        })

        const insetInlineStart = cloned.nodes.find(i => i.type === 'decl' && i.prop === 'inset-inline-start') as Declaration | undefined
        const insetInlineEnd = cloned.nodes.find((i) => i.type === 'decl' && i.prop === 'inset-inline-end') as Declaration | undefined

        if (insetInlineStart && insetInlineEnd) {
          insetInlineStart.cloneBefore( {
            prop: 'inset-inline',
            value: `${insetInlineEnd.value} ${insetInlineStart.value}`
          })
          insetInlineStart.remove()
          insetInlineEnd.remove()
        }

        if (!hasEmptyChildNodes(cloned)) {
          rule.parent?.insertAfter(rule, cloned)
          markProcessed(cloned)
        }
      }

    },
    Declaration: {
      'padding-inline': processor(shorthandProcessor),
      'padding-block': processor(shorthandProcessor),
      'margin-inline': processor(shorthandProcessor),
      'margin-block': processor(shorthandProcessor),
      'inset-block-start': processor(insetBlockProcessorPositioned),
      'inset-block-end': processor(insetBlockProcessorPositioned),
      'inset-block': processor(shorthandProcessor),
      'inset-inline-start': processor(insetInlineProcessorPositioned),
      'inset-inline-end': processor(insetInlineProcessorPositioned),
      'inset-inline': processor(insetInlineProcessor),
      clear: processor(floatProcessor),
      float: processor(floatProcessor),
      'border-start-start-radius': processor(borderRadiusProcessorPositioned),
      'border-start-end-radius': processor(borderRadiusProcessorPositioned),
      'border-end-start-radius': processor(borderRadiusProcessorPositioned),
      'border-end-end-radius': processor(borderRadiusProcessorPositioned),
    }
  }
}

module.exports.postcss = true
