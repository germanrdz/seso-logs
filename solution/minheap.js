class MinHeap {
  constructor() {
    this.values = [];
  }

  getSize() {
    return this.values.length;
  }

  add(value) {
    this.values.push(value);
    this.bubbleUp();

    return this.values;
  }

  remove() {
    if (!this.values.length) return;

    const min = this.values[0];
    const end = this.values.pop();

    if (this.values.length) {
      this.values[0] = end;
      this.sinkDown();
    }

    return min;
  }

  bubbleUp() {
    let valueIndex = this.values.length - 1;
    let value = this.values[valueIndex];

    while (valueIndex > 0) {
      let parentIndex = Math.floor((valueIndex - 1) / 2);
      let parent = this.values[parentIndex];

      if (value.log.date >= parent.log.date) break;

      this.values[parentIndex] = value;
      this.values[valueIndex] = parent;
      valueIndex = parentIndex;
    }
  }

  sinkDown() {
    const length = this.values.length;
    let element = this.values[0];
    let index = 0;

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild = this.values[leftChildIndex];
      let rightChild = this.values[rightChildIndex];
      let swapIndex = null;

      if (leftChildIndex < length && leftChild.log.date < element.log.date) {
        swapIndex = leftChildIndex;
      }

      const swapCondition = swapIndex
        ? rightChild?.log?.date < leftChild?.log?.date
        : rightChild?.log?.date < element?.log?.date;

      if (rightChildIndex < length && swapCondition) {
        swapIndex = rightChildIndex;
      }

      if (!swapIndex) break;

      this.values[index] = this.values[swapIndex];
      this.values[swapIndex] = element;
      index = swapIndex;
    }
  }
}

module.exports = MinHeap;
