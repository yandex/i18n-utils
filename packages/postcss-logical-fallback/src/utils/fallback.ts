import {ChildNode} from "postcss";

/**
 * The `fallback` symbol is used as a unique key to mark nodes that need a fallback.
 */
const fallback = Symbol('fallback');

/**
 * The `markFallback` function is used to mark a node as needing a fallback.
 * It adds a unique symbol `fallback` to the node.
 */
export const markFallback = (node: ChildNode) => node[fallback] = true

/**
 * The `needFallback` function is used to check if a node needs a fallback.
 * It checks if the node has the unique symbol `fallback`.
 */
export const needFallback = (node: ChildNode) => Boolean(node[fallback])

