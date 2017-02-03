var assert = require("assert");
/*
Write a function to check that a binary tree ↴ is a valid binary search tree ↴ .
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

// It's a BST iff:
//   current root's value is greater than all values in the left subtree
//   AND current root's value is less than all values in the right subtree
//   AND all subtrees are BSTs
//  Assumption, the tree will use ints

// As usual, trees suggest recursion. However, I'll try for an iterative solution first
// to avoid call stack problems.
// Recursive algorithm sketch for reference.
// -- base case, no children, return [true, value, value]
// -- else return [(left.isBST() && right.isBST() && (this.value > left.maxValue)
//      && (this.value < right.minValue)), minValueChild, maxChildValue]
BinaryTreeNode.prototype.isBSTRecursive = function() {
  return this.isBSTHelper().BST;
}

BinaryTreeNode.prototype.isBSTHelper = function() {
  if (!(this.left) && !(this.right)) {
    return {BST: true, max: this.value, min: this.value};
  }
  var lResult = (this.left) ? this.left.isBSTHelper()
    : {BST: true, max: Number.MIN_SAFE_INTEGER, min: Number.MAX_SAFE_INTEGER, auto: true};
  var rResult = (this.right) ? this.right.isBSTHelper()
    : {BST: true, max: Number.MIN_SAFE_INTEGER, min: Number.MAX_SAFE_INTEGER, auto: true};

  if (lResult.BST && rResult.BST && (this.value > lResult.max) && (this.value < rResult.min)) {
    return {BST: true, min: lResult.min, max: rResult.max};
  }
  else {
    return {BST: false};
  }
}

// BFS vs. DFS? With a DFS, we have a better chance of short-circuiting if a subtree violotes
// the BST conditions. DFS uses stacks.
// Since we're DFS, we're guaranteed to have processed all of a node's children before
// we process the node, except the root which we must not push to start.
// Worst case, we must visit every node, so we expect O(n) time
// Space should be constant. We'll need to track the max value of the left subtree, and the min
// value of the right subtree to check against the root

BinaryTreeNode.prototype.isBST = function() {
  var stack = [];

  stack.push({node: this, min: Number.MIN_SAFE_INTEGER, max: Number.MAX_SAFE_INTEGER});

  while(stack.length) {
    var curr = stack.pop();

    // short circuit if we violate the BST condition
    if ((curr.node.value < curr.min) || (curr.node.value > curr.max)) {
      return false;
    }

    if (curr.node.right) {
      stack.push({node:curr.node.right, min: curr.node.value, max: curr.max});
    }

    if (curr.node.left) {
      stack.push({node:curr.node.left, min: curr.min, max: curr.node.value, });
    }
  }

  return true;
}


var BST = new BinaryTreeNode(5);
BST.insertLeft(3).insertLeft(2).insertLeft(1);
BST.left.insertRight(4);
BST.insertRight(9).insertLeft(8).insertLeft(6).insertRight(7);

var notBST = new BinaryTreeNode(5);
notBST.insertLeft(3).insertLeft(2).insertLeft(1);
notBST.left.insertRight(4);
notBST.insertRight(9).insertLeft(7).insertLeft(8);

var gotcha = new BinaryTreeNode(50);
gotcha.insertLeft(30).insertLeft(20);
gotcha.left.insertRight(60);
gotcha.insertRight(80).insertRight(90);
gotcha.right.insertLeft(70);


assert(BST.isBSTRecursive());
assert(!notBST.isBSTRecursive());
assert(!gotcha.isBSTRecursive());
console.log("Recursive passes!");

assert(BST.isBST());
assert(!notBST.isBST());
assert(!gotcha.isBST());
console.log("Iterative passes!");

console.log("Success!");
