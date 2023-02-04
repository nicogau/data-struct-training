
// type NodesList =  typeof nodesList 
// type AdjacencyList =  Record<NodesList[number], Array<NodesList[number]>>  
// const nodesList = [ "a" , "b" , "c" , "d", "e", "f"] as const
const adjacencyList = {
  a: ["b","c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
} 

export const run = () => {

/* depth first traversal */
//iterative
const depthFirst = (list: Record<string, string[]>, start: string) => {
  if (Object.keys(list).length <= 0) return null 
  let stack = [start]
  let result: string[] = []
  while (stack.length > 0) {
    const current = stack.pop() as string
    result.push(current)
    if (list[current]?.length > 0) {
      stack = [...stack, ...list[current]]
    } 
  }
  return result
}
console.log('depthFirst', depthFirst(adjacencyList, 'a'))
// recursive

/* breadth first traversal */
//iterative

}
