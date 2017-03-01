// @flow
import type { TypeMap, Rule } from '../types.flow.js'

const defaultTypes : TypeMap = {
  string: data => typeof data === 'string',
  boolean: data => typeof data === 'boolean',
  object: data => data.toString() === '[object Object]',
  array: data => Array.isArray(data),
  number: data => typeof data === 'number',
  symbol: data => typeof data === 'symbol',
  null: data => data === null,
  date: data => data instanceof Date,
  error: data => data instanceof Error,
  regexp: data => data instanceof RegExp,
  function: data => typeof data === 'function',
  promise: data => typeof data.then === 'function'
}

export default class TypeRule {
  types: TypeMap
  identifier: string
  setting: string
  constructor(setting: ?string, customTypes: ?TypeMap = {}) {
    (this: Rule)
    this.identifier = 'type'
    this.types = {
      ...defaultTypes,
      ...customTypes
    }

    this.setSetting(setting)
  }

  test(data: any): boolean {
    try {
      return this.types[this.setting](data)
    } catch (e) {
      return false
    }
  }

  setSetting(setting: ?string) {
    if (!setting) {
      throw new Error('setting cannot be undefined')
    }
    if (!(setting in this.types)) {
      throw new Error(`invalid setting: ${ setting }`)
    }
    this.setting = setting
  }
}
