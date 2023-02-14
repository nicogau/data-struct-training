
/*  
 * graph course
 * https://www.youtube.com/watch?v=tWVWeAqZ0WU&t=1025s
 */

// type NodesList =  typeof nodesList 
// type AdjacencyList =  Record<NodesList[number], Array<NodesList[number]>>  
// const nodesList = [ "a" , "b" , "c" , "d", "e", "f"] as const

type AdjacencyList<T extends string | number> = Record<T, T[]>
type Edges<T extends string | number> = Array<[T, T]>
type Grid<T extends string | number> = Array<T[]>

/* directed graph Adjacency Lists */
const adjacencyList: AdjacencyList<string> = {
  a: ["b","c"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
} 

const adjacencyList2: AdjacencyList<string> = {
  f: ["g","i"],
  g: ["h"],
  h: [],
  i: ["g", "k"],
  j: ["i"],
  k: [],
} 

/* undirected graph Adjancy and Edges lists */

const edges: Edges<string>  = [
  ['i', 'j'],
  ['k', 'i'],
  ['m', 'k'],
  ['k', 'l'],
  ['o', 'n'],
] 

const undirectedAgencyList: AdjacencyList<number> = {
  0: [8, 1, 5], 
  1: [0], 
  2: [3, 4], 
  3: [2, 4], 
  4: [3, 2], 
  5: [0, 8], 
  8: [0, 5], 
}

const undirectedTwoComponentList: AdjacencyList<number> = {
  0: [8, 1, 5],
  1: [0],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
  5: [0, 8],
  8: [0, 5],
}
/*
  {
    w: ['x', 'v'],
    x: ['y', 'w'],
    y: ['x', 'z'],
    z: ['y', 'v'],
    v: ['z', 'w'],
  }
 */
const undirectedShortestPathEdges: Edges<string> = [
  ['w', 'x'],
  ['x', 'y'],
  ['z', 'y'],
  ['z', 'v'],
  ['w', 'v']
]

const islandsList: Grid<string> = [
  ['w','l','l','w','w'],
  ['w','l','l','l','w',],
  ['w','l','l','w','w',],
  ['l','w','w','w','w',],
  ['l','w','w','l','l', 'l'],
  ['l','l','w','w','w',],
]

export const run = () => {
  /* directed graph */
  console.log('graph - depthFirst iterative traversal', depthFirst(adjacencyList, 'a'))

  console.log('graph - depthFirst recursive traversal', depthFirstRec(adjacencyList, 'a'))

  console.log('graph - breadthFirst traversal', breadthFirst(adjacencyList, 'a'))

  console.log('graph - hasPathRec - depth first search recursive', hasPathRec(adjacencyList2, 'f', 'j'))

  console.log('graph - hasPath - breadth first search', hasPathRec(adjacencyList2, 'f', 'j'))

  /* undirected graph */
  console.log('graph - buildUndirectedGraph from edges[]', buildUndirectedGraph(edges))

  console.log('graph - undirectedHasPath depth first ', undirectedHasPath(edges, 'i', 'l'))

  console.log('graph - connectedComponents - count number of components in adjacencyList ', connectedComponents(undirectedAgencyList))

  console.log('graph - largestComponentLength  - return biggest component in adjacencyList ', largestComponentLength(undirectedTwoComponentList))

  console.log('graph - undirectedShortestPathEdges  - shortest path in edges list ', undirectedShortestPath(undirectedShortestPathEdges, 'v', 'z'))

  console.log('graph - countIsland', countIslands(islandsList))

  console.log('graph - minIslandSize', minIslandSize(islandsList))
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

// helper function to build an adjacency list from and edges array 
const buildUndirectedGraph =<T extends string | number> (edges: Edges<T>): AdjacencyList<T> => {
  let adjacencyList  = {} as AdjacencyList<T>    
  for (let edge of edges) {
    const [a, b] = edge
    if ( !(a in adjacencyList)) adjacencyList[a] = [] 
    if ( !(b in adjacencyList)) adjacencyList[b] = [] 
    adjacencyList[a].push(b)
    adjacencyList[b].push(a)
  }
  return adjacencyList
}

/* find if  a vertex has a path to join another vertex */
/* depth first iterative */
const undirectedHasPath = <T extends number | string> (edgeList: Edges<T>, start: T, dest: T): boolean => {
  if (start === dest) return true

  let visited = new Set()
  let stack = [start]
  const list = buildUndirectedGraph(edgeList)

  while (stack.length > 0) {
    const current = stack.pop()

    if (!current || !list[current]) return false
    if(current == dest ) return true

    visited.add(current)

    for (let el of list[current] ) {
      if (!visited.has(el)) stack.push(el)
    }
  }
  return false 
}

/* connected components - count number of components */
// depth first iterative
const connectedComponents = <T extends number | string> (list: AdjacencyList<T>): number => {
  const visited = new Set() 
  const  stack: T[] = []
  let components = 0
  
  for  (let vertex in list) {
    if (!visited.has(String(vertex))) components++
      stack.push(vertex)

    while (stack.length > 0) {
      const current = stack.pop()

      if (current === undefined) return components 

      visited.add(String(current))

      for (let el of list[current] ){
        if (!visited.has(String(el))) {
          stack.push(el)
        }
      }
    }
  }
  return components
}

/* find the component which have the biggest number of nodes */
// depth first recursive
const largestComponentLength = <T extends string | number> (list: AdjacencyList<T>): number => {
  let maxSize = 0
  let visited = new Set<string>()  

  for (let el in  list) {
    let size  = exploreSize(list, el, visited)
    if (size > maxSize) maxSize = size
  }
  return maxSize
} 

const exploreSize = <T extends string | number> (list: AdjacencyList<T>, node: T, visited: Set<string>): number => {
  if (visited.has(String(node))) return 0
  let size = 1
  visited.add(String(node))

  for (let neighbour of list[node]) {
    size += exploreSize( list, neighbour, visited ) 
  }

  return size
}

/* find shortest path undirected graph  */
// breadth first search
const undirectedShortestPath = <T extends string | number> (edges: Edges<T>, start: T, end: T ): number => {
  const list = buildUndirectedGraph(edges)
  console.log(list)
  let shortestPath = Infinity
  let visited = new Set<string>()
  let queue: [T, number][] = [[start, 0]]
  
  while (queue.length > 0) {
    const current = queue.shift()

    if (!current) return shortestPath

    const [currentNode, currentNodeDistance] = current
    visited.add(String(currentNode))

    if ( currentNode === end) {
      if (currentNodeDistance < shortestPath) shortestPath = currentNodeDistance 
      continue
    }

    for (let neighbour of list[currentNode] ) {
      if (!visited.has(String(neighbour))) {
        queue.push([neighbour, currentNodeDistance + 1])
      }
    }
  }

  return shortestPath
}

/* find number of islands */
enum GridSymbol  {
  land = "l",
  water = "w"
}

// is cell a piece of land?
const isLand = (grid: Grid<string | number>, cell: [number, number]) =>  {
  const [rowCell, colCell] = cell
  return grid[rowCell][colCell] ==  GridSymbol.land as any
} 

const findValidCellNeighbours  = (grid: Grid<string | number>, cell: [number, number]): Array<[number, number]> => {
  const [rowCell, colCell] = cell 
  const validNeighbours = [] as Array<[number, number]>

  let neighbours: Record<'left' | 'right' | 'up' | 'bottom', [number, number] | null> = {
    left: colCell > 0 ? [rowCell, colCell -1] : null  ,
    right:colCell < grid[rowCell].length -1 ? [rowCell, colCell + 1] : null ,
    up: rowCell > 0 ? [rowCell -1, colCell ] : null,
    bottom: rowCell < grid[rowCell].length -1 ? [rowCell + 1, colCell] : null
  }
  for (let neighbour in neighbours) {
    let typedNeighbour = neighbour  as keyof typeof neighbours
    const neighbourCoord = neighbours[typedNeighbour] 
    if (neighbourCoord !== null ) {
      if (isLand(grid, neighbourCoord)) {
        validNeighbours.push(neighbourCoord)
      }
    }
  }
  return validNeighbours

}

// if cell is part of an island  find all part of the island
// discard already discovered pieces of island
const exploreIsland = (grid: Grid<string | number>, cell: [number, number], visited: Set<string>): boolean  => {
  const cellString = cell.join(' ') 
  if (visited.has(cellString)) return false
  let queue: [number, number][] = [cell]
  while (queue.length > 0) {
    const current = queue.shift()
    if (!current) return true
    visited.add(current.join(' '))   
    let neighbours = findValidCellNeighbours(grid, current) 
    for (let neighbour of neighbours) {
      if(!visited.has(neighbour.join(" "))) {
        queue.push(neighbour)
      }
    }
  }
  return true
}

/* main function to count islands */
const countIslands = (grid: Grid<string | number>) => {
  let visited = new Set<string>()
  let isLandCount = 0
  // browse each rows and columns of the Grid 
  for ( let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const currentCell: [number, number] = [row, col]
      // 1. check if the current cell is part of an island else continue the loop
      if (!isLand(grid, currentCell)) continue

      // 2. check if neighbours of the cell are part of the island
      // 3. mark all visited piece of island and ignore already visited cells 
      const isNewIsland = exploreIsland(grid, currentCell, visited)
      if (isNewIsland) isLandCount++

      // 4. when  all part of the island are visited go to next column
    }
  }
  return isLandCount
}

/* minimum island size problem */
const minIslandSize = (grid: Grid<string | number>): number => {
  let minSize = Infinity 
  let visited = new Set<string>()

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid.length; col++) {
      if (!grid[row][col]) continue

      const landSize = exploreIslandSize(grid, [row, col], visited)
      if ( landSize > 0)
      minSize = Math.min(minSize, landSize)
    }
  }
  console.log(visited)
  return minSize
}

const exploreIslandSize = (grid: Grid<string | number> , cell: [number, number], visited: Set<string>): number => {
  const [rowCell, colCell] = cell
  let countLandCell = 1 


  const rowInBound = rowCell >= 0 &&  rowCell  < grid.length   
  const colInBound = colCell >= 0 && rowInBound && colCell  < grid[rowCell].length    

  if (!colInBound) return 0 
  if (grid[rowCell][colCell] !== 'l') return 0 
  if (visited.has(cell.join(','))) return 0 

  visited.add(cell.join(','))
  // left
  countLandCell += exploreIslandSize(grid, [rowCell, colCell - 1], visited)
  // right
  countLandCell += exploreIslandSize(grid, [rowCell, colCell + 1], visited)
  // top
  countLandCell += exploreIslandSize(grid, [rowCell - 1, colCell], visited)
  // bottom
  countLandCell += exploreIslandSize(grid, [rowCell + 1, colCell], visited)

  return countLandCell
}
