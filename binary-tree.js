// node structure must be defined first.
// every node can have a left and right child node, no more, per structure of the binary tree. Absence of a child node(s) equates to 'null'
// every node has a 'val' property

// TODO: check if new Node(1, 2, 3), will left = 2 and right = 3, or will left = null and right = null?
// ANSWER: left = 2 and right = 3
class Node {
    // initialize the node's left and right values with 'null', since every new node will be at the end (bottom) of the binary tree. 'Data' will become the 'val' property of the node
    constructor(data, left = null, right = null) {
        this.val = data;
        this.left = left;
        this.right = right;
    };
};

// const fart = new Node(10, 1, 2);
// console.log(fart);

class BST {
    constructor() {
        // initialize every new tree with a root of 'null'
        this.root = null;
    }
    // method for adding new nodes

    add(data) {
        const node = this.root;

        // if new tree then 'root' and thereby 'node' will be 'null' 
        if (node === null) {
            // remember that 'root' is a Node object w/ three properties: val, left, and right.
            this.root = new Node(data);
            console.log(`New tree. Root is:`);
            console.log(this.root);
            return;

        } else {
            // recursive function to search the tree for the proper insert location
            const searchTree = function(node) {
                //TODO: Mind the structure of 'node' at this level.
                if (data < node.val) {
                    // if the child is smaller in value than the parent, then it goes on the left side of the tree, per binary tree structure.
                    if (node.left === null) {
                        // if the left position of the parent node is available, then we can add our new Node(data) here.
                        // Always remember to BREAK/RETURN so that the function ends
                        console.log('Trigger 1');
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        // if the left position of the parent node is taken by a child node, then we must move further down the left side of the binary tree. We can perform this operation recursively:
                        // TODO: why do we put 'return' before searchTree? Removing 'return' seems to make no difference.
                        console.log('Trigger 2');
                        console.log(searchTree(node.left))
                        return searchTree(node.left);
                    }
                }
            }
            // end of recursive function. 

            //TODO: if there is no return here, the tree will not be updated. Why?
            //ANSWER: the recursive function must be CALLED before it it will actually run. Removing 'return' however seems to make no difference.
            return searchTree(node);
        }

    }
}

const newTree = new BST;
newTree.add(100);
newTree.add(99);
newTree.add(98)
console.log(newTree);