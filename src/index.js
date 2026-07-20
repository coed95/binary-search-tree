import Tree from "./Tree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3]);

console.log("In order:");
tree.inOrderForEach(console.log);
// 1 3 4 7 8 9 23

console.log("Pre order:");
tree.preOrderForEach(console.log);
// 7 3 1 4 9 8 23

console.log("Post order:");
tree.postOrderForEach(console.log);
// 1 4 3 8 23 9 7

console.log(tree.isBalanced()); // true

tree.insert(24);
tree.insert(25);
tree.insert(26);

console.log(tree.isBalanced()); // false

tree.rebalance();

console.log(tree.isBalanced()); // true