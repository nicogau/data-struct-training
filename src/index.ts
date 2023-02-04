import { BinaryTree  } from "./algo/binaryClasses";
import * as binaryTree from "./algo/binaryTree";
import * as graph from "./algo/graph";
import * as twoPointers from "./algo/twoPointers";

/* training with binary tree */
//binaryTree.run()

/* training with binary tree class  */
let tree = new BinaryTree()
tree.addNode(1)
tree.addNode(2)
tree.addNode(3)
tree.addNode(4)
tree.addNode(5)
tree.addNode(6)
tree.addNode(7)
tree.addNode(8)

console.log('count', tree.countNodes())
console.log('height', tree.heightTree())
tree.drawNodes()

/* training with graph */
// graph.run()

/* training with twoPointers pattern */
// twoPointers.run()
