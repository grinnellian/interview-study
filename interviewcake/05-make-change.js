/*
Write a function that, given:

an amount of money
an array of coin denominations
computes the number of ways to make amount of money with coins of the available denominations.

Example: for amount=4 (4¢) and denominations=[1,2,3] (1¢, 2¢ and 3¢), your program would output
4—the number of ways to make 4¢ with those denominations:

1¢, 1¢, 1¢, 1¢
1¢, 1¢, 2¢
1¢, 3¢
2¢, 2¢
*/

// This is basically the canonical dynamic programming question.
function makeChange(amount, denoms, index, store) {
  index = index || 0;
  store = store || {};

  // already solved
  var key = String([amount, index]);
  if (store.hasOwnProperty(key)) {
    return store[key];
  }

  // exact change, or no change needed
  if (amount === 0) {
    return 1;
  }

  // overshoot
  if (amount < 0) {
    return 0;
  }

  // out of potential coins
  if (index === denoms.length) {
    return 0;
  }

  var result = 0;
  var coin = denoms[index];
  while (amount >= 0) {
    result += makeChange(amount, denoms, index + 1, store);
    amount -= coin;
  }

  store[key] = result;
  return result;
}
console.log(makeChange(1, [1,2,3]));

// Optimize for space by going bottom-up
function changeBottom(amount, denoms) {
  var store = [];
  for (var i = 0; i <= amount; i++) {
    store[i] = 0;
  }
  store[0] = 1;

  for (var coin of denoms) {
    for (var higher = coin; higher <= amount; higher++){
      var remainder = higher - coin;
      store[higher] += store[remainder];
    }
  }

  return store[amount];
}
console.log(changeBottom(4, [1,2,3]));
