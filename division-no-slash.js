/* Integer division without use of `/`, `%`, or `*`
* div(27, 4) = 6
*/


// edge cases:
//  -- divide by 0
//  -- divisor > dividend = 0
//  -- divisor === dividend = 1
//  -- negative numbers?
//    -- pos dividend, neg divisor = negative answer
//    -- neg dividend, pos divisor = negtive answer
//    -- both negative = positive answer
//  -- "greater than" must be by magnitude, i.e. use Math.abs()

// Division is repeated subtraction. A naive solution
// would subtract the divisor from the dividend while the dividend is greater than the divisor.
function naiveDiv(dividend, divisor) {
  if (divisor === 0) {
    if (dividend === 0) {
      return NaN;
    }
    return Infinity;
  }
  var absDividend = Math.abs(dividend);
  var absDivisor = Math.abs(divisor);
  var quotient = 0;
  while (absDividend >= absDivisor) {
    absDividend -= absDivisor;
    quotient++;
  }

  // handle signs. Quotient is negative if dividend XOR divisor negative
  if (((dividend > 0) && (divisor < 0)) || ((dividend < 0) && (divisor > 0))) {
    return -quotient;
  }
  return quotient;
}
console.log("naiveDiv(5,0) = " + naiveDiv(5,0)); // Infinity
console.log("naiveDiv(5,10) = " + naiveDiv(5,10));  // 0
console.log("naiveDiv(0,0) = " + naiveDiv(0,0)); // NaN
console.log("naiveDiv(0,5) = " + naiveDiv(0,5)); // 0
console.log("naiveDiv(25,5) = " + naiveDiv(25,5)); // 5
console.log("naiveDiv(-25,5) = " + naiveDiv(-25,5)); // -5
console.log("naiveDiv(25,-5) = " + naiveDiv(25,-5)); // -5
console.log("naiveDiv(-25,-5) = " + naiveDiv(-25,-5)); // 5
console.log("naiveDiv(1060,7) = " + naiveDiv(1060, 7)); // 151

// A better solution uses bitwise shifting, recognizing that x << 1 = 2 * x, and x >> 1 = x/2 (integer)
// N.B.: << always increases magnitude, >> always decreases magnitude
// N.B: >> is sign-preserving
// N.B: dividend >> divisor is a good starting point

// if dend > sor, quotient >= 1, so quotient = 1
// if (dend >> 1) > sor, quotient >= 2
// if (dend >> 2) > sor, quotient >= 4
//
function div(dividend, divisor) {
  if (divisor === 0) {
    if (dividend === 0) {
      return NaN;
    }
    return Infinity;
  }

  var quotient = 0;
  var pow = 0;
  var absDividend = Math.abs(dividend);
  var absDivisor = Math.abs(divisor);

  if (absDivisor === absDividend) {
    quotient = 1;
  } else if (absDivisor > absDividend) {
    quotient = 0;
  } else {
    var pow = 1;
    while (absDividend > absDivisor) {
      absDivisor <<= 1;
      pow <<= 1;
    }

    while (pow > 1) {
      absDivisor >>= 1;
      pow >>=1;

      if (absDivisor < absDividend) {
        quotient += pow;
        absDividend -= absDivisor;
      }
    }
  }

  // handle signs. Quotient is negative if dividend XOR divisor negative
  if (((dividend > 0) && (divisor < 0)) || ((dividend < 0) && (divisor > 0))) {
    return -quotient;
  }
  return quotient;

}

console.log("div(5,0) = " + div(5,0)); // Infinity
console.log("div(5,10) = " + div(5,10));  // 0
console.log("div(0,0) = " + div(0,0)); // NaN
console.log("div(0,5) = " + div(0,5)); // 0
console.log("div(25,5) = " + div(25,5)); // 5
console.log("div(-25,5) = " + div(-25,5)); // -5
console.log("div(25,-5) = " + div(25,-5)); // -5
console.log("div(-25,-5) = " + div(-25,-5)); // 5
console.log("div(1060,7) = " + div(1060, 7)); // 151
