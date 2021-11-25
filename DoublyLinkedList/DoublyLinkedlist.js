import DoublyLinkedlistNodes from "./DoublyLinkedlistNode.js";
import Comparator from "./Comparator.js";

class DoublyLinkedlist {
  constructor(comparatorFunction) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator();
  }

  prepend(value) {
    const newNode = new DoublyLinkedlistNodes(value, this.head);

    if (this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value) {
    const newNode = new DoublyLinkedlistNodes(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }
    this.tail.next = newNode;
    newNode.previous = this.tail;
    this.tail = newNode;

    return this;
  }

  fromArray(values) {
    values.forEach((value) => this.append(value));
    return this;
  }

  toArray() {
    const nodes = [];

    let currNode = this.head;
    while (currNode) {
      nodes.push(currNode.value);
      currNode = currNode.next;
    }

    return nodes;
  }

  delete(value) {
    if (!this.head) {
      return null;
    }

    let deletedNode = null;
    let currNode = this.head;

    while (currNode) {
      if (this.compare.equal(currNode.value, value)) {
        deletedNode = currNode;

        if (deletedNode === this.head) {
          this.head = this.head.next;

          if (this.head) {
            this.head.previous = null;
          }
          if (deletedNode === this.tail) {
            this.tail = null;
          }
        } else if (deletedNode === this.tail) {
          this.tail = deletedNode.previous;
          this.tail.next = null;
        } else {
          const prevNode = deletedNode.previous;
          const nextNode = deletedNode.next;

          prevNode.next = nextNode;
          nextNode.previous = prevNode;
        }
      }
      currNode = currNode.next;
    }
    return deletedNode;
  }

  deleteTail() {
    if (!this.head) {
      return null;
    }

    const deletedNode = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return deletedNode;
    }

    this.tail = this.tail.previous;
    this.tail.next = null;
    return deletedNode;
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedNode = this.head;

    if (this.head.next) {
      this.head = this.head.next;
      this.head.previous = null;
    } else {
      this.head = null;
      this.tail = null;
    }
    return deletedNode;
  }

  find(value) {
    if (!this.head) {
      return null;
    }
    let currNode = this.head;

    while (currNode) {
      if (this.compare.equal(currNode.value, value)) {
        return currNode;
      }

      currNode = currNode.next;
    }

    return null;
  }
  reverse() {
    let currNode = this.head;
    let prevNode = this.head.previous;
    let nextNode = this.head.next;

    if (!this.head) {
      return null;
    }

    while (currNode) {
      nextNode = currNode.next;
      prevNode = currNode.previous;

      currNode.next = prevNode;
      currNode.previous = nextNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;
    return this;

    // check
  }
}

var list = new DoublyLinkedlist();
list.prepend(21);

var arr = [11, 22, 33, 44, 55, 66, 77];

list.fromArray(arr);

console.log(list);

console.log("Deleted Node: ", list.delete(11).value);
console.log("Node Found: ", list.find(33).value);
console.log("Delete Head:", list.deleteHead().value);
console.log("Delete Tail:", list.deleteTail().value);

console.log("Array View: ", list.toArray());

list.reverse();

console.log("Reversed Array View", list.toArray());
