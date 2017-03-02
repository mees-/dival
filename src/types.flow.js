// @flow
export type TypeTest = (data: any) => boolean
export type TypeMap = {
  [type: string]: TypeTest
}

export interface Rule {
  identifier: string;
  setting: any;
  test(setting: any, data: any): boolean;
}

export type RuleMap = Map<string, Class<Rule>>

export type plainField = { [rule: string]: any }
export type plainObjectTemplate = { [key: string]: plainField }
export type plainArrayTemplate = Array<plainField>
export type plainTemplate = plainObjectTemplate | plainArrayTemplate

