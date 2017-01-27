/* Write a function getProductsOfAllIntsExceptAtIndex() that takes an array of integers and returns an array of the products.

For example, given:

  [1, 7, 3, 4]

your function would return:

  [84, 12, 28, 21]

by calculating:

  [7*3*4, 1*3*4, 1*7*4, 1*7*3]

Do not use division in your solution.
*/

// Greedy algorithm: product of all prior numbers * product of all subsequent numbers
// Edge cases:
// -- empty array, return empty array
// -- single item array, return 1
function productsExcept(nums) {
  var len = nums.length;

  // This is a tecnically unecessary second pass through the array
  // Still linear time, but eliminating this is nice.
  // Whoops, could've used Array.fill(1);
  var results = Array.apply(null, Array(len)).map(function(index, item) { return 1 });

  var before = 1;
  var after = 1;
  for (var i = 0; i < len; i++) {
    results[i] *= before;
    before *= nums[i];

    results[len - (i + 1)] *= after;
    after *= nums[len - (i + 1)];

  }

  return results;
}

function productsExceptSinglePass(nums) {
  var len = nums.length;
  if (len === 0) {
    return [];
  }

  var results = Array(len);

  var before = 1;
  var after = 1;
  for (var i = 0; i < len; i++) {
    results[i] = results[i] ? results[i] * before : before;
    before *= nums[i];

    var reverseI = len - (i + 1);
    results[reverseI] = results[reverseI] ? results[reverseI] *  after : after;
    after *= nums[reverseI];

  }

  return results;
}

console.log("* Two Passes *");
console.log("Given example " + JSON.stringify(productsExcept([1, 7, 3, 4])));
console.log("Empty input " + JSON.stringify(productsExcept([])));
console.log("input length = 1 " + JSON.stringify(productsExcept([42])));
console.log("input contains a 0 " + JSON.stringify(productsExcept([1, 7, 0, 4])));

console.log("* Single Pass *");
console.log("Given example " + JSON.stringify(productsExceptSinglePass([1, 7, 3, 4])));
console.log("Empty input "+ JSON.stringify(productsExceptSinglePass([])));
console.log("input length = 1 "+ JSON.stringify(productsExceptSinglePass([42])));
console.log("input contains a 0 " + JSON.stringify(productsExceptSinglePass([1, 7, 0, 4])));

