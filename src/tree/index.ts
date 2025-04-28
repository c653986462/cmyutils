import { treeProp, TreeNode, Option } from './type'
import { deepClone } from '../data'
/**
 * 把平铺节点转化为树
 * @method   ListToTree
 * @param    {Array}  _list 平铺节点
 * @param    {Object}  _props 节点key值
 * @return   {Array}   树
 * @version 1.0
 */
export const ListToTree = function (_list: any, _props: treeProp = {}) {
  const { id = 'id', children = 'children', parentId = 'parentId' } = _props
  const list = deepClone(_list)
  // * 先生成parent建立父子关系
  const obj: any = {}
  list.forEach((item: any) => {
    obj[item[id]] = item
    delete item[children]
  })
  const parentList: any[] = []
  list.forEach((item: any) => {
    const parent = obj[item[parentId]]
    if (parent) {
      // * 当前项有父节点
      parent[children] = parent[children] || []
      parent[children].push(item)
    } else {
      // * 当前项没有父节点 -> 顶层
      parentList.push(item)
    }
  })
  return parentList
}

/**
 * 根据指定的节点ID，在树形数据中查找对应的节点。
 * @param tree 树形数据，每个节点为一个对象，可以包含任意属性，子节点以数组形式存储在 `children` 属性中。
 * @param targetId 目标节点的ID值，用于匹配节点。
 * @param option 用于指定键名的参数，可选。
 * @param option.idKey 指定节点ID对应的键名，默认为 "id"。
 * @param option.childrenKey 指定子节点对应的键名，默认为 "children"。
 * @returns 如果找到匹配的节点，则返回该节点对象，否则返回 null。
 */
export const findNodeInTree = function (
  tree: TreeNode[],
  targetId: any, // 这里将 targetId 设置为 any 类型，因为我们不确定它的类型
  option?: Option // 默认参数为一个空的 Option 对象
): TreeNode | null {
  const { idKey = 'id', childrenKey = 'children' } = option || {}

  for (const node of tree) {
    if (node[idKey] === targetId) {
      return node
    }
    if (node[childrenKey] && Array.isArray(node[childrenKey])) {
      const foundNode = findNodeInTree(node[childrenKey], targetId, option)
      if (foundNode) {
        return foundNode
      }
    }
  }
  return null
}
