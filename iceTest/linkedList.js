class LinkedList() {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addNode(val) {
    if (!this.head) {
      this.head = {parent: null, value: val, next: null};
      this.tail = this.head;
      return this;
    }

    this.tail.next = {parent: this.tail, value: val, next: null};
    return this;
  }
  
}