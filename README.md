# Algortihms
A repository to track the algorithms I learn.

## Graph

### Section Structure

This section is divided into three major sections. The first sections defines graphs and their properties. The second section introduces the types of problems surrounding graphs. 

The third section explores the algorithms that solve the different graph problems. The exploration includes
* defining how to algorithm works
* the algorithms properties (limitations, sub problems they solve)

### Graphs: What are they?

A graph can be:
* **Cyclic** (has cycles) or **Acyclic** (doesn't have cycles)
* **Directed** (edges are unidirectional) or **Undirected** (edges are bidirectional)
* **Weighted** (edges have varying weights) or **Unweighted** (all edges have the same weight).
* **Sparse** (the number of edges, E, is much less than the numbers of vertices squared, E < V^2) or **Dense** (the number of edges, E, is close to the numbers of vertices squared, E ~ V^2)
* **Graph Diameter** is a property of a **Configuration Graph**. It records the length from the two farthest states, represented as vertices.

### Graphs Problems

* single-source shortest path
* any-source shortest path
* minimum spanning tree
* Detecting cycles
* topological sort

### Traversing Graphs (the Algorithms)

There are two ways to traverse a graph, **Breadth-First Search (BFS)** or **Depth-First Search (DFS)**. 

**All graph traversal algorithms fall into one of the two methods.**

Applications of graph search include
* web crawling
* social networking
* network broadcast
* garbage collection
* model checking
* checking mathematical models and conjectures
* solving puzzles and games (config graph)

#### Breadth-First Search (BFS)

```
BFS(G,s):
  for each v ∈ V[G] -s          // Step 1: assign default values for distance, parent and
    d[v] <- ∞                   //         traversal state for all v ∈ v[G], except s
    π[v] <- NIL
    color[v] <- WHITE
 
  d[s] <- 0;                    // Step 2: Assign the initial values for s
  π[s] <- NIL
  color[s] <- GRAY
 
  Q.enqueue(s)                  // Step 3: As vertices are discovered, iterate
  while Q ≠ Ø                   //         through their adjacency lists until
    u <- Q.dequeue()            //         all vertices are explored.
    for each v ∈ AdjList(u)
      if color[v]=WHITE
        d[v] <- d[u]+1
        π[v] <- u
        color[v] <- GRAY
        Q.enqueue(v)
    color[u] <- BLACK
``` 
Time complexity: O(V+E)

##### How BFS works:
BFS takes a breadth-first approach to traversing a tree. 
> BFS discovers all vertices at distance `k` from starting vertex `s` before discovering vertices at distance `k+1` from `s` and so on. 

During execution, BFS performs three things,
1. records the distance from `s` for each vertex `v ∈ V[G]`
2. records the parent of each vertex `v` in the path `s..v` (conincidentally, forming a BFS tree)
3. tracks the traversl state of each vertex during execution. For simplicity, the algorithm usually uses colors: `WHITE`,`GRAY` and `BLACK`
  * `WHITE` - vertex is undiscovered
  * `GRAY` - vertex has been discovered, but not fully explored
  * `BLACK` - vertex has been explored
  
With regards to BFS, a vertex is "explored" when each member of the vertex's adjacency list has been examined (i.e. discovered). 

##### Properties of BFS:
Given a starting vertex `s` in the set of vertices in a graph `V[G]`, BFS will find the shortest path `δ(s,v)` as the minimum number of edges in the path `(s..v)`
> in other words, BFS can be used to find the single-source shortest path _if-and-only-if_ the graph is unweighted (hence, the only concern is the number of edges in the path)

BFS composes a single tree of the graph (only 1 root).  



#### Depth-First Search (DFS)
```
DFS(G):
  for each v ∈ V[G]            // Step 1. Initialize the parent,    
    d[v] <- ∞                  // discovery time, finish time and 
    f[v] <- ∞                  // traversal status of each vertex 
    π[v] <- NIL
    color[v] <- WHITE
 
  time <- 0                    // Step 2. Start the "clock"
  
  for each u ∈ V[G]            // Step 3. Visit each vertex
    DFS-VISIT(u) 
---

DFS-VISIT(u):
  color[u]=GRAY
  time <- time + 1
  d[u] <- time

  for each v ∈ AdjList(u)
    if color[v]=WHITE
      π[v] <- u
      DFS-VISIT(v)
  color[u] <- BLACK
  time <- time + 1
  f[u] <- time
---
```

##### How BFS works:
DFS takes a depth-first approach to traversing a tree.
> For each vertex `v` discovered, search of child of `v`, and once the end is reached, "backtrack" to the parent of `v` and search a sibling of `v`

During execution, DFS performs three things,
1. records the time a vertex `v` is discovered (discovery time) and the time the vertex finished being explored (finish time) for each vertex `v ∈ V[G]`.

   ..._(compare to BFS, which computes distance from some starting vertex `s` to `v`)_
2. records the parent of each vertex `v` in the path `s..v` (conincidentally, forming the DFS forest)
3. tracks the traversl state of each vertex during execution. For simplicity, the algorithm usually uses colors: `WHITE`,`GRAY` and `BLACK`
  * `WHITE` - vertex is undiscovered
  * `GRAY` - vertex has been discovered, but not fully explored
  * `BLACK` - vertex has been explored

##### Properties of DFS:

***Property:*** DFS provides information about the structure of the graph, which is elaborated in the subsequent properties

***Property:*** The discovery and finish times are parenthetical operations. (That is the whole idea of DFS: a node's children must be completely explored before exploration of the node can be completed.) That means for any vertices u and v, exactly one of the following three conditions are true
* the intervals [d[u],f[u]] and [d[v],f[v]] are disjoint. Neither is a descendant of the other in the depth-first forest. (Put another way, neither was discovered when explopring the other)
* Interval [d[u],f[u]] contains inteveral [d[v],f[v]], which means u is an ancestor of v. (Put another way, v was discovered while exploring u)
* * Interval [d[v],f[v]] contains inteveral [d[u],f[u]], which means u is a descendant of v. (Put another way, u was discovered while exploring v)

> Mnemonic protip: think _a contains b_ == _a is ancestor of b_)

***Property:*** DFS computes forests 
DFS computes a forest of the graph. A forest is a set of disjoint trees. Compare to BFS, which can only form a tree rooted at the starting vertex. 

***Property:*** DFS can be modified to **classify edges**, which enables cycles detection.

***Property:*** DFS can be modified to perform a **topological sort** of a directed acyclic graph (DAG).

###### Edge Classification & Cycle Detection

There are 4 types of edges in a graph:
1. Tree edge: An edge that adds a new vertex to the tree.

   ..._Vertex v of the edge (u,v) was previously undiscovered._
2. Forward edge: An edge (u,v) that leads to an descendant in the tree

   ..._the depth of vertex v > depth of vertex u._  
3. Back edge: An edge (u,v) that leads to an ancestor in the tree 

   ..._the depth of vertex v < depth of vertex u._
4. Cross edge: Any edge not a leaf, forward or back edge.
 
**A graph has a cycle if it has a back edge**

**Important Note: In an Undirected Graph, forward edges and cross edges are not possible.**

***How to modify DFS to classify edges:*** Modify the recursive portion (DFS_VISIT) Use the traversal status (WHITE,GRAY,BLACK) and the discovery and finish times to determine an edges type. Using `d[n]` and `f[n]` to represent the discovery time and finish time of some vertex n, the edge (u,v)
- is a leaf edge if it causes v to go from WHITE -> GRAY
- is a back edge if d[v]<d[u] and v is an ancestor of u.
- is forward edge if f[u]>f[v]
- is cross edge if 

```
DFS(G):
  for each v ∈ V[G]                
    d[v] <- ∞                   
    f[v] <- ∞                   
    π[v] <- NIL
    color[v] <- WHITE
 
  time <- 0                    
  
  for each u ∈ V[G]            
    DFS-VISIT(u) 
---

DFS-VISIT(u):
  color[u]=GRAY
  time <- time + 1
  d[u] <- time
  
  for each v ∈ AdjList(u)
    if color[v]=WHITE
      π[v] <- u
      classify-edge([u,v], TREE)
      DFS-VISIT(v)
    else                                 // we've already explored v
      if color[v]=GRAY                   // u was discovered while exploring v
        classify-edge([u,v], BACK)       // (i.e. v is ancestor of u) 
      if color[v]=BLACK                   
        if d[u] < d[v]                     
          classify-edge([u,v], FORWARD)  // v is descendant of u
        else  
          classify-edge([u,v], CROSS)
  color[u] <- BLACK
  time <- time + 1
  f[u] <- time
---
```



###### Topological Sort

> A **topological sort** of a dag `G = (V,E)` is a linear ordering of all vertices such that if G contains edge `(u,v)`, then `u` appears before `v` in the ordering. (If the graph is not acyclic, then no linear ordering is possible.)

Another way to think about topological sorting, is to view it as ordering the vertices olong a horizontal line so that all directed edges go from left to right.

To compute the topological sort of a DAG using DFS, order the vertices in descending order of their finish time.

# References

[MIT Open Courseware: Introduction to Algorithms](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-006-introduction-to-algorithms-fall-2011/)

Introduction to Algorithms, Ed. 2, Thomas H. Cormen, Charles E. Leiserson,... - [Amazon](https://www.amazon.com/Introduction-Algorithms-Second-Thomas-Cormen/dp/0262032937)
