/* Write a class TempTracker with these methods:

insert()—records a new temperature
getMax()—returns the highest temp we've seen so far
getMin()—returns the lowest temp we've seen so far
getMean()—returns the mean of all temps we've seen so far
getMode()—returns a mode of all temps we've seen so far
Optimize for space and time. Favor speeding up the getter functions (getMax(), getMin(), getMean(), and getMode()) over speeding up the insert() function.

Temperatures will all be inserted as integers. We'll record our temperatures in Fahrenheit, so we can assume they'll all be in the range 0..1100..110.

If there is more than one mode, return any of the modes.
*/

// On insert, update all min, max, mean
// mode requires a count of temps seen, so all inserted temps must be recorded
// min, max trivial
// mean can be more efficient if, rather than recomputing from scratch, we do:
//  mean + ((new - mean) / number of temps)

var assert = require("assert");

class TempTracker {

  constructor() {
    this.numTemps = 0;
    this.mean = 0;
    this.max = 0;
    this.min = 110;
    this.modeCount = 0;
    this.mode = 0;
    this.temps = {};
  }

  insert(temp) {
    this.max = Math.max(temp, this.max);
    this.min = Math.min(temp, this.min);

    this.numTemps++;
    this.mean += ((temp - this.mean)/ this.numTemps);

    if (this.temps.hasOwnProperty(temp)) {
      this.temps[temp] += 1;
    }
    else {
      this.temps[temp] = 1;
    }

    if (this.temps[temp] > this.modeCount) {
      this.mode = temp;
      this.modeCount = this.temps[temp];
    }
  }

  getMax() {
    return this.max;
  }

  getMin() {
    return this.min;
  }

  getMean() {
    return this.mean;
  }

  getMode() {
    return this.mode;
  }
}

var tracker = new TempTracker();
tracker.insert(50);
assert.equal(tracker.getMin(), 50);
assert.equal(tracker.getMax(), 50);
assert.equal(tracker.getMean(), 50);
assert.equal(tracker.getMode(), 50);
tracker.insert(50);
assert.equal(tracker.getMin(), 50);
assert.equal(tracker.getMax(), 50);
assert.equal(tracker.getMean(), 50);
assert.equal(tracker.getMode(), 50);
tracker.insert(20);
assert.equal(tracker.getMin(), 20);
assert.equal(tracker.getMax(), 50);
assert.equal(tracker.getMean(), 40);
assert.equal(tracker.getMode(), 50);
tracker.insert(100);
assert.equal(tracker.getMin(), 20);
assert.equal(tracker.getMax(), 100);
assert.equal(tracker.getMean(), 55);
assert.equal(tracker.getMode(), 50);
tracker.insert(100);
assert.equal(tracker.getMin(), 20);
assert.equal(tracker.getMax(), 100);
assert.equal(tracker.getMean(), 64);
assert.equal(tracker.getMode(), 50);
tracker.insert(100);
assert.equal(tracker.getMin(), 20);
assert.equal(tracker.getMax(), 100);
assert.equal(tracker.getMean(), 70);
assert.equal(tracker.getMode(), 100);
console.log("Success!");
