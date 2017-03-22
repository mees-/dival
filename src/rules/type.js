// @flow
import type { TypeMap } from '../types.flow.js'

const types: {[type: string]: (data: any) => boolean} = {
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
  promise: data => data instanceof Promise
}

export default class Type {
  types: TypeMap
  id: string
  setting: string

  static id = 'type'
  id = 'type'
  types = types

  constructor(setting: ?string) {
    if (typeof setting === 'undefined' || setting === null) {
      throw new Error('setting cannot be undefined')
    }
    if (!(setting in this.types)) {
      throw new Error(`invalid setting: ${ setting }`)
    }
    this.setting = setting
  }

  test({ data }: { data: ?mixed }): boolean {
    if (typeof data === 'undefined') {
      return true
    }
    try {
      return this.types[this.setting](data)
    } catch (e) {
      return false
    }
  }
}
