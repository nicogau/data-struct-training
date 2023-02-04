
/*  binary tree with class
 *
 * binary tree course
 * https://www.youtube.com/watch?v=fAAZixBzIAI
 */
export class BinaryNode {
  value: number
  left : BinaryNode | null
  right : BinaryNode | null
  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }
}



export class BinaryTree {
  root: BinaryNode | null

  constructor() {
    this.root = null
  }

  addNode(value: number): void {
    const newNode = new BinaryNode(value) 

    if (!this.root) {
      this.root = newNode
      return
    }
    addTreeNode(this.root, newNode)
}

  /**
   * count number of nodes in tree
   *
   * @returns {number} number of nodes
   */
  countNodes(): number {
    if (!this.root) return 0 

    return countTreeNodes(this.root)
  }

  /**
   * get the height of the tree
   *
   * @returns {number} depth of the tree
   */
  heightTree(): number {
    if (!this.root) return 0

    return treeHeight(this.root)
  }

  /**
   * draw each node of the tree 
   *
   * @returns {number} depth of the tree
   */
  drawNodes(): void {
    if (!this.root) return
    drawTreeNodes(this.root)
  }

}


/**
  * add a node to the rootNode  tree
  * traverse a tree starting from rootNode and find the first empty place
  * insert  the new node as the first free left child or first free right child otherwise 
  *
  * @params {BinaryNode} rootNode -  node to traverse to insert the new node
  * @params {BinaryNode} newNode - node to insert in the tree
  * @returns {void}
  */
const addTreeNode = (rootNode: BinaryNode, newNode: BinaryNode): void => {

    // traverse the tree and add the new node  in a breadth first search way 
    // (seearch every node of current level before  going one level deeper)
    // and start on left node
    let queue: BinaryNode[] = [rootNode]

    while (queue.length > 0) {
      // this.root cannot be undefined
      const current  = queue.pop()

      if (!current) return

      if (!current.left) {
        current.left = newNode
        return
      } 
      queue.unshift(current.left)

      if(!current.right) {
        current.right = newNode 
        return
      }
      queue.unshift(current.right)
    }
}

/**
 * get height of a node Tree recursively
 *
 * @param {BinaryNode} node - a starting node
 * @returns {number}   max height from  the root node to the deeper level node 
 */
const treeHeight = (node: BinaryNode ): number => {
  if (node === null) return 0   
    let left = 0
    let right = 0

    if (node.left) {
     left= treeHeight(node.left)  
    }
    if (node.right) {
     right = treeHeight(node.right) 
    }
    return  Math.max(left, right) + 1
}

/**
 * get the number of nodes in a tree
 *
 * @param {BinaryNode} node - root node to start counting
 * @returns {number} return number of nodes in the tree 
 */
const countTreeNodes = (node: BinaryNode): number => {
  let count = 0
  let stack = [node]

  // depth first algorithm to traverse and count the node
  while (stack.length > 0) {
    const current =  stack.pop()
    count += 1
    if (!current) return count
    
    if (current.left) stack.push(current.left)
    if (current.right) stack.push(current.right)
  }
  return count
}

const drawTreeNodes = (rootNode: BinaryNode) => {
  let queue: BinaryNode[] = [rootNode]
  let nodeCount = 0

  // breadth first algorithm to traverse the tree
  while (queue.length > 0) {
    const current = queue.pop()
    let currentNodeRow = ''
    let branchRow = ''
    let childRow = ''
      
    if (!current) return
    
    currentNodeRow = `  ${current.value.toString()}  \n`

    if (current.left) {
      branchRow += ` / `
      childRow += `${current.left.value}`
      queue.unshift(current.left)
    } else {
      continue
    }
    if (current.right) {
      branchRow += `\\`
      childRow += `   ${current.right.value}`
      queue.unshift(current.right)
    }
    branchRow += '\n'
    childRow += '\n'
    nodeCount += 1
    process.stdout.write(`${currentNodeRow}${branchRow}${childRow}\n`)
  }
}
