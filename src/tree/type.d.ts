export declare type treeProp = {
  id?: string
  children?: string
  parentId?: string
}

export interface TreeNode {
  [key: string]: any // 所有属性都变成可选的
}

export interface Option {
  idKey?: string
  childrenKey?: string
}
