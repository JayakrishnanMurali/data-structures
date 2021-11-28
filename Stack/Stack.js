import Nodes from "./Nodes.js";

class Stack {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(value) {
    const newNode = new Nodes(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  pop() {
    if (!this.head) {
      return null;
    }
    const deletedNode = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedNode;
  }
}

var stack = new Stack();

stack.push(12);
stack.push(22);

console.log(stack);

console.log("Deleted Node:", stack.pop());

console.log(stack);
