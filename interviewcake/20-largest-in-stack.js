'use strict';
/* Use the given stack class to implement a new MaxStack class. It has a method getMax()
   that returns the largest item in the stack without removing it.
   The stack will contain only integers.
*/

function Stack() {
  // initialize an empty array
  this.items = [];
}

// push a new item to the last index
Stack.prototype.push = function(item) {
  this.items.push(item);
};

// remove the last item
Stack.prototype.pop = function() {
  // if the stack is empty, return null
  // (it would also be reasonable to throw an exception)
  if (!this.items.length) {
      return null;
  }
  return this.items.pop();
};

// see what the last item is
Stack.prototype.peek = function() {
  if (!this.items.length) {
      return null;
  }
  return this.items[this.items.length -1];
};


// Naively, one could search the stack each time for the largest item, for O(n) on getMax,
// but constat additional space.
// At the cost of space, stack could be copied into an array and sorted for O(nlogn) on getMax,
// but O(n) additional space.
// Time cost could be shifted to insertion by sorting on insert, but that's likely not desirable
// Without further specifications, I'll assume getMax() is called infrequently so O(n) and
// constant space is the way to go.
class MaxStack extends Stack {
  getMax() {
    var max = -Infinity;
    for (var item of this.items) {
      max = Math.max(max, item);
    }
    return max;
  }
}

var foo = new MaxStack();
foo.push(5);
foo.push(3);
foo.push(7);
foo.push(1);
console.log(foo.getMax());
