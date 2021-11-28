import Nodes from "./Nodes.js";
import Comparator from "./Comparator.js";

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  enqueue(value) {
    const newNode = new Nodes(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  dequeue() {
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

var q = new Queue();

q.enqueue(12);
q.enqueue(22);

console.log(q);

console.log("Deleted Node:", q.dequeue());

console.log(q);
