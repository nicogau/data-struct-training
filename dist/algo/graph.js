"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
// type NodesList =  typeof nodesList 
// type AdjacencyList =  Record<NodesList[number], Array<NodesList[number]>>  
// const nodesList = [ "a" , "b" , "c" , "d", "e", "f"] as const
const adjacencyList = {
    a: ["b", "c"],
    b: ["d"],
    c: ["e"],
    d: ["f"],
    e: [],
    f: [],
};
const run = () => {
    /* depth first traversal */
    //iterative
    const depthFirst = (list, start) => {
        if (Object.keys(list).length <= 0)
            return null;
        let stack = [start];
        let result = [];
        while (stack.length > 0) {
            const current = stack.pop();
            result.push(current);
            if (list[current]?.length > 0) {
                stack = [...stack, ...list[current]];
            }
        }
        return result;
    };
    console.log('depthFirst', depthFirst(adjacencyList, 'a'));
    // recursive
    /* breadth first traversal */
    //iterative
};
exports.run = run;
