/*
Write a function that takes an integer flightLength (in minutes) and an array of integers
movieLengths (in minutes) and returns a boolean indicating whether there are two numbers in
movieLengths whose sum equals flightLength.

When building your function:

Assume your users will watch exactly two movies
Don't make your users watch the same movie twice
Optimize for runtime over memory
*/
var assert = require("assert");

// movies can't be reused, so we look for a match of items exluding current
// only a boolean, so can short-circuit as soon as one solution is found
// this feels a little knapsack-y
// worst case we must check the sum of every pair of movies, so n^2
// i.e. for (movie of movies) {(for (movie2 of movies) { if movie + movie2 === flightLength return true}}}
// that also duplicates work, some improvement to be had by elimating movies from
// consideration if there's no match. That helps, but is still O(n^2)
// if we sort the array first, does that get us anything?
// How can we use extra space to reduce time?
// well, movies.indexOf(flightTime - movie) would work, but doesn't help the n^2 problem
// copy movie lengths into an object, so each "does this length exist?" check is constant time
// be careful of duplicate lengths. Record count of movies of each length

var isMoviePair = function(flightLength, movieLengths) {
  var lengths = {};

  for (var movie of movieLengths) {
    if (lengths.hasOwnProperty(movie)) {
      lengths[movie] += 1;
    } else {
      lengths[movie] = 1;
    }
  }

  for (movie of movieLengths) {
    var timeRemaining = flightLength - movie;
    if (lengths.hasOwnProperty(timeRemaining)) {
      // match, but only if it's not the same move
      if (movie === timeRemaining) {
        if (lengths[movie] > 1) {
          return true;
        }
      } else {
        return true;
      }
    }
  }
  return false;
}

// The loops could be combined to check for match then update
// Also, a set can be used to store lengths


var movies = [10,20,30,40,50];
assert(isMoviePair(80, movies));
assert(!isMoviePair(100, movies));

var dupes = movies.slice();
dupes.push(50);
assert(isMoviePair(100, dupes));
