import { Container } from 'postcss';

export const hasEmptyChildNodes = ({ nodes = [] }: Container) => {
    const significantNodes = nodes.filter((node) => node.type !== 'comment');
    return significantNodes.length === 0;
};
