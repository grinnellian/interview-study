var assert = require("assert");
/* Given an array of postive integers, find the only integer in the array without duplicates */

// Specifications suggest, but do not outright say, that duplicate numbers are in pairs.
// It's easier to solve if pairs are guaranteed, but probably better to not assume duplicates
// are in pairs

// First idea: create a set of unique, and of duplicates. Add an item to unique the first time
// it's seen, then add to duplicates.
// O(n) time, O(n) space
var findUnique = function(input) {
  var unique = new Set();
  var duplicate = new Set();

  for (var item of input) {
    if(!duplicate.has(item)) {
      if(unique.has(item)) {
        unique.delete(item);
        duplicate.add(item);
      } else {
        unique.add(item);
      }
    }
  }

  var result = [];
  for (var value of unique.values()) {
    result.push(value);
  }
  return result;
}

// Further specification suggest that the desired solution is actually the special case
// of duplicates occurring in pairs, and that there can be only one unique value.
// Desired characteristics: O(n) time, O(1) space
// So sorting is out.
// A hash of unpaired values would seem to be out too. It would need, worst case, n/2
// space which is O(n) space.
// Same goes for similar strategies, like maintaining pointers to unpaired values, etc.
// So, we go for the old XOR
var findUnpaired = function(input) {
  var result = 0;
  for (var item of input) {
    result ^= item;
  }

  return result;
}

var test = [1,2,3,4,5,4,3,2,1];
assert.equal(findUnique(test), 5);
assert.equal(findUnpaired(test), 5);
