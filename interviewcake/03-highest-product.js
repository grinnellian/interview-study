/* Given an arrayOfInts, find the highestProduct you can get from three of the integers.
The input arrayOfInts will always have at least three integers. */

// Naive approach: Sort the array descending then multiply first 3 values. O(nlogn)

// Greedy algorithm: the highest product of two ints * highest remaining int = highest product
// Alternative phrasing: return the product of the three largest ints in the array
//  -- find the three largest ints, then multiply them
// Linear time
// Easy to generalize to highest _n_ ints
// Edge cases:
//  -- ints may be negative (can't initialize temp values to 0)
//  -- array may contain zeros (handled by multiplication)

// First attempt. Not generalizable;
function highestProduct(nums) {
  // The three biggest numbers in the array
  var first = nums[0];
  var second;
  var third;

  for (var i = 1; i < nums.length; i++) {
    if(nums[i] >= first) {
      third = second;
      second = first;
      first = nums[i];
    }
  }

  return first * second * third;
}

console.log(JSON.stringify(highestProduct([-1, 0, 1, 2, 3]))); // 6
// Drat, negative * negative = positive, so finding the 3 largest numbers doesn't work
console.log(JSON.stringify(highestProduct([-10,-10,1,3,2]))); // 300

// That multiple reassignment is messy, and not generalizable.
// Second attempt, accepts int array [nums] of length >= k, and int k, the number of ints
// to multiply
function hP(nums, k) {
  if (k > nums.length) {
    throw new Exception("Length of array must exceed number of integers to multiply");
    // Alternatively, still return highest product, i.e. product of all numbers in array
    // if the length of the array is less than k
  }

  // A natural choice for storing our largest ints is a queue of size k
  // Using JS built-ins, we can enqueue with unshift() and drop the lowest item with pop()
  // Or, skip the pop() step and multiply the first k items regardless.
  var largest = Array();
  largest[0] = nums[0];

  for (var i = 1; i < nums.length; i++) {
    if (nums[i] > largest[0]) {
      largest.unshift(nums[i]);
      // Optional conditional on largest.length to pop uneeded items would make memory constant
    }
  }

  var result = 1;
  for(i = 0; i < k; i++) {
    result *= largest[i];
  }

  return result;
}
console.log(JSON.stringify(hP([-1, 0, 1, 2, 3], 3))); // 6
console.log(JSON.stringify(hP([-1, 0, 1, 2, 3], 4))); // 0

// Third attempt. Account for multiplication of negative by negative.
// Harder to generalize; for now conceptualizing the greedy algorithm as:
// "multilpy the largest product of two numbers by the largest number"
function hPNegs(nums) {
  var highest2 = nums[0] * nums[1];
  var lowest2 = highest2;
  var product3 = highest2 * nums[2];
  var highest = Math.max(...nums.slice(0,3));
  var lowest = Math.min(...nums.slice(0,3));

  for (var i = 2; i < nums.length; i++) {
    var curr = nums[i];
    product3 = Math.max(product3, highest2 * curr, lowest2 * curr);
    highest2 = Math.max(highest2, highest * curr);
    lowest2 = Math.min(lowest2, lowest * curr);

    highest = Math.max(highest, curr);
    lowest = Math.min(lowest, curr);
  }

  return product3;
}

console.log(JSON.stringify(hPNegs([-1, 0, 1, 2, 3]))); // 6
// Drat, negative * negative = positive, so finding the 3 largest numbers doesn't work
console.log(JSON.stringify(hPNegs([-10,-10,1,3,2]))); // 300
console.log(JSON.stringify(hPNegs([1, 2, 3]))); // 6
