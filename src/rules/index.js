// @flow
import type { RuleMap } from '../types.flow.js'

import type from './type'
import required from './required'
import child from './child'
import value from './value'

const ruleMap: RuleMap = new Map()
ruleMap.set(type.id, type)
ruleMap.set(required.id, required)
ruleMap.set(child.id, child)
ruleMap.set(value.id, value)

export default ruleMap
