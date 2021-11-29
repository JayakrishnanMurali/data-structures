import LinkedList from "./LinkedList.js";

const defaultHashTableSize = 32;

class HashTable {
  constructor(hashTableSize = defaultHashTableSize) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());

    this.keys = {};
  }

  hash(key) {
    const hash = Array.from(key).reduce(
      (hashAccumilator, keySymbol) => hashAccumilator + keySymbol.charCodeAt(0),
      0
    );

    return hash % this.buckets.length;
  }

  set(key, value) {
    this.keys[key] = this.hash(key);
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({
      callback: (nodevalue) => nodevalue.key === key,
    });

    if (!node) {
      bucketLinkedList.append({ key, value });
    } else {
      node.value.value = value;
    }
  }

  delete(key) {
    delete this.keys[key];
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });
    if (node) {
      return bucketLinkedList.delete(node.value);
    }
    return null;
  }
}

var hash = new HashTable();

hash.set("Hello", "World!!");
hash.set("Hello", "Check");
hash.set("Yo", "hhhahaha");

console.log(hash);
console.log("Delted: ", hash.delete("Yo"));

console.log(hash);
