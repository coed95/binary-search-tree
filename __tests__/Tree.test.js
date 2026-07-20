import Tree from "../src/Tree.js";

describe("Tree", () => {
    test("builds a balanced tree from an unsorted array with duplicates", () => {
        const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3]);

        expect(tree.root.data).toBe(7);
        expect(tree.root.left.data).toBe(3);
        expect(tree.root.right.data).toBe(9);
        expect(tree.isBalanced()).toBe(true);
    });

    test("includes returns true for existing values and false for missing values", () => {
        const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3]);

        expect(tree.includes(8)).toBe(true);
        expect(tree.includes(23)).toBe(true);
        expect(tree.includes(100)).toBe(false);
    });
});

test("inserts a new value", () => {
    const tree = new Tree([1, 3, 4, 7, 8, 9, 23]);

    tree.insert(6);

    expect(/* value exists */);
    expect(/* tree still contains old values */);
});

test("does not insert duplicate values", () => {
    const tree = new Tree([1, 3, 4, 7]);

    tree.insert(4);

    const values = [];
    tree.inOrderForEach(value => values.push(value));

    expect(values).toEqual([1, 3, 4, 7]);
});