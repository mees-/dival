// @flow
import type { RuleMap } from '../types.flow.js'

import type from './type'
import required from './required'
// import child from './child'

const ruleMap: RuleMap = new Map()
ruleMap.set(type.identifier, type)
ruleMap.set(required.identifier, required)
// ruleMap.set(child.identifier, child)

export default ruleMap
