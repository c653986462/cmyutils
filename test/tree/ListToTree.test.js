import { expect, test } from '@jest/globals';
import { ListToTree } from '../../dist'

const testList = [
  { id: 111, parentId: 11 },
  { id: 1, parentId: 0 },
  { id: 2, parentId: 0 },
  { id: 11, parentId: 1 },
  { id: 12, parentId: 1 },
  { id: 121, parentId: 12 },
]

const tree = [
  {
    id: 1, parentId: 0, children: [{ id: 11, parentId: 1, children: [{ id: 111, parentId: 11 }] },
    { id: 12, parentId: 1, children: [{ id: 121, parentId: 12 }] }]
  },
  { id: 2, parentId: 0 }
]

test('get tree from list', () => {
  expect(ListToTree(testList)).toEqual(tree)
})