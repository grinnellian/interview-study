/*
Implement a queue with 2 stacks. Your queue should have an enqueue and a dequeue function and
it should be "first in first out" (FIFO).
Optimize for the time cost of m function calls on your queue. These can be any mix of enqueue and
dequeue calls.

Assume you already have a stack implementation and it gives O(1) time push and pop.
*/

// Well, this is kinda silly, because we already have Array.shift() and Array.unshift() in js
// and if I'm using a pre-built stack it's gonna be Array.push() and Array.pop() anyway.

// So, we want the best average case of enQ and deQ.  Let's pretend this is C
// (but inexplicably still use Array's push and pop)

class Queue {

  constructor(stackSize) {
    this.inStack = new Array();
    this.outStack = new Array();
  }

  enqueue(value) {
    this.inStack.push(value)
  }

  dequeue() {
    if (!this.outStack.length) { // using this as outStack.isEmpty()
      while(this.inStack.length)  { // !isEmpty()
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack.pop();
  }
}
