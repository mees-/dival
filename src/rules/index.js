// @flow
import type { RuleMap } from '../types.flow.js'

import type from './type'
import required from './required'
import child from './child'

const ruleMap: RuleMap = new Map()
ruleMap.set(type.id, type)
ruleMap.set(required.id, required)
ruleMap.set(child.id, child)

export default ruleMap
