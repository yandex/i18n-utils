import postcss from 'postcss'
import {equal} from 'uvu/assert'

const plugin = require('../src')

export async function run(input: string, output: string, opts = {}) {
  const result = await postcss([plugin(opts)]).process(input, { from: undefined })
  equal(result.css, output)
  equal(result.warnings().length, 0)
}
