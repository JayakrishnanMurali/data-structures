class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.size() === 0;
  }

  insert(value) {
    this.heap.push(value);
    this.heapify();
  }

  heapify() {
    let childIndex = this.size() - 1;

    while (childIndex > 0) {
      const childElement = this.heap[childIndex];
      const parentIndex = Math.floor((childIndex - 1) / 2);
      const parentElement = this.heap[parentIndex];

      if (parentElement[0] < childElement[0]) break;

      this.heap[childIndex] = parentElement;
      this.heap[parentIndex] = childElement;
      childIndex = parentIndex;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const tmp = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = tmp;
      this.sinkDown(0);
    }

    return min;
  }

  sinkDown(index) {
    const left = index * 2 + 1;
    const right = index * 2 + 2;
    let smallest = index;
    const length = this.size();

    if (left < length && this.heap[left][0] < this.heap[smallest][0]) {
      smallest = left;
    }
    if (right < length && this.heap[right][0] < this.heap[smallest][0]) {
      smallest = right;
    }

    if (smallest !== index) {
      const tmp = this.heap[smallest];
      this.heap[smallest] = this.heap[index];
      this.heap[index] = tmp;
      this.sinkDown(smallest);
    }
  }
}

const minHeap = new MinHeap();

minHeap.insert([21]);
minHeap.insert([211]);
minHeap.insert([245]);
minHeap.insert([4]);
minHeap.insert([51]);
minHeap.insert([641]);

console.log(minHeap);

console.log("Min: ", minHeap.extractMin());
console.log(minHeap);
