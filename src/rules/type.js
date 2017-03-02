// @flow
import type { TypeMap } from '../types.flow.js'

const types = {
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

export default class Type {
  types: TypeMap
  identifier: string
  setting: string

  static identifier = 'type'
  identifier = 'type'
  types = types

  constructor(setting: ?string) {
    if (!setting) {
      throw new Error('setting cannot be undefined')
    }
    if (!(setting in this.types)) {
      throw new Error(`invalid setting: ${ setting }`)
    }
    this.setting = setting
  }

  test(data: any): boolean {
    try {
      return this.types[this.setting](data)
    } catch (e) {
      return false
    }
  }
}
