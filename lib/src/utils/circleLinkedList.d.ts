declare class Node {
    element: string;
    next: any;
    constructor(element: string);
}
declare class LinkedList {
    head: Node;
    constructor();
    remove(item: string): void;
    findPrevious(item: string): Node;
    getCircleMiddle(item: string): string[];
    display(): void;
    find(element: string): Node;
    insert(newElement: string, item: string): this;
}
export default LinkedList;
//# sourceMappingURL=circleLinkedList.d.ts.map