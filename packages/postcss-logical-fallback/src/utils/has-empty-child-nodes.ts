import {Container} from "postcss";

export const hasEmptyChildNodes = ({nodes}: Container) => !nodes || nodes.length === 0
