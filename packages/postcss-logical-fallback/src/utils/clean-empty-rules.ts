import {Container} from "postcss";
import {hasEmptyChildNodes} from "./has-empty-child-nodes";
import {markProcessed} from "./processed";

export const cleanEmptyRules = (container: Container) => {
  container.walkRules(rule => {
    if (hasEmptyChildNodes(rule)) {
      rule.remove()
    } else {
      markProcessed(rule)
    }
  })
}
