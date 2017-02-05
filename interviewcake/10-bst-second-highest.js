/* Write a function to find the 2nd largest element in a binary search tree ↴ . */
var assert = require("assert");

function BinaryTreeNode(value) {
    this.value = value;
    this.left  = null;
    this.right = null;
};

BinaryTreeNode.prototype.insertLeft = function(value) {
    this.left = new BinaryTreeNode(value);
    return this.left;
};

BinaryTreeNode.prototype.insertRight = function(value) {
    this.right = new BinaryTreeNode(value);
    return this.right;
};

// edge cases: what if there's only one value in the tree?
// Assume the tree is full of ints
// Assuming the input is a valid BST, the second highest value will be:
//  if there's a right subtree, the root or to the right of the root
//  if there's no right subtree, the highest value of the left subtree
// if there's a right subtree, no need to inspect the left subtree
// so, traverse the tree tracking the highest and second-highest values found
BinaryTreeNode.prototype.secondLargest = function() {
  if ((!this.left && !this.right)) {
    throw new Error('Tree must have at least 2 nodes');
  }

  var max = -Infinity;
  var second = -Infinity;

  var stack = [];
  stack.push(this);

  while (stack.length) {
    var curr = stack.pop();

    if (curr.value > max) {
      second = max;
      max = curr.value;
    } else if (curr.value > second) {
      second = curr.value;
    }
    if (curr.right) {
      stack.push(curr.right);
    } else if (curr.left) {
      stack.push(curr.left);
    }
  }

  return second;
}

var leftOnly = new BinaryTreeNode(5);
leftOnly.insertLeft(4).insertLeft(3).insertLeft(2).insertLeft(1);

assert.equal(leftOnly.secondLargest(), 4);

var rightOnly = new BinaryTreeNode(1);
rightOnly.insertRight(2).insertRight(3).insertRight(4);
assert.equal(rightOnly.secondLargest(), 3);

var BST = new BinaryTreeNode(5);
BST.insertLeft(3).insertLeft(2).insertLeft(1);
BST.left.insertRight(4);
BST.insertRight(9).insertLeft(8).insertLeft(6).insertRight(7);
assert.equal(BST.secondLargest(), 8);

/*   .   ( 5 )
        /     \
      (3)     (8)
     /  \     /  \
   (1)  (4) (7)  (12)
                 /
               (10)
               /  \
             (9)  (11)
             */
var tricky = new BinaryTreeNode(5);
tricky.insertLeft(3).insertLeft(1);
tricky.left.insertRight(4);
tricky.insertRight(8).insertRight(12).insertLeft(10).insertLeft(9);
tricky.right.insertLeft(7);
tricky.right.right.left.insertRight(11);
console.log(JSON.stringify(tricky));
assert.equal(tricky.secondLargest(), 11);

