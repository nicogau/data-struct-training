
export interface NodeProperties {
  key: string | null
  value: string | null
  parent: string | null
  left: string | null
  right: string | null
}

export  interface NodeMethods {
  isLeaf: () => boolean 
  hasChildren: () => boolean
}

export interface Node extends NodeProperties, NodeMethods {}
export interface NodeConstructor { 
  new(key?:string | null, value?: string | null, parent?: string | null, left?: string | null, right?: string | null ): Node
}

/**
  * node  pseudo classical pattern
  */
export const node = (key=null, value=null, parent=null, left=null, right=null ): Node => {
  let nodeInstance = {} as Node

  nodeInstance.key = key
  nodeInstance.value = value
  nodeInstance.parent = parent
  nodeInstance.left = left
  nodeInstance.right = right
  nodeInstance.isLeaf = function () {
    return this.left == null && this.right == null
  }
  nodeInstance.hasChildren = function () {
    return !this.isLeaf()
  }

  return nodeInstance 
}

/**
  * node with constructor
  */
export const NodeCtr = function(this:Node, key=null, value=null, parent=null, left=null, right=null ) {
  this.key = key
  this.value = value
  this.parent = parent
  this.left = left
  this.right = right
}  as unknown as NodeConstructor

NodeCtr.prototype.isLeaf = function () {
    return this.left == null && this.right == null
}

NodeCtr.prototype.hasChildren =  function () {
    return !this.isLeaf()
}
