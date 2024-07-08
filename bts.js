import { Node } from "./node.js";

export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const uniqueSortedArray = [...new Set(array)].sort((a, b) => a - b);

        function build(array) {
            if (array.length === 0)
                return null;

            const mid = Math.floor(array.length / 2);
            const node = new Node(array[mid]);

            // recursively build the tree
            node.left = build(array.slice(0, mid));
            node.right = build(array.slice(mid + 1));

            return node;
        }

        return build(uniqueSortedArray);
    }

    insert(value) {
        const newNode = new Node(value);

        function insertNode(node, newNode) {
            if (newNode.data < node.data) {
                if (node.left === null)
                    node.left = newNode;
                else
                    insertNode(node.left, newNode);
            }
            else {
                if (node.right === null)
                    node.right = newNode;
                else
                    insertNode(node.right, newNode);
            }
        }

        if (this.root === null)
            this.root = newNode;
        else
            insertNode(this.root, newNode);
    }

    deleteItem(value) {
        const deleteNode = (node, value) => {
            if (node === null) {
                return null;
            }

            if (value < node.data) {
                node.left = deleteNode(node.left, value);
                return node;
            }
            else if (value > node.data) {
                node.right = deleteNode(node.right, value);
                return node;
            }
            else {
                // Node with only one child or no child
                if (node.left === null) {
                    return node.right;
                }
                else if (node.right === null) {
                    return node.left;
                }

                // Node with two children
                function minValueNode(node) {
                    let current = node;

                    while (current.left !== null) {
                        current = current.left;
                    }

                    return current;
                };

                let temp = minValueNode(node.right);
                node.data = temp.data;
                node.right = deleteNode(node.right, temp.data);

                return node;
            }
        };

        this.root = deleteNode(this.root, value);
    }

    find(value) {
        function findNode(node, value) {
            if (node === null) {
                return null;
            }

            if (value === node.data) {
                return node;
            }
            else if (value < node.data) {
                return findNode(node.left, value);
            }
            else {
                return findNode(node.right, value);
            }
        }

        return findNode(this.root, value);
    }

    levelOrder(callback) {
        if (this.root === null) {
            return [];
        }

        const result = [];
        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift(); // dequeue the front node
            result.push(node.data);

            // enqueue the child nodes
            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }

            if (callback) {
                callback(node);
            }
        }

        return node;
    }

    inOrder(callback) {
        const result = [];

        function traverse(node) {
            if (node.left) {
                traverse(node.left);
            }

            result.push(node.data);

            if (callback) {
                callback(node);
            }

            if (node.right) {
                traverse(node.right);
            }
        }

        traverse(this.root);

        return callback ? undefined : result;
    }

    preOrder(callback) {
        const result = [];
    
        function traverse(node) {
            result.push(node.data);

            if (callback) {
                callback(node);
            }

            if (node.left) {
                traverse(node.left);
            }

            if (node.right) {
                traverse(node.right);
            }
        }
    
        traverse(this.root);
    
        return callback ? undefined : result;
    }

    postOrder(callback) {
        const result = [];
    
        function traverse(node) {
            if (node.left) {
                traverse(node.left);
            }
            if (node.right) {
                traverse(node.right);
            }

            result.push(node.data);

            if (callback) {
                callback(node);
            }
        }
    
        traverse(this.root);
    
        return callback ? undefined : result;
    }

    height(node) {
        if (node === null) {
            return -1;
        }

        const leftHeight = height(node.left);
        const rightHeight = height(node.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node) {
        function computeDepth(currentNode, currentDepth) {
            if (currentNode === null) {
                return -1;
            }
    
            if (currentNode === node) {
                return currentDepth;
            }
    
            const leftDepth = computeDepth(currentNode.left, currentDepth + 1);
            if (leftDepth !== -1) {
                return leftDepth;
            }
    
            const rightDepth = computeDepth(currentNode.right, currentDepth + 1);
            return rightDepth;
        }
    
        return computeDepth(this.root, 0);
    }

    isBalanced() {
        function checkBalance(node) {
            if (node === null) {
                return true;
            }
    
            const leftHeight = height(node.left);
            const rightHeight = height(node.right);
    
            if (Math.abs(leftHeight - rightHeight) > 1) {
                return false;
            }
    
            return checkBalance(node.left) && checkBalance(node.right);
        }
    
        return checkBalance(this.root);
    }

    rebalance() {
        const nodes = [];

        this.inOrder(node => nodes.push(node.data));
        this.root = this.buildTree(nodes);
    }
}