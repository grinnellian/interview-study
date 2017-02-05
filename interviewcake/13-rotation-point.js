/* Write a function for finding the index of the "rotation point," */
var assert = require("assert");
  var words = [
    'ptolemaic',
    'retrograde',
    'supplant',
    'undulate',
    'xenoepist',
    'asymptote', // <-- rotates here!
    'babka',
    'banoffee',
    'engender',
    'karpatka',
    'othellolagkage',
];

var sorted = [
    'asymptote',
    'babka',
    'banoffee',
    'engender',
    'karpatka',
    'othellolagkage'
    ]

// Linear solution is trivial: while prev < curr(//pass;) return curr
// Binary search is going to be more effecient here
// Splitting the array in half, we know that if segment[0] < segment[end], the rotation
// point is not in that segment.
// If the array is in alphabetical order, rotation point is [0], or the start of the current search segment
// If we are searching only two elements, one of them must be the rotation point.
// if seg[1] > seg[0], 0 is rotation point, else 1

var rotationPoint = function(input) {
  var searchLength = input.length;
  var searchStart = 0;

  while (searchLength > 2) {
    if (input[searchStart] < input[searchStart + searchLength - 1]){ // array or segment alphabetical
      return searchStart;
    }

    var halfEnd = Math.floor(searchLength/2);

    if (input[searchStart] > input[halfEnd - 1]) { // target in first half
      searchLength = halfEnd;
    } else { // rotation point in second half
      searchStart += halfEnd;
      searchLength -= halfEnd;
    }
  }

  if (searchLength === 2) {
    console.log("Final two: " + JSON.stringify(input.slice(searchStart, 1)));
    return (input[searchStart + 1] > input[searchStart]) ? searchStart : searchStart + 1;
  }
  return searchStart;
}

assert.equal(rotationPoint(words), 5);
assert.equal(rotationPoint(sorted), 0);
