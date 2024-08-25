import { createTree, prettyPrint } from './BST.js';

function randomArray(length) {
  const arr = []
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 100))
  }
  return arr
}

const tree = createTree(randomArray(20))
prettyPrint(tree.root)
console.log('Is tree balance', tree.isBalance())
console.log('level order recursion')
tree.levelOrderRecursion( data => console.log(data))
console.log('level order iteration')
tree.levelOrderIteration( data => console.log(data))
console.log('in order')
tree.inOrder( data => console.log(data))
console.log('pre order')
tree.preOrder(data => console.log(data))
console.log('post order')
tree.postOrder(data => console.log(data))
console.log('Insert 100, 101, 102 to unbalance tree')
tree.insert(100)
tree.insert(101)
tree.insert(102)
prettyPrint(tree.root)
console.log('Is tree balance', tree.isBalance())
console.log('Re balance tree')
tree.reBalance()
console.log('Is tree balance', tree.isBalance())
prettyPrint(tree.root)
console.log('level order recursion')
tree.levelOrderRecursion( data => console.log(data))
console.log('level order iteration')
tree.levelOrderIteration( data => console.log(data))
console.log('in order')
tree.inOrder( data => console.log(data))
console.log('pre order')
tree.preOrder(data => console.log(data))
console.log('post order')
tree.postOrder(data => console.log(data))

