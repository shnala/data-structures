// node structure must be defined first.
// every node can have a left and right child node, no more, per structure of the binary tree. Absence of a child node(s) equates to 'null'
// every node has a 'val' property

// TODO: check if new Node(1, 2, 3), will left = 2 and right = 3, or will left = null and right = null?
// ANSWER: left = 2 and right = 3
class Node {
    // initialize the node's left and right values with 'null', since every new node will be at the end (bottom) of the binary tree. 'Data' will become the 'val' property of the node
    constructor(data, left = null, right = null) {
        this.data = data;
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

    getRoot() {
        return this.root;
    }

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
                if (data < node.data) {
                    // if the child is smaller in value than the parent, then it goes on the left side of the tree, per binary tree structure.
                    if (node.left === null) {
                        // if the left position of the parent node is available, then we can add our new Node(data) here.
                        // Always remember to BREAK/RETURN so that the function ends
                        // console.log('Trigger 1');
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        // if the left position of the parent node is taken by a child node, then we must move further down the left side of the binary tree. We can perform this operation recursively:
                        // TODO: why do we put 'return' before searchTree? Removing 'return' seems to make no difference.
                        // console.log('Trigger 2');
                        // console.log(searchTree(node.left))
                        return searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right)
                    }
                } else {
                    // this will trigger when data === node.val, therefore no insertion can be made
                    return null;
                }
            }
            // end of recursive function. 

            //TODO: if there is no return here, the tree will not be updated. Why?
            //ANSWER: the recursive function must be CALLED before it it will actually run. Removing 'return' however seems to make no difference.
             searchTree(node);
        }

    }

    // 'while' loop method for finding the minimum value of the binary tree
    // this value can be retrieved by going to the furthest left end of the tree, since every left-child node will be smaller in value than the parent node. i.e., once node.left === null, then node.val === minValue
    minValue() {
        // retrieve the currently established data by initializing var 'node' to be the root of the tree
        // NOTE: node cannot be 'const' here b/c its value will be constantly edited via the while loop
        let node = this.root;

        // recursive is not needed here, while will suffice
        // recursive(data) {
            while (node.left !== null) {
                node = node.left
                // recursive(node);
                // console.log(`${node.data}`);
            }
            return node.data;
        // }
    }

    // while loop method for obtaining the maximum value of the tree
    maxValue() {
        let current = this.root;
        // console.log(current);
        while (current.right !== null) {
            current = current.right;
        };

        return current.data;
    }

    // NOTE: IT DIDN'T WORK BECAUSE YOU DIDN'T PUT 'RETURN' IN THE ELSE STATEMENT. 
    // TODO: Why was 'return' seemingly irrelevant in the add() method, but important for functionality here? Removing 'return' from the call to the recursive function in add() made no impact on the result, however in this instance, removing 'return' caused this helper method to not work at all, instead returning 'undefined'
    findMinNode(node) {
        if (node.left === null) {
            return node;
        } else { 
            return this.findMinNode(node.left);
        }
    }

    findMaxNode(node) {
        if (node.right === null) {
            return node;
        } else {
            return this.findMaxNode(node.right);
        };
    }

    // method for returning an array representing the in-order traversement of the binary tree, i.e. from left to root to right
    // move to furthest left position
    //
    inOrder() {
        let stack = [];
        // initialize node to start at left most part of tree, i.e. min
        // let node = this.findMinNode(this.root);

        //TODO: Why don't you get duplicates when using recursion? How, once the left side of the tree has been traversed, does the recursion know that the left side has been traversed and not to instantly trigger the first if (node.left) statement again, since we are calling traverse(this.root) at the end?
        // traverse(this.root) doesn't get called again; once it has been complete, it indicates the recursion loop has finished, and the function will proceed to the next line which returns the stack.
        function traverse(node) {
            if (node.left) {
                console.log(`node.left is ${node.left}`);
                traverse(node.left)
            }

            console.log(`pushing ${node.data}`);
            stack.push(node.data);
            if (node.right) {
                console.log(`node.right is ${node.right}`);
                traverse(node.right)
            }
        };
        traverse(this.root);
        return stack;
    }
}

const newTree = new BST;
newTree.add(15);
newTree.add(25);
newTree.add(10);
newTree.add(7);
newTree.add(22);
newTree.add(17);
newTree.add(13);
newTree.add(5);
newTree.add(9);
newTree.add(27);
//          15
//         /  \
//        10   25
//       / \   / \
//      7  13 22  27
//     / \    /
//    5   9  17
// console.log(newTree.minValue());
// console.log(newTree.findMin());
// console.log(newTree.maxValue());

// console.log(newTree.findMinNode(newTree.root).right);
// console.log(newTree.findMaxNode(newTree.root));

// console.log(newTree.root);
// console.log(newTree.inOrder());

// traverse() method walkthrough:
// traverse(this.root) is called and intiates recursion loop
// if this.root has a node on the left (node.left), then we will call traverse() again but feed it node.left. This will cause traverse() to go to the furthest left node.
// once (!node.left), we will push the current node to stack. The current node is the min value of the tree.
// The next line of code will check for a node on the right. In our example, there will be no node.right. How do we move back up to the node above 5, which is 7?