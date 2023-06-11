import DoublyLinkedListNode from "./DoublyLinkedListNode";

const stepX = 1300
const startX = 900
const startY = 900

export default class DoublyLinkedListLogic {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    length() {
        let length = 0
        let currentNode = this.head
        while (currentNode) {
            length++
            currentNode = currentNode.next
        }
        return length
    }

    prepend(value) {
        const newNode = new DoublyLinkedListNode(value, this.head);

        if (this.head) {
            this.head.previous = newNode;
            let currentNode = this.head
            while (currentNode) {
                currentNode.currentX += stepX
                currentNode = currentNode.next
            }

        }
        newNode.currentX = startX
        newNode.currentY = startY
        this.head = newNode;


        if (!this.tail) {
            this.tail = newNode;
        }


        return this;
    }

    append(value) {

        const newNode = new DoublyLinkedListNode(value);
        newNode.currentY = startY

        if (this.tail) {

            this.tail.next = newNode;
            this.tail.next.currentX = this.tail.currentX + stepX

        } else {
            newNode.currentX = startX
        }


        newNode.previous = this.tail;


        this.tail = newNode;


        if (!this.head) {
            this.head = newNode;
        }

    }

    delete(value) {

        if (this.head) {
            let deletedNode = null;
            let currentNode = this.head;

            while (currentNode) {
                if (currentNode.value === value) {
                    break
                }
                currentNode = currentNode.next
            }

            if (currentNode) {
                deletedNode = currentNode;
                if (deletedNode === this.head) {

                    this.head = deletedNode.next;


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
                    const previousNode = deletedNode.previous;
                    const nextNode = deletedNode.next;

                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }

                while (currentNode.next) {
                    currentNode.next.currentX -= stepX
                    currentNode = currentNode.next
                }
            }

        }

    }

    find(value) {

        if (!this.head) {
            return null;
        }

        let currentNode = this.head;

        while (currentNode) {

            if (value !== undefined && currentNode.value === value) {
                return currentNode;
            }


            currentNode = currentNode.next;
        }

        return null;
    }

    insertAt(index, value) {

        if (index === 0) {
            this.prepend(value);
        } else {
            let newNode = new DoublyLinkedListNode(value)

            let previousNode = this.head;
            for (let k = 0; k < index - 1; k++) {
                previousNode = previousNode.next;
            }

            newNode.currentX = previousNode.currentX + stepX
            newNode.currentY = previousNode.currentY

            let nextNode = previousNode.next;
            newNode.next = nextNode;
            previousNode.next = newNode;
            newNode.previous = previousNode;

            if (nextNode) {
                nextNode.previous = newNode
                let currentNode = nextNode
                while (currentNode) {
                    currentNode.currentX += stepX
                    currentNode = currentNode.next
                }
            } else {
                this.tail = newNode
            }

        }


    }


}