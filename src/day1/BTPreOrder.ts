function walk(curr: BinaryNode<number> | null, path: number[]): number[] {

    if(!curr) {
        return path;
    }

    //3 recursion steps:
    //pre
    path.push(curr.value);

    //recurse
    walk(curr.left, path);
    walk(curr.right, path);

    //post
    return path;
}

export default function PreOrderSearch(head: BinaryNode<number>): number[] {
    return walk(head, []);
}