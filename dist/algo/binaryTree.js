"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.BinaryNode = exports.NodeCtr = exports.node = void 0;
/**
  * node  pseudo classical pattern
  */
const node = (key = null, value = null, parent = null, left = null, right = null) => {
    let nodeInstance = {};
    nodeInstance.key = key;
    nodeInstance.value = value;
    nodeInstance.parent = parent;
    nodeInstance.left = left;
    nodeInstance.right = right;
    nodeInstance.isLeaf = function () {
        return this.left == null && this.right == null;
    };
    nodeInstance.hasChildren = function () {
        return !this.isLeaf();
    };
    return nodeInstance;
};
exports.node = node;
/**
  * node with constructor
  */
exports.NodeCtr = function (key = null, value = null, parent = null, left = null, right = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = left;
    this.right = right;
};
exports.NodeCtr.prototype.isLeaf = function () {
    return this.left == null && this.right == null;
};
exports.NodeCtr.prototype.hasChildren = function () {
    return !this.isLeaf();
};
/*  binary tree with class
 *
 * binary tree course
 * https://www.youtube.com/watch?v=fAAZixBzIAI
 */
class BinaryNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}
exports.BinaryNode = BinaryNode;
const run = () => {
    /* pseudo classical object */
    // const n1 = node() 
    // n1.left = 'b' 
    // console.log('n1',n1)
    // console.log('n1 leaf', n1.isLeaf())
    /* Constructor with prototyping */
    // const node1 = new NodeCtr('bla')
    // node1.right = 'bla'
    // console.log('node1 leaf ? ',node1.isLeaf())
    // node1.right = null
    // console.log('node1 leaf ? ',node1.isLeaf())
    // console.log('node1', node1)
    /*  binary tree with class
     *
     * binary tree course
     * https://www.youtube.com/watch?v=fAAZixBzIAI
     */
    // BinaryNode instances with class
    const a = new BinaryNode(3);
    const b = new BinaryNode(11);
    const c = new BinaryNode(4);
    const d = new BinaryNode(4);
    const e = new BinaryNode(2);
    const f = new BinaryNode(21);
    const u = new BinaryNode('u');
    /* building binary tree */
    a.left = b;
    a.right = c;
    b.left = d;
    b.right = e;
    c.right = f;
    /* binary tree structure */
    //       a 3
    //      / \
    // 11  b   c 4
    //    /\   \
    // 4 d  e  f 1
    //      2
    /* depth first */
    // iterative 
    // const depthFirstValues = (root: BinaryNode) => {
    //   if ( !root ) return []
    //   let stack = [root]
    //   let result = []
    //   while (stack.length > 0) {
    //    let current = stack.pop()!
    //     result.push(current.value)
    //     if(current.right) stack.push(current.right)
    //     if(current.left) stack.push(current.left)
    //   }  
    // }
    // console.log( depthFirstValues('a', a) )
    // console.log( depthFirstValues('u', u) )
    // recursive 
    function depthFirstValues(root) {
        let leftValues = [];
        let rightValues = [];
        if (root === null)
            return [...leftValues, ...rightValues];
        if (root.left) {
            leftValues = depthFirstValues(root.left);
            // result = [...result, ...leftValues]
        }
        if (root.right) {
            rightValues = depthFirstValues(root.right);
            // result = [...result, ...rightValues]
        }
        return [root.value, ...leftValues, ...rightValues];
    }
    const res = depthFirstValues(a);
    console.log(res);
    /* breadth first */
    // iterative 
    // const breadthFirstValues = (root: BinaryNode) => {
    //   let result: Array<string | number> = []
    //   if (root === null) return [] 
    //   let queue = [root]  
    //   while (queue.length > 0) {
    //     const current = queue.pop()!
    //     result.push(current.value)
    //     if (current.left) {
    //       queue.unshift(current.left) 
    //     }
    //     if (current.right) {
    //       queue.unshift(current.right) 
    //     }
    //   }
    //   return result
    // }
    // console.log(breadthFirstValues(a)) 
    /* tree include */
    // breadthFirst search (queue) 
    // export  const breadthFirstInclude = (root: BinaryNode, value: string | number): boolean => {
    //   if (!root && !value) return false 
    //   let queue = [root]
    //   while (queue.length > 0) {
    //     const current = queue.shift()!
    //     if (current.value === value) return true
    //     if (current.left) queue.push(current.left) 
    //     if (current.right) queue.push(current.right) 
    //   } 
    //   return false
    // }
    // console.log(breadthFirstInclude(a,'bl'))
    // depthFirst search (iterative)
    // const depthFirstInclude = (root: BinaryNode | null, value: BinaryNode['value']): boolean => {
    //   if (!root || !value) return false
    //   if (root.value === value) return true
    //   return depthFirstInclude(root.left, value) ||  depthFirstInclude(root.right, value)
    // } 
    // console.log(depthFirstInclude(a, 'e'))
    /* summing tree value */
    // depthFirst sum (recursive)
    // const sum = (root: BinaryNode | null ): number => {
    //   if ( root == null ) return 0
    //   const valToNum = Number(root.value)
    //   const val = Number.isNaN(valToNum) ? 0 : valToNum 
    //   return  val + sum(root.left) + sum(root.right)
    // }
    // console.log(sum(a))
    /* min value */
    // const min = (root: BinaryNode | null): number => {
    //   if (root  == null || typeof root.value !==  'number' )  return Infinity 
    //    return  Math.min(root.value, min(root.left), min(root.right) )
    // }
    // console.log(min(a))
    /* max value */
    // const max = (root: BinaryNode | null): number => {
    //   if ( root == null) return -Infinity
    //   const numVal = isNaN(root.value as number) ?  -Infinity : Number(root.value)
    //   return Math.max (numVal, max(root.left), max(root.right))
    // }
    // console.log(max(a))
    /* sum max of  a branch */
    const maxSumOfBranch = (root) => {
        if (!root)
            return -Infinity;
        if (!root.left && !root.right)
            return root.value;
        const leftChild = maxSumOfBranch(root.left);
        const rightChild = maxSumOfBranch(root.right);
        return Math.max(leftChild, rightChild) + root.value;
    };
    console.log(maxSumOfBranch(a));
};
exports.run = run;
