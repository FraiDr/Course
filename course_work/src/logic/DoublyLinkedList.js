import "./doublyLinkedList.css"
import React, {useEffect, useRef} from "react";
import DoublyLinkedListLogic from "./DoublyLinkedListLogic";
import DoublyLinkedListNode from "./DoublyLinkedListNode";

const CANVAS_WIDTH = 16000
const CANVAS_HEIGHT = 9000
const RECTANGLE_SIDE = 500 // rectangle - the look of the node

const stepY = 600

function DoublyLinkedList() {
    const SEARCH_INPUT_REF = useRef(null)
    const DELETE_INPUT_REF = useRef(null)
    const MSG_REF = useRef(null)
    const INDEX_REF = useRef(null)
    const CANVA_REF = useRef(null)
    const CTX_REF = useRef(null)
    const ADD_VALUE_INPUT_REF = useRef(null)
    let   ADD_BUTTON_REF = useRef(null)
    let   SEARCH_BUTTON_REF = useRef(null)
    let   DELETE_BUTTON_REF = useRef(null)

    let pauseTime = 1000
    const buttons = [ADD_BUTTON_REF, INDEX_REF, ADD_VALUE_INPUT_REF, SEARCH_INPUT_REF, SEARCH_BUTTON_REF, DELETE_INPUT_REF, DELETE_BUTTON_REF]

    const list = new DoublyLinkedListLogic()

    useEffect(() => {
        if (CANVA_REF.current) {
            CTX_REF.current = CANVA_REF.current.getContext('2d');
        }
        //    Update
    }, []);

    // -------------------

    const InsertionAt = () => {
        let value = +ADD_VALUE_INPUT_REF.current.value
        let index = +INDEX_REF.current.value
        ADD_VALUE_INPUT_REF.current.value = ""
        INDEX_REF.current.value = ""
        buttonsOffOn()
        InsertAtLogic(index, value)
    }

    const Searching = () => {
        let value = +SEARCH_INPUT_REF.current.value;
        SEARCH_INPUT_REF.current.value = ""
        buttonsOffOn()
        SearchingLogic(value)

    }

    const Delete = () => {
        let value = +DELETE_INPUT_REF.current.value;
        DELETE_INPUT_REF.current.value = ""
        buttonsOffOn()
        DeletionLogic(value)
    }



    //-------------

    function drawList() {
        CTX_REF.current.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
        let current = list.head
        while (current) {
            drawNode(current)
            current = current.next
        }

        drawHead()

        drawTail()

    }

    function createOutputArray(outputArray) { // проходження по лісту
        let currentNode = list.head
        while (currentNode) {
            outputArray.push({...currentNode})
            currentNode = currentNode.next
        }

    }

    function drawHead() {
        if (list.head) {
            CTX_REF.current.lineWidth = "40"
            const headNode = new DoublyLinkedListNode(null)
            headNode.currentX = list.head.currentX
            headNode.currentY = list.head.currentY - stepY
            CTX_REF.current.beginPath()
            CTX_REF.current.arc(headNode.currentX + RECTANGLE_SIDE / 2, headNode.currentY + RECTANGLE_SIDE / 2, RECTANGLE_SIDE / 2, 2 * Math.PI, 0)
            CTX_REF.current.stroke()
            CTX_REF.current.font = "170px Arial";
            CTX_REF.current.fillText("Head", headNode.currentX + RECTANGLE_SIDE * 0.1, headNode.currentY + RECTANGLE_SIDE / 1.5)
        }

    }

    function drawTail() {
        if (list.tail) {
            CTX_REF.current.lineWidth = "40"
            const tailNode = new DoublyLinkedListNode(null)
            tailNode.currentX = list.tail.currentX
            tailNode.currentY = list.tail.currentY + stepY
            CTX_REF.current.beginPath()
            CTX_REF.current.arc(tailNode.currentX + RECTANGLE_SIDE / 2, tailNode.currentY + RECTANGLE_SIDE / 2, RECTANGLE_SIDE / 2, 2 * Math.PI, 0)
            CTX_REF.current.stroke()
            CTX_REF.current.font = "170px Arial";
            CTX_REF.current.fillText("Tail", tailNode.currentX + RECTANGLE_SIDE * 0.1, tailNode.currentY + RECTANGLE_SIDE / 1.5)
        }
    }

    function drawNode(node) {
        if (node.checked) {
            CTX_REF.current.lineWidth = "40"
            CTX_REF.current.fillStyle = "rgba(136,123,123,0.75)"

            CTX_REF.current.fillRect(node.currentX, node.currentY, RECTANGLE_SIDE, RECTANGLE_SIDE)

            CTX_REF.current.rect(node.currentX, node.currentY, RECTANGLE_SIDE, RECTANGLE_SIDE)
            CTX_REF.current.stroke()
            CTX_REF.current.font = "170px Arial";
            CTX_REF.current.fillStyle = "rgba(0,0,0,1)"

            CTX_REF.current.fillText(node.value, node.currentX + RECTANGLE_SIDE * 0.1, node.currentY + RECTANGLE_SIDE / 2)
        } else {
            CTX_REF.current.lineWidth = "40"
            CTX_REF.current.beginPath()
            CTX_REF.current.fillStyle = "blue"
            CTX_REF.current.rect(node.currentX, node.currentY, RECTANGLE_SIDE, RECTANGLE_SIDE)
            CTX_REF.current.stroke()
            CTX_REF.current.font = "170px Arial";
            CTX_REF.current.fillText(node.value, node.currentX + RECTANGLE_SIDE * 0.1, node.currentY + RECTANGLE_SIDE / 2)
        }


        if (node.next) {
            drawArrowForNext(node, node.next)
        }

        if (node.previous) {
            drawArrowForPrevious(node, node.previous)
        }

    }

    function drawArrowForNext(node, nextNode) {
        const startX = node.currentX + RECTANGLE_SIDE
        const startY = node.currentY + 0.2 * RECTANGLE_SIDE
        let endX = nextNode.currentX - 50
        const endY = nextNode.currentY + 0.2 * RECTANGLE_SIDE
        CTX_REF.current.moveTo(startX, startY)
        CTX_REF.current.lineTo(endX, endY)
        CTX_REF.current.stroke()
        const dx = startX - endX
        const dy = startY - endY
        const headlen = 60
        const angle = Math.atan(dy / dx)

        CTX_REF.current.beginPath();
        CTX_REF.current.moveTo(endX, endY);
        CTX_REF.current.lineTo(endX - headlen * Math.cos(angle - Math.PI / 7), endY - headlen * Math.sin(angle - Math.PI / 7));
        CTX_REF.current.lineTo(endX - headlen * Math.cos(angle + Math.PI / 7), endY - headlen * Math.sin(angle + Math.PI / 7));
        CTX_REF.current.lineTo(endX, endY);
        CTX_REF.current.lineTo(endX - headlen * Math.cos(angle - Math.PI / 7), endY - headlen * Math.sin(angle - Math.PI / 7));
        CTX_REF.current.stroke();

    }

    function drawArrowForPrevious(node, previousNode) {
        const startX = node.currentX
        const startY = node.currentY + 0.8 * RECTANGLE_SIDE
        let endX = previousNode.currentX + RECTANGLE_SIDE + 50
        let endY = previousNode.currentY + 0.8 * RECTANGLE_SIDE
        CTX_REF.current.moveTo(startX, startY)
        CTX_REF.current.lineTo(endX, endY)
        CTX_REF.current.stroke()
        const dx = startX - endX
        const dy = startY - endY

        const headlen = 60
        const angle = Math.PI + Math.atan(dy / dx)
        CTX_REF.current.beginPath();
        CTX_REF.current.moveTo(endX, endY);
        CTX_REF.current.lineTo(endX - headlen * Math.cos(angle - Math.PI / 7), endY - headlen * Math.sin(angle - Math.PI / 7));
        CTX_REF.current.lineTo(endX - headlen * Math.cos(angle + Math.PI / 7), endY - headlen * Math.sin(angle + Math.PI / 7));
        CTX_REF.current.lineTo(endX, endY);
        CTX_REF.current.lineTo(endX - headlen * Math.cos(angle - Math.PI / 7), endY - headlen * Math.sin(angle - Math.PI / 7));
        CTX_REF.current.stroke();

    }

    function buttonsOffOn() {
        // eslint-disable-next-line array-callback-return
        buttons.map(button => {
            button.current.disabled = !button.current.disabled
        })

    }

    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }

    const hideFloatedMsg = () => {
        MSG_REF.current.style.display = "none"
        MSG_REF.current.innerText = ""
        buttonsOffOn()
    }


    // --------- Main Logic ----------

    function InsertAtLogic(index, value) {
        let outputArray = []
        let counter = 0
        createOutputArray(outputArray)

        if (index < 0 || index > list.length()) {
            MSG_REF.current.style.display = "block"
            MSG_REF.current.innerText = "Invalid index"
            sleep(pauseTime).then(hideFloatedMsg)
        } else {
            animateInsertionAt()
        }

        function animateInsertionAt() {
            CTX_REF.current.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            counter++ // кількість нод що ми пройшли
            MSG_REF.current.style.display = "block"
            MSG_REF.current.innerText = "go through nodes,marks them grey until we reach right index"
            let checker = 0 
            // eslint-disable-next-line array-callback-return
            outputArray.map(node => {
                if (checker < counter) {
                    node.checked = true
                    checker++
                }
                drawNode(node)
            })
            drawTail()
            drawHead()
            sleep(pauseTime).then(() => {
                if (counter < index) {
                    animateInsertionAt()
                } else {
                    hideFloatedMsg()
                    list.insertAt(index, value)
                    drawList()
                }
            })

        }
    }

    function SearchingLogic(value) {
        let counter = 0
        let outputArray = []
        let currentNode = list.head

        if (!list.head) {
            MSG_REF.current.style.display = "block"
            MSG_REF.current.innerText = "Empty List"
            sleep(pauseTime).then(hideFloatedMsg)
        } else {
            createOutputArray(outputArray)
            animationSearching()
        }

        function animationSearching() {
            counter++
            CTX_REF.current.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            MSG_REF.current.style.display = "block"
            MSG_REF.current.innerText = "go through nodes,marks them grey until we reach right index"
            let checker = 0
            // eslint-disable-next-line array-callback-return
            outputArray.map(node => {
                if (checker < counter) {
                    node.checked = true
                    checker++
                }
                drawNode(node)
            })
            drawTail()
            drawHead()
            sleep(pauseTime).then(() => {
                if (currentNode) {
                    if (currentNode.value !== value) {
                        currentNode = currentNode.next
                        animationSearching()
                    } else {
                        MSG_REF.current.style.display = "block"
                        MSG_REF.current.innerText = value + " was found!"
                        sleep(pauseTime).then(hideFloatedMsg)
                        drawList()
                    }
                } else {
                    MSG_REF.current.style.display = "block"
                    MSG_REF.current.innerText = value + " is not found"
                    sleep(pauseTime).then(hideFloatedMsg)
                }
            })

        }


    }

    function DeletionLogic(value) {
        let counter = 0
        let outputArray = []
        let currentNode = list.head

        if (!list.head) {
            MSG_REF.current.style.display = "block"
            MSG_REF.current.innerText = "Invalid value you want to delete"
            sleep(pauseTime).then(hideFloatedMsg)
        } else {
            createOutputArray(outputArray)
            animationDeletion()
        }

        function animationDeletion() {
            counter++
            CTX_REF.current.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
            MSG_REF.current.style.display = "block"
            MSG_REF.current.innerText = "go through nodes,marks them grey until we reach right index"
            let checker = 0
            // eslint-disable-next-line array-callback-return
            outputArray.map(node => {
                if (checker < counter) {
                    node.checked = true
                    checker++
                }
                drawNode(node)
            })
            drawTail()
            drawHead()
            sleep(pauseTime).then(() => {
                if (currentNode) {
                    if (currentNode.value !== value) {
                        currentNode = currentNode.next
                        animationDeletion()
                    } else {
                        MSG_REF.current.style.display = "block"
                        MSG_REF.current.innerText = "node was deleted!"
                        list.delete(value)
                        sleep(pauseTime).then(hideFloatedMsg)
                        drawList()
                    }
                } else {
                    MSG_REF.current.style.display = "block"
                    MSG_REF.current.innerText = "node not found to be deleted!"
                    sleep(pauseTime).then(hideFloatedMsg)
                }
            })

        }

    }

    return (<>
        <main>
            <div className="msg" ref={MSG_REF}></div>
            <div className="sections">
                <div className="add">
                    <p>Insert value</p>
                    <input type="number" placeholder="input value..." ref={ADD_VALUE_INPUT_REF}/>
                    <p>At index</p>
                    <input className = "input-value-box" type="number" placeholder="index" ref={INDEX_REF}/>
                    <button className="sections-btn" ref={ADD_BUTTON_REF} onClick={InsertionAt}>Add</button>
                </div>

                <div className="search">
                    <p>Search value</p>
                    <input className = "input-value-box" type="number"  placeholder="input value..." ref={SEARCH_INPUT_REF}/>
                    <button className="sections-btn" ref={SEARCH_BUTTON_REF} onClick={Searching}>Search</button>
                </div>

                <div className="delete">
                    <p>Delete value</p>
                    <input className = "input-value-box" type="number"  placeholder="input value..." ref={DELETE_INPUT_REF}/>
                    <button className="sections-btn" ref={DELETE_BUTTON_REF} onClick={Delete}>Delete</button>
                </div>


            </div>

            <canvas className="canvas" ref={CANVA_REF} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} ></canvas>

        </main>
    </>);
}

export default DoublyLinkedList;