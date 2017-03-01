// @flow
export type TypeTest = (data: any) => boolean
export type TypeMap = {
  [type: string]: TypeTest
}

export type RuleMap = {
  [rule: string]: Object
}

export interface Rule {
  identifier: string;
  setting: any;
  test(setting: any, data: any): boolean;
}
