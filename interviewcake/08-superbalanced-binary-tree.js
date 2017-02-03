var assert = require("assert");
/*
A tree is "superbalanced" if the difference between the depths of any two leaf nodes is
no greater than one.

Here's a sample binary tree node class:
*/

function BinaryTreeNode(value) {
    this.value = value;
    this.left  = null;
    this.right = null;
}

BinaryTreeNode.prototype.insertLeft = function(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
};

BinaryTreeNode.prototype.insertRight = function(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
};

// Question: prioritize speed of insert, or speed of isSuperBalanced()?
// Assuming from question phrasing to do all superBalance logic in isSuperBalanced,
// rather than modifying insertRight and insertLeft to track depth/superBalance
// Binary tree methods tend to be naturally recursive.
// A binary tree is superbalanced if its left subtree and right subtree are superbalanced, and
// the depth of it's left subtree and right subtree differ by no more than one.
// An empty tree is superbalanced
// A tree with no children is superbalanced
// revision: must track minDepth and maxDepth

// Return a boolean
BinaryTreeNode.prototype.isSuperBalanced = function() {
  return this.superBalancedHelper().superbalanced;
}

// Return if this tree is superbalanced, and its depth
BinaryTreeNode.prototype.superBalancedHelper = function() {
  var result = {superbalanced: false, minDepth: 0, maxDepth: 0};
  var leftResult = (this.left) ? this.left.superBalancedHelper() : {superbalanced: true, minDepth: 0, maxDepth: 0};
  var rightResult = (this.right) ? this.right.superBalancedHelper() : {superbalanced: true, minDepth: 0, maxDepth: 0};
  result.minDepth = Math.min(leftResult.minDepth, rightResult.minDepth) + 1;
  result.maxDepth = Math.max(leftResult.maxDepth, rightResult.maxDepth) + 1;
    if (leftResult.superbalanced && rightResult.superbalanced) {
      result.superbalanced = ((result.maxDepth - result.minDepth) <= 1);
    }
  return result;
}

// Iterative solution to avoid risk of stack overflow?
// Traverse down tree using while loops
// Depth first, enqueue nodes to process
// short circuit as soon as a subtree is not superbalanced
// same condition: current node is superbalanced if:
//   left node is superbalanced
//  AND right node is superbalanced
//  AND max(left.maxDepth, right.MaxDepth) - min(left.minDepth, right.minDepth) <= 1

// Find all leaves in a tree. We don't need to record anything except leaves and their depths
// That can be breadth-first
// Actually, we only need to record the deepest and shallowest leaf depths, and can
// short-circuit as soon as they differ by more than 1

// Should be O(n) time & space
// time: only visit each node at most once, O(n)
// space: Enqueue each node at most once. Add constant storage per node, constant storage
// for mindepth and maxdepth, so O(n)
BinaryTreeNode.prototype.isSuperBalancedItr = function() {
  var maxDepth = 0;
  var minDepth = Number.MAX_SAFE_INTEGER;
  var toDo = new Array(); // This is FIFO, i.e. a queue, i.e. BFS
  toDo.push({node: this, depth: 0});

  while(toDo.length) {
    var curr = toDo.shift();

    if(curr.node.right) {
      toDo.push({node: curr.node.right, depth: curr.depth + 1});
    }
    if(curr.node.left) {
      toDo.push({node: curr.node.left, depth: curr.depth + 1});
    }

    //It's a leaf
    if ((!curr.node.left) && (!curr.node.right)) {
      maxDepth = Math.max(curr.depth, maxDepth);
      minDepth = Math.min(curr.depth, minDepth);
      if ((maxDepth - minDepth) > 1) {
        return false;
      }
    }

  }
  return true;
}

console.log("Checking recursive solution");
var superbalanced = new BinaryTreeNode(5);
superbalanced.left = new BinaryTreeNode(3);
superbalanced.left.right = new BinaryTreeNode(4);
superbalanced.left.left = new BinaryTreeNode(2);
superbalanced.right = new BinaryTreeNode(6);

var notSuperBalanced = new BinaryTreeNode(5);
notSuperBalanced.left = new BinaryTreeNode(4);
notSuperBalanced.left.left = new BinaryTreeNode(3);
notSuperBalanced.left.left.left = new BinaryTreeNode(2);
notSuperBalanced.right = new BinaryTreeNode(6);

assert(superbalanced.isSuperBalanced());
assert(!notSuperBalanced.isSuperBalanced());

/*
Counterexample: suppose that from the root of our tree:

The left subtree only has leaves at depths 10 and 11.
The right subtree only has leaves at depths 11 and 12.
*/
var leftsub = new BinaryTreeNode("l10");
leftsub.left = new BinaryTreeNode("leaf11");
var temp = new BinaryTreeNode("l9");
temp.right = new BinaryTreeNode("leaf10");
temp.left = leftsub;
leftsub = temp;
for (var i = 8; i > 0; i--) {
  temp = new BinaryTreeNode(`l${i}`);
  temp.left = leftsub;
  leftsub = temp;
}

var rightsub = new BinaryTreeNode("r11");
rightsub.left = new BinaryTreeNode("leaf12");
temp = new BinaryTreeNode("r10");
temp.right = new BinaryTreeNode("leaf11");
temp.left = rightsub;
rightsub = temp;
for (i = 9; i > 0; i--) {
  var temp = new BinaryTreeNode(`r${i}`);
  temp.right = rightsub;
  rightsub = temp;
}
var counterExample = new BinaryTreeNode("root");
counterExample.left = leftsub;
counterExample.right = rightsub;
assert(!counterExample.isSuperBalanced());
console.log("recursive solution passes");

console.log("checking iterative solution");
assert(superbalanced.isSuperBalancedItr());
assert(!notSuperBalanced.isSuperBalancedItr());
assert(!counterExample.isSuperBalancedItr());
console.log("iterative solution passes");


console.log("success!");
