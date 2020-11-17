// Linked Node
class Node {
  public element: string
  public next: any

  constructor (element: string) {
    this.element = element
    this.next = {}
  }
}

// Linked List
class LinkedList {
  public head: Node

  constructor () {
    this.head = new Node('head')
    this.head.next = this.head
  }

  remove (item: string) {
    const prevNode = this.findPrevious(item)
    if (!(prevNode.next == null)) {
      prevNode.next = prevNode.next.next
    }
  }

  findPrevious (item: string) {
    let currNode = this.head

    while (
      !(currNode.next == null) &&
      !(currNode.next.element === 'head') &&
      currNode.next.element !== item
    ) {
      currNode = currNode.next
    }
    return currNode
  }

  getCircleMiddle (item: string) {
    let currNode = this.find(item)
    // console.log(currNode)
    const prevArr: string[] = []
    const nextArr: string[] = []

    for (let i = 0; i < 5; i++) {
      currNode = currNode.next
      if (currNode.next.element === 'head') {
        currNode = currNode.next.next
      }
      nextArr.push(currNode.element)
    }

    for (let i = 0; i < 6; i++) {
      prevArr.push(currNode.element)
      currNode = currNode.next

      if (currNode.next.element === 'head') {
        currNode = currNode.next.next
      }
    }

    // console.log(JSON.stringify(prevArr))
    // console.log(JSON.stringify(nextArr))

    return prevArr.concat(nextArr)
  }

  display () {
    let currNode = this.head
    while (!(currNode.next == null) && !(currNode.next.element === 'head')) {
      console.log(currNode.next.element)
      // console.log(currNode.next)
      currNode = currNode.next
    }
  }

  find (element: string) {
    let currNode = this.head
    while (currNode.element !== element) {
      currNode = currNode.next
    }
    // console.log(currNode)
    return currNode
  }

  insert (newElement: string, item: string) {
    const newNode = new Node(newElement)
    const current = this.find(item)
    if (current) {
      newNode.next = current.next
      current.next = newNode
    }
    return this
  }
}

export default LinkedList
