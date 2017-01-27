/*

Write a function mergeRanges() that takes an array of meeting time ranges and returns an array of
condensed ranges.

For example, given:

  [
    {startTime: 0,  endTime: 1},
    {startTime: 3,  endTime: 5},
    {startTime: 4,  endTime: 8},
    {startTime: 10, endTime: 12},
    {startTime: 9,  endTime: 10},
]

your function would return:

  [
    {startTime: 0, endTime: 1},
    {startTime: 3, endTime: 8},
    {startTime: 9, endTime: 12},
]

Do not assume the meetings are in order.

Write a solution that's efficient even when we can't put a nice upper bound on the numbers
representing our time ranges. Here we've simplified our times down to the number of 30-minute slots
past 9:00 am. But we want the function to work even for very large numbers, like Unix timestamps.
In any case, the spirit of the challenge is to merge meetings where startTime and endTime don't
have an upper bound.
*/

// cases
//  end equal to start [(0, 3), (3, 5)] = (0, 5)
//  meeting within meeting [(1,2), (1,3)] = (1,3)

// Initial thoughts: no backtracking is needed, ranges only grow
// a single pass won't work though, have to take an answer and merge it again until the output stops
// changing. That's not efficient!
// Something about this says tree to me....
// Greedy subproblems? Begin with the first meeting, greedily add all items to the range
// and remove them from the ToDo. Then, greedy on remainder until no input remains. Promising!

function mergeRanges(ranges) {
  if(ranges.length === 0) {
    throw new Error("Input must contain items");
  }
  // TODO further input validation. Or the caller can catch the exception if a prop is undefined
  // TODO copy input so we don't destroy the caller's object with splice()

  var result = [];
  var startTime;
  var endTime;
  var subResult;

  while(ranges.length > 0) {
    subResult = {"startTime": ranges[0].startTime, "endTime": ranges[0].endTime};
    ranges.shift();

    for(var i = 0; i < ranges.length; /* omitted */) {
      startTime = ranges[i].startTime;
      endTime = ranges[i].endTime;

      if((startTime >= subResult.startTime) && (startTime <= subResult.endTime)) {
        // start overlaps
        subResult.endTime = Math.max(subResult.endTime, endTime);
        ranges.splice(i, 1);
      } else if((endTime <= subResult.endTime) && (endTime >= subResult.startTime)) {
        // end overlaps
        subResult.startTime = Math.min(subResult.startTime, startTime);
        ranges.splice(i, 1);
      } else if((startTime <= subResult.startTime) && (endTime >= subResult.endTime)) {
        // this meeting subsumes subResult
        subResult.startTime = startTime;
        subResult.endTime = endTime;
        ranges.splice(i, 1);
      } else {
        // No overlap, skip it
        i++;
      }
    }

    // subResult has consumed all possible ranges. Add it to the result
    result.push(subResult);
  }

  return result;
}

var ranges =   [
    {startTime: 0,  endTime: 1},
    {startTime: 3,  endTime: 5},
    {startTime: 4,  endTime: 8},
    {startTime: 10, endTime: 12},
    {startTime: 9,  endTime: 10},
];
console.log("Initial example: " + JSON.stringify(mergeRanges(ranges)));
console.log("\nMeeting touch: " + JSON.stringify(mergeRanges([{startTime: 1, endTime: 2}, {startTime: 2, endTime: 3}])));
console.log("\nMeeting subsumed: " + JSON.stringify(mergeRanges([{startTime: 1, endTime: 5}, {startTime: 2, endTime: 3}])));
console.log("\nMerge all: " + JSON.stringify(mergeRanges(  [
    {startTime: 1, endTime: 10},
    {startTime: 2, endTime: 6},
    {startTime: 3, endTime: 5},
    {startTime: 7, endTime: 9},
])));

// Hmm, given solution sorts the array first. Certainly simpler. Yeah, but this does worst-case to
// n^2 (no meetings merged). Tried to be clever, ended up with naive solution.
// But hey, best case it's O(n) (all meeting merged).
