import { expect, test } from '@jest/globals'
import { reg } from '../../dist'

test('测试正则-整数或两位以内小数', () => {
  expect(reg.float.test('1')).toEqual(true)
  expect(reg.float.test('1.1')).toEqual(true)
  expect(reg.float.test('1.11')).toEqual(true)
  expect(reg.float.test('1.111')).toEqual(false)
  expect(reg.float.test('1.1.1')).toEqual(false)
  expect(reg.float.test('a')).toEqual(false)
})
