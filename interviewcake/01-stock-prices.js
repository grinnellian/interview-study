/* Write an efficient function that takes stockPricesYesterday and returns the best profit I could
 * have made from 1 purchase and 1 sale of 1 Apple stock yesterday.
 */

var stockPricesYesterday = [10, 7, 5, 8, 11, 9];

// Greedy algorithm
// Edge cases:
// -- No profit can be made. Return negative profit
// -- Must be at least two prices (to be able to buy and sell)
function getMaxProfit(prices) {
  if (prices.length < 2) {
    return 0;
  }
  var buyAt = prices[0];
  var maxProfit = prices[1] - buyAt;

  for (var i = 1; i < prices.length; i++) {
    var currProfit = prices[i] - buyAt;
    if (currProfit > maxProfit) {
      maxProfit = currProfit;
    }
    if (prices[i] < buyAt) {
      buyAt = prices[i];
    }
  }

  return maxProfit;
}

/* Improvements: Use Math.max instead of if (this > that) */

console.log("Given example: ".concat(getMaxProfit(stockPricesYesterday)));
console.log("Empty array: ".concat(getMaxProfit([])));
console.log("Bear run: ".concat(getMaxProfit([10, 9, 8, 7, 6, 5])));
console.log("Single price: ".concat(getMaxProfit([7])));
console.log("Two prices: ".concat(getMaxProfit([5, 4])));
