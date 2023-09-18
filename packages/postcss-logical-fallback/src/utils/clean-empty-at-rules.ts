import {Container} from "postcss";
import {hasEmptyChildNodes} from "./has-empty-child-nodes";

export const cleanEmptyAtRules = (container: Container) => {
  container.walkAtRules(rule => {
    if (hasEmptyChildNodes(rule)) {
      rule.remove()
    }
  })
}
