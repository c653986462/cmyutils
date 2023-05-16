import { expect, test } from '@jest/globals'
import { reg } from '../../dist'

test('测试正则-数字', () => {
  expect(reg.number.test('1')).toEqual(true)
  expect(reg.number.test('1.1')).toEqual(false)
  expect(reg.number.test('a')).toEqual(false)
})
