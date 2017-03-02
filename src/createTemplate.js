// @flow
import type { RuleMap, plainTemplate } from './types.flow.js'

import ArrayTemplate from './structures/ArrayTemplate'
import ObjectTemplate from './structures/ObjectTemplate'

export default function Template(
  plain: plainTemplate,
  customRules: RuleMap | Object = new Map()
): ArrayTemplate | ObjectTemplate {
  if (Array.isArray(plain)) {
    return new ArrayTemplate(plain, customRules)
  } else if ({}.call.toString(plain) === '[object Object]') {
    return new ObjectTemplate(plain, customRules)
  } else {
    throw new Error('invalid plain template')
  }
}
