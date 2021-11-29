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

  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });

    return node ? node.value.value : undefined;
  }

  has(key) {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys() {
    return Object.keys(this.keys);
  }
  getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket
        .toArray()
        .map((linkedListNodes) => linkedListNodes.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}

var hash = new HashTable();

hash.set("Hello", "World!!");
hash.set("Hello", "Check");
hash.set("Test", "hahaha");
hash.set("Man", "boy");
hash.set("Girl", "Women");
hash.set("Food", "LoL");

console.log(hash);
console.log("Delted: ", hash.delete("Test"));

console.log("Got it:", hash.get("Hello"));
console.log(hash);

console.log("Keys: ", hash.getKeys());

console.log("Final: ", hash.getValues());
