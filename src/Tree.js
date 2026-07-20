import Node from "./Node.js";

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const cleanedArray = [...new Set(array)].sort((a, b) => a - b);

        return this.#buildBalancedTree(cleanedArray);
    }

    #buildBalancedTree(array) {
        if (array.length === 0) {
            return null;
        }

        const middle = Math.floor(array.length / 2);
        const node = new Node(array[middle]);

        node.left = this.#buildBalancedTree(array.slice(0, middle));
        node.right = this.#buildBalancedTree(array.slice(middle + 1));

        return node;
    }

    includes(value) {
        return this.#includesRecursive(this.root, value);
    }

    #includesRecursive(node, value) {
        if (node === null) {
            return false;
        }

        if (node.data === value) {
            return true;
        }

        return value < node.data
            ? this.#includesRecursive(node.left, value)
            : this.#includesRecursive(node.right, value);
    }

    insert(value) {
        this.root = this.#insertRecursive(this.root, value);
    }

    #insertRecursive(node, value) {
        if (node === null) {
            return new Node(value);
        }

        if (value < node.data) {
            node.left = this.#insertRecursive(node.left, value);
        } else if (value > node.data) {
            node.right = this.#insertRecursive(node.right, value);
        }

        return node;
    }

    deleteItem(value) {
        this.root = this.#deleteItemRecursive(this.root, value);
    }

    #deleteItemRecursive(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.data) {
            node.left = this.#deleteItemRecursive(node.left, value);
        }
        else if (value > node.data) {
            node.right = this.#deleteItemRecursive(node.right, value);
        }
        else {
            if (node.left === null && node.right === null) {
                return null;
            }
            
            if (node.left === null) {
                return node.right;
            }

            if (node.right === null) {
                return node.left;
            }
  
            node.data = this.#findMinValue(node.right);
            node.right = this.#deleteItemRecursive(node.right, node.data);
        }

        return node;
    }

    #findMinValue(node) {
        while (node.left !== null) {
            node = node.left;
        }

        return node.data;
    }

    inOrderForEach(callback) {
        if (this.root !== null) {
            this.#inOrderForEachRecursive(this.root, callback);
        }
    }

    #inOrderForEachRecursive(node, callback) {
        if (node !== null) {
            this.#inOrderForEachRecursive(node.left, callback);
            callback(node.data);
            this.#inOrderForEachRecursive(node.right, callback);
        }
    }

    preOrderForEach(callback) {
        if (this.root !== null) {
            this.#preOrderForEachRecursive(this.root, callback);
        }
    }

    #preOrderForEachRecursive(node, callback) {
        if (node !== null) {
            callback(node.data);
            this.#preOrderForEachRecursive(node.left, callback);
            this.#preOrderForEachRecursive(node.right, callback);
        }
    }

    postOrderForEach(callback) {
        if (this.root !== null) {
            this.#postOrderForEachRecursive(this.root, callback);
        }
    }

    #postOrderForEachRecursive(node, callback) {
        if (node !== null) {
            this.#postOrderForEachRecursive(node.left, callback);
            this.#postOrderForEachRecursive(node.right, callback);
            callback(node.data);
        }
    }

    levelOrderForEach(callback) {
        if (this.root === null) {
            return;
        }

        const queue = [this.root];

        while (queue.length > 0) {
            const node = queue.shift();
            callback(node.data);

            if (node.left !== null) {
                queue.push(node.left);
            }

            if (node.right !== null) {
                queue.push(node.right);
            }
        }
    }

    #findNode(node, value) {
        if (node === null) {
            return null;
        }

        if (node.data === value) {
            return node;
        }

        return value < node.data
            ? this.#findNode(node.left, value)
            : this.#findNode(node.right, value);
    }

    height(value) {
        const node = this.#findNode(this.root, value);

        return this.#heightRecursive(node);
    }

    #heightRecursive(node) {
        if (node === null) {
            return -1;
        }

        return 1 + Math.max(this.#heightRecursive(node.left), this.#heightRecursive(node.right));
    }

    depth(value) {
        return this.#depthRecursive(this.root, value);
    }

    #depthRecursive(node, value) {
        if (node === null) {
            return -1;
        }

        if (node.data === value) {
            return 0;
        }

        const depth = value < node.data
            ? this.#depthRecursive(node.left, value)
            : this.#depthRecursive(node.right, value);

        return depth === -1 ? -1 : 1 + depth;
    }

    isBalanced() {
        return this.#isBalancedRecursive(this.root);
    }

    #isBalancedRecursive(node) {
        if (node === null) {
            return true;
        }

        const leftHeight = this.#heightRecursive(node.left);
        const rightHeight = this.#heightRecursive(node.right);

        return Math.abs(leftHeight - rightHeight) <= 1
            && this.#isBalancedRecursive(node.left)
            && this.#isBalancedRecursive(node.right);
    }

    rebalance() {
        const values = [];

        this.inOrderForEach(value => {
            values.push(value);
        });

        this.root = this.buildTree(values);
    }
}