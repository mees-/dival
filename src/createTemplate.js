// @flow
type plainTemplate = Object | Array<Object>

import ArrayTemplate from './structures/ArrayTemplate'
import ObjectTemplate from './structures/ObjectTemplate'

export default function Template(
  plain: plainTemplate,
  customRules: Object = {}
) {
  if ({}.toString.call(plain) === '[object Object]') {
    return new ObjectTemplate(plain, customRules)
  } else if (Array.isArray(plain)) {
    return new ArrayTemplate(plain, customRules)
  } else {
    throw new Error(
      'The template can only be constructed from an object or array'
    )
  }
}
