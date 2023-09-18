import {ChildNode} from "postcss";

/**
 * The `processed` symbol is used as a unique key to mark nodes that have been processed.
 */
const processed = Symbol('processed')

/**
 * The `markProcessed` function is used to mark a node as processed.
 * It adds a unique symbol `processed` to the node.
 */
export const markProcessed = (node: ChildNode) => node[processed] = true

/**
 * The `isProcessed` function is used to check if a node has been processed.
 * It checks if the node has the unique symbol `processed`.
 */
export const isProcessed = (node: ChildNode) => Boolean(node[processed])
