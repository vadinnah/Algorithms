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

### Graphs Problems

* single-source shortest path
* any-source shortest path
* minimum spanning tree
* Detecting cycles
* topological sort

### Traversing Graphs (the Algorithms)

There are two ways to traverse a graph, **Breadth-First Search (BFS)** or **Depth-First Search (DFS)**. 

**All graph traversal algorithms fall into one of the two methods.**

#### Breadth-First Search (BFS)

```
BFS(G,s):
  for each v ∈ v[G] -s          // Step 1 
    d[v] <- ∞             
    π[v] <- NIL
    color[v] <- WHITE
 
  d[s] <- 0;                    // Step 2
  π[s] <- NIL
  color[s] <- GRAY
 
  Q.enqueue(s)                  // Step 3
  while Q ≠ Ø 
    u <- Q.dequeue()
    for each v ∈ AdjList(u)
      if color[v]=WHITE
        d[v] <- d[u]+1
        π[v] <- u
        color[v] <- GRAY
        Q.enqueue(v)
    color[u] <- BLACK
``` 

##### How BFS works:
The basic notion of this algorithm is 
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

 



#### Depth-First Search (DFS)
