/*
Write a function to find the rectangular intersection of two given rectangles.

Rectangles are always "straight" and never "diagonal."
More rigorously: each side is parallel with either the x-axis or the y-axis.

They are defined as objects like this :

  var myRectangle = {

    // coordinates of bottom-left corner
    leftX: 1,
    bottomY: 5,

    // width and height
    width: 10,
    height: 4,

};

Your output rectangle should use this format as well.
*/
var assert = require("assert");

// Assume all rectangles are in the first quadrant
// Assume that no intersection returns a rectangle with null values
// edge cases
//   rectA within rectB (and vice versa)
//   rectangles share an edge but don't intersect
//   no intersection
//   full intersection. rectA === rectB
// to intersect (rather than just share an edge) they must intersect on X and on Y
// they intersect on X if:
//     rectB.leftX >= rectA.leftX && rectB.leftX <= (rectA.leftX + rectA.width)
//     OR swap rectA, rectB
// they intersect on Y if:
//     rectB.bottomY >= rectB.bottomY && rectB.bottomY <= (rectA.bottomY + rectA.height)
//     OR swap rectangles
// but we want the intersection, not if the intersect
// case where they intersect but do not contain each others corners seems hardest, let's do that first
// rectA = {leftX: 3, bottomY: 3, width: 10, height: 1}
// rectB = {leftX: 5, bottomY: 0, width: 3, height: 5 }
// intersect = {leftX: 5, bottomY: 3, width: 3, height: 1}
// so intersect{leftX: max(leftXs), bottomY: max(bottomYs), width:min(widths), height:min(height)}
// (if they intersect, of course)
// Does that generalize?
// Well, the intersection width and height can never be greater than the smallest width and height, so min makes sense there
// The intersetction can't be out of the bounds of either rectangle, so max makes sense there
function rectIntersect(rectA, rectB) {
  var result = {leftX: null, bottomY: null, width: null, height: null};

  // Has X intersection
  var smallerX = (rectA.leftX < rectB.leftX) ? rectA: rectB;
  var largerX = (smallerX === rectA) ? rectB : rectA;
  // if the larger X is in the range of the smallerX
  // strictly less than because sharing an edge is not intersection
  if (!(largerX.leftX < (smallerX.leftX + smallerX.width))) {
    return result;
  }

  // Has Y intersection
  var smallerY = (rectA.bottomY <= rectB.bottomY) ? rectA : rectB;
  var largerY = (smallerY === rectA) ? rectB : rectA;
  if (!(largerY.bottomY < (smallerY.bottomY + smallerY.height))) {
    return result;
  }

  // Must intersect on X & Y
  result.leftX = Math.max(rectA.leftX, rectB.leftX);
  result.bottomY = Math.max(rectA.bottomY, rectB.bottomY);
  result.width = Math.min(rectA.width, rectB.width);
  result.height = Math.min(rectA.height, rectB.height);

  return result;
}

var rectA = {leftX: 3, bottomY: 3, width: 10, height: 1};
var rectB = {leftX: 5, bottomY: 0, width: 3, height: 5 };
var rectC = {leftX: 99, bottomY: 99, width: 10, height: 10}; // no intersection
var rectD = {leftX: 6, bottomY: 1, width: 1, height: 1 }; // contained in B
var rectE = {leftX: 8, bottomY: 0, width: 1, height: 10 }; // shares edge with B
var nullResult = {leftX: null, bottomY: null, width: null, height: null}
assert.deepEqual(rectIntersect(rectA, rectB), {leftX: 5, bottomY: 3, width: 3, height: 1});
assert.deepEqual(rectIntersect(rectA, rectA), rectA);
assert.deepEqual(rectIntersect(rectA, rectC), nullResult);
assert.deepEqual(rectIntersect(rectB, rectD), rectD);
assert.deepEqual(rectIntersect(rectB, rectE), nullResult);


// Bonus: take array of rectangles, return all overlaps between all pairs, return array
// Naive solution: rectIntersect(rects[0], rects[1...n]) + rectIntersect(rects[1], rects[2...n])....
// It's n^2, but I don't see independent subproblems so that might be the best we can do
// Duplicates: currently included in output
function allRectIntersects(rects) {
  var result = [];

  for (var i = 0; i < rects.length; i++) {
    for (var j = i + 1; j < rects.length; j++) {
      var temp = rectIntersect(rects[i], rects[j]);
      if (temp.width != null) {
        result.push(temp);
      }
    }
  }

  return result;
}


function rectsEqual(rectA, rectB) {
  return ((rectA.leftX === rectB.leftX) &&
    (rectA.bottomY === rectB.bottomY) &&
    (rectA.height === rectB.height) &&
    (rectA.width === rectB.width))
}

var rects = [rectA, rectB, rectD];
var sects = [{leftX: 5, bottomY: 3, width: 3, height: 1}, rectD];
var answer = allRectIntersects(rects);
for (sect of answer) {
  assert(sects.filter(function(element) { return rectsEqual(element, sect); }).length);
}
assert.equal(answer.length, sects.length);

// Bonus: take an array of rectangles, return the overlap (if any) of all rectangles.
// rectIntersect(rects[0], rectInterect(rect[1], ....))
// Short circuit if we ever return the null result, because if any two rectangles don't intersect,
// the intersection of the set is null
// it's O(n) where n is the number of rectangles
function intersectOfAll(given) {
  var result = nullResult;

  if (given.length < 2) {
    return result;
  }

  var rects = given.slice();
  var sect = rectIntersect(rects[0], rects[1]);
  rects.shift();
  rects.shift();
  while ((sect.bottomY != null) && rects.length) {
    sect = rectIntersect(sect, rects[0]);
    rects.shift();
  }

  return sect;
}

var rectF = {leftX: 5, bottomY: 3, width: 5, height: 6}; // Intersects with intersectin of A & B
assert.deepEqual(intersectOfAll([rectA, rectB, rectC]), nullResult);
assert.deepEqual(intersectOfAll([rectA, rectB, rectF]), {leftX: 5, bottomY: 3, width: 3, height: 1});
console.log("Success!");
