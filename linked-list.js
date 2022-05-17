// a node should have a value and should have a pointer to the next node.
class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    };
};

class LinkedList {
    // head is initialized with a value of null until it is fed an argument
    constructor(head = null) {
        this.head = head;
    };

    // get for returning the number of nodes in the list; 
    size() {
        let count = 0;
        let node = this.head;

        // while node is not null, perform this loop:
        while (node) {
            count++;
            // TODO: Where exactly does the .next method get translated over from the Node class?
            node = node.next;
        };

        return count;
    };
    
    // set the head to null, effectively clearing the linked list of all its trailing values
    clear() {
        this.head = null;
    };


    // returns the last node of the linked list
    getLast() {
        // initialize lastNode with value of head
        let lastNode = this.head;
        // if lastNode is not null (i.e. if head is not 'empty') perform this code
        if (lastNode) {
            // while the NEXT node after lastNode is not null, perform this loop. If the NEXT node after lastNode is null, then we are at the end of the linked list.
            while (lastNode.next) {
                // since this loop stops right at the second to last node, lastNode will be set to the last node.
                lastNode = lastNode.next;
            };
        };

        return lastNode;
    };

    // returns the first node of the linked list
    getFirst() {
        return this.head;
    }

    // method for adding a new node to the list
    add(element) {
        let node = this.head
        // while the NEXT node is not null, run this loop
        while (node.next) {
            node = node.next;
        };

        // at this point the loop has ended and we are positioned at the end of the linked list, just before null. We will set node.next (which is currently null) to be the new Node(element)
        node.next = new Node(element);
    };

    // method for removing a node from the end of the list
    //TODO: need catch for when 'val' doesn't exist
    remove(val) {
        let node = this.head
        let previousNode; 
        // console.log(node.val);

        if (node.val === val) {
            // This is a catch for when the first value in the linked list is the value we want to remove. We will simply set the next node in the list to be the head instead. 
            head = node.next;
        } else {
            //TODO: Explain how this works
            // Perform this loop until we reach a node that matches the argument. Once we reach a point where node.val === val, previousNode will have a value representing the node just prior to node.val === val, which we will use below.
            while (node.val !== val) {
                previousNode = node;
                node = node.next;
            }
            // console.log(previousNode.next.val);
            console.log(node.val);

            // Once we have reached this point, node.val === val. We will overrwrite the current node to be the value of the node just after it, effectively removing it from the linked list.
            previousNode.next = node.next;

            // This doesn't work but the line above does? Even though node and previousNode.next are equivalent. This line of code doesn't actually affect the linked list in any way.
            // node = node.next;
        }

    }

};

const nodeA = new Node(1);
const nodeB = new Node(3);
// point to the next node manually
nodeA.next = nodeB;

// IMPORTANT: nodeA becomes the head of the new LinkedList, 'list'. nodeA retains all the properties of the Node class, i.e. this.val and this.next
let list = new LinkedList(nodeA);

// logs the whole list, i.e.  Node { val: 1, next: Node { val: 3, next: null } }
// console.log(list.head);

// logs Node { val: 3, next: null }
// console.log(list.head.next);

// logs 3
// console.log(list.head.next.val);

list.add(5);
// list.add(7);
// list.add(10);
// list.add(11);
// console.log(list.size());

list.remove(3);
// console.log(list.size());
console.log(list.head);


// Old add() method for reference. 
    // method for adding a new node to the list
    // add(element) {
    //     let node = this.head
    //     // while node is not null, run this loop
    //     while (node) {
    //         if (!node.next) {
    //             node.next = new Node(element);
    //         };

    //         node = node.next;
    //     }
    //     return;
    // }