import type { Node } from 'postcss-value-parser';

const parser = require('postcss-value-parser');

const SIGNIFICANT_NODES = ['word', 'div', 'string', 'function'];

const isSignificantNode = (node: Node) => SIGNIFICANT_NODES.includes(node.type);

export const parseCssValue = (value: string) =>
  parser(value)
    .nodes.filter(isSignificantNode)
    .map((node) => parser.stringify(node));
