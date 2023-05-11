import { treeProp } from './type'
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
  const obj: any = {};
  list.forEach((item: any) => {
    obj[item[id]] = item;
    delete item[children]
  });
  const parentList: any[] = [];
  list.forEach((item: any) => {
    const parent = obj[item[parentId]];
    if (parent) {
      // * 当前项有父节点
      parent[children] = parent[children] || [];
      parent[children].push(item);
    } else {
      // * 当前项没有父节点 -> 顶层
      parentList.push(item);
    }
  });
  return parentList;
}