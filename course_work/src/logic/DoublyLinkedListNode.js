export default class DoublyLinkedListNode {
    constructor(value, next = null, previous = null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
        this.currentX = null
        this.currentY = null
        this.checked = false
    }

    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}