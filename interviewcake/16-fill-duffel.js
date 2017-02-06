/*
Write a function maxDuffelBagValue() that takes an array of cake type objects and a weight capacity,
and returns the maximum monetary value the duffel bag can hold.
Weights and values may be any non-negative integer.
*/

var assert = require("assert");

var cakeTypes = [
  {weight: 7, value: 160},
  {weight: 3, value: 90},
  {weight: 2, value: 15},
];

var capacity = 20;
// Should return 555

// This is literally the knapsack problem
// If weights may be 0, then the value may be infinite, so we'll have to short-circuit on that
// Capacity of 0 shouldn't be a problem.
// Sounds like memoization is needed.
// Subproblem: "If I take cake x, what's the most value I can get with remaining capacity?"
// So probably bottom-up: find the best value for each lower capacity, then see if we have a better
// value at the new capacity for each new cake.

var maxValue = function(capacity, cakeTypes) {
  for (var cake of cakeTypes) {
    if ((cake.weight === 0) && (cake.value > 0)) {
      return Infinity;
    }
  }

  var values = new Array(capacity + 1).fill(0);

  for (var currCap = 1; currCap <= capacity; currCap++) {
    var currBest = values[currCap - 1]
    for (cake of cakeTypes) {
      if (cake.weight <= currCap) { // see if this cake fits, and improves our current best value
        var valueWithThisCake = cake.value + values[currCap - cake.weight];
        currBest = Math.max(currBest, valueWithThisCake);
      }
    }
    values[currCap] = currBest;
  }

  return values[capacity];
}

assert.equal(maxValue(capacity, cakeTypes), 555);
assert.equal(maxValue(0, cakeTypes), 0);

cakeTypes.push({weight: 0, value: 1});
assert.equal(maxValue(capacity, cakeTypes), Infinity);
cakeTypes.pop();

cakeTypes.push({weight: 0, value: 0});
assert.equal(maxValue(capacity, cakeTypes), 555);
cakeTypes.pop();

// Bonus: Return the choices made
var maxValueCombination = function(capacity, cakeTypes) {
  for (var cake of cakeTypes) {
    if ((cake.weight === 0) && (cake.value > 0)) {
      return Infinity;
    }
  }

  var values = new Array(capacity + 1);
  values[0] = {value: 0, cakes: []};

  for (var currCap = 1; currCap <= capacity; currCap++) {
    values[currCap] = Object.assign({}, values[currCap - 1]);
    for (cake of cakeTypes) {
      if (cake.weight <= currCap) { // see if this cake fits, and improves our current best value
        var valueWithThisCake = cake.value + values[currCap - cake.weight].value;
        if (valueWithThisCake > values[currCap].value) {
          values[currCap].value = valueWithThisCake;
          values[currCap].cakes = values[currCap - cake.weight].cakes.slice();
          values[currCap].cakes.push(cake);
        }
      }
    }
  }

  return values[capacity];
}
console.log(JSON.stringify(maxValueCombination(capacity, cakeTypes)));
