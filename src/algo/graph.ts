
/*  
 * graph course
 * https://www.youtube.com/watch?v=tWVWeAqZ0WU&t=1025s
 */

// type NodesList =  typeof nodesList 
// type AdjacencyList =  Record<NodesList[number], Array<NodesList[number]>>  
// const nodesList = [ "a" , "b" , "c" , "d", "e", "f"] as const

/* directed graph */
const adjacencyList = {
  a: ["b","c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
} 

const adjacencyList2 = {
  f: ["g","i"],
  g: ["h"],
  h: [],
  i: ["g", "k"],
  j: ["i"],
  k: [],
} 

/* undirected graph */
const edges = [
  ['i', 'j'],
  ['k', 'i'],
  ['m', 'k'],
  ['k', 'l'],
  ['o', 'n'],
] 

const undirectedAdjacencyList = {
  i: ['j', 'k'],
  j: ['i'],
  k: ['j', 'l', 'm'],
  l: ['k'],
  m: ['k'],
  o: ['n'],
  n: ['o'],


}

export const run = () => {
  /* directed graph */
  console.log('graph - depthFirst iterative traversal', depthFirst(adjacencyList, 'a'))

  console.log('graph - depthFirst recursive traversal', depthFirstRec(adjacencyList, 'a'))

  console.log('graph - breadthFirst traversal', breadthFirst(adjacencyList, 'a'))

  console.log('graph - hasPathRec - depth first search recursive', hasPathRec(adjacencyList2, 'f', 'j'))

  console.log('graph - hasPath - breadth first search', hasPathRec(adjacencyList2, 'f', 'j'))

  /* undirected graph */

}

/**
  * directed graph algorithms
  *
  */

/* depth first traversal */
//iterative
const depthFirst = (list: Record<string, string[]>, start: string) => {
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

// recursive
const depthFirstRec = (list: Record<string, string[]>, start: string): string[] => {
  let res: string[] = [] 

  if (list[start].length > 0 ){ 
    for (let el of list[start]) {
      res = [...res, ...depthFirstRec(list, el)]
      console.log(el)
    }
  }
   return [start, ...res] 
}

/* breadth first traversal */
const breadthFirst = (list: Record<string, string[]>, start: string): string[] => {
  let queue = [start]
  let res: string[] = []

  while (queue.length > 0) {
    const current = queue.pop()
    if (!current) return res

    res.push(current)
    for (let el of list[current]) {
      queue.unshift(el)
    }
  }
  return res
}

/* finding if a path exist from the root node to a defined vertex */
/* depth first search recursive */
const hasPathRec = (list: Record<string, string[]>, root: string, dest: string ): boolean => {
  for (let el of list[root]) {
    if (hasPathRec(list, el, dest)) return true
  }
  return root === dest
}

/* breadth first search iterative */
  const hasPath = (list: Record<string, string[]>, root: string, dest: string ): boolean => {
    let queue = [root]
    while (queue.length > 0) {
      const current = queue.shift()
      if (current === dest) return true
      if (!current) return false
        for (let el of list[current]) {
          queue.push(el)
        }
    }
    return false
  }

/**
  * undirected graph algorithms
  *
  */
