'use strict';

/*#####################################################*\
    Helper Classes
\*#####################################################*/
// #region Helper classes
var AdjacencyList = function(nodes, edges, isDirected) {
	if (nodes instanceof Array) {
		for(let n of nodes) {
			this[n] = [];
			for(let [u,v,w] of edges)
			{
				if (u===n) {                   
                    if(w) {
                        this[n].push([v,w]);
                    }
                    else {
                        this[n].push(v);
                    }
                }
				else if (!isDirected && v===n) {
                    if(w) {
                        this[n].push([u,w]);
                    }
                    else {
                        this[n].push(u);
                    }
                }
			}
		}
	}
	else {
		//Assume nodes is a number
		for(let i=1;i<=nodes;i++)
		{
			this[i] = [];
			for(let [u,v,w] of edges)
			{
				if (u===i) {                   
                    if(w) {
                        this[i].push([v,w]);
                    }
                    else {
                        this[i].push(v);
                    }
                }
				else if (!isDirected && v===n) {
                    if(w) {
                        this[i].push([u,w]);
                    }
                    else {
                        this[i].push(u);
                    }
                }
			}
		}
	}
}

var AdjacencyMatrix = function(nodes, edges, isDirected) {
    let hasWeights = (edges && edges.length>0) ? edges[0][2] : false;
	if (nodes instanceof Array) {
		for(let n of nodes) {
			this[n] = {};
			for(let [m,w] of nodes) {
				this[n][m] = (hasWeights) ? Infinity : 0;
			}
		}
	}
	else {
		//Assume nodes is a number
        indices = new Array(nodes);	
        
		for(let i=1;i<=nodes;i++)
		{
			this[i] = {};
			for(let j=1;i<=nodes;j++) {
				this[i][j] = (hasWeights) ? Infinity : 0;
			}
		}
	}

	for(let [u,v,w] of edges) {
		this[u][v] = (w) ? w : 1;
		if (!isDirected) this[v][u] = (w) ? w : 1; 
	}
}
// #endregion Helper classes

var Graph = function(V,E,isDirected=false) {
	var me = this;
	this.vertices = function(nodes){
		if (nodes instanceof Array) {
			return nodes;
		}
		else {
			//Assume nodes is a number
			let indices = new Array(nodes);	
			for(let i=0;i<nodes;)
			{
				indices[i] = ++i;
			}
			return indices;
		}
	}(V);
	this.edges = E;
    this.isDirected = isDirected;
}; 

Graph.prototype.adjacencyList = function() {
    return new AdjacencyList(this.vertices,this.edges, this.isDirected);
}

Graph.prototype.adjacencyMatrix = function() {
    return new AdjacencyMatrix(this.vertices,this.edges, this.isDirected);
};

/**
 * @class VertexColor
 * 
 * WHITE = vertex is undiscovered
 * GRAY = vertex has been discovered
 * BLACK = vertex has been explored
 * 
 * In the case of BFS, "explored" means
 * the vertex adjacency list has been examined
 */
Graph.prototype.vertexColor =  {
    WHITE:'white',
    GRAY:'gray',
    BLACK:'black'
};
Object.freeze(Graph.prototype.vertexColor);

Graph.prototype.EdgeClassifications = function()
{
    this.back = [];
    this.leaf = [];
    this.forward = [];
    this.cross = [];
}


/*#####################################################*\
    Breadth-First Search Algorithms
\*#####################################################*/
// #region BFS Algorithms

/**
 * @summary implementation from MIT OCW Course 
 * @param {*} s starting vertex
 */
Graph.prototype.bfs_mit = function(s) {
    
    let al = this.adjacencyList();
    let V = this.vertices;

    // Track distance of each node from start
    let level = {};
    // Track the parent of each node from start
    let parent = {};
    // Track the nodes we have visited
    let frontier = [];

    // Set initial information for all nodes
    // in case there are vertices unreachable from s
    for(let u of V) {
        level[u]=Infinity;
        parent[u]=undefined;
    }

    // Set status of first not visited, which is s
    level[s]=0;
    parent[s]=null;
    frontier.push(s);

    // Track the current level
    let i = 1;

    while(frontier && frontier.length>0) {
        // Track those nodes that will become a part of the next frontier
        let next = [];
        // Explore the nodes in the curent frontier
        for(let u of frontier) {
            for(let v of al[u]) {
                if(level[v]===Infinity)
                {
                    // set the current level of the newly reached node
                    level[v]=i;
                    // set the parents of the newly reach node
                    parent[v]=u;
                    // mark newly reach node as a new frontier
                    next.push(v);
                }
            }
        }
        // Now that we have explored every node in the current
        // frontier, time to traverse the nodes in the next frontier
        frontier = next;
        // Mark the level (distance from start) of the new frontier
        i++;
    }
    
    return {distance: level,parent};
};

/**
 * @summary Implementation of bfs according to textbook
 * @description
 * @param {*} s 
 */
Graph.prototype.bfs = function(s) {
    let me = this;
    //white=reached,gray=visiting,black=visited
    let color = {};
    let distance = {};
    let parent = {};
    let frontier = [];
    let al = me.adjacencyList();
    let V = me.vertices;
    let {WHITE,GRAY,BLACK}=me.vertexColor;

    for(let u of V) {
        if(u!==s) {
            color[u]=WHITE;
            distance[u]=Infinity;
            parent[u]=undefined; 
        }
    }

    color[s]=GRAY;
    distance[s]=0;
    parent[s]=null;
    frontier.push(s);
    
    while(frontier.length>0)
    {
        let u = frontier.shift();
        for(let v of al[u]) {
            if(color[v]===WHITE) {
                color[v]=GRAY;
                distance[v]=distance[u]+1;
                parent[v]=u;
                frontier.push(v);
            }
        }
        color[u]=BLACK;
    }
    return {distance,parent};
}
// #endregion BFS Algorithms


/*#####################################################*\
    Basic Depth-First Search Algorithms and 
    variations of DFS to 
        - detect cycles
        - find the topological sort
        - compute the strong connected components
\*#####################################################*/
// #region DFS Algortihms
Graph.prototype.dfs = function(s) {
    let me = this;

    let SV = [...this.vertices];
    if(s) {
        SV = [s];
    } 

    //white=reached,gray=visiting,black=visited
    let color = {};
    let parents = {}  
    let al = me.adjacencyList();
    let vc = me.vertexColor;

    // define the recursed operations
    function dfs_visit(u) {
        color[u] = vc.GRAY;
        for(let v of al[u]) {
            if (color[v]===vc.WHITE) {
                parents[v]=u;
                dfs_visit(v);                
            }
        }
        color[u]=vc.BLACK;
    };

    // before graph exploration begins
    // mark all vertices as not yet explored
    for(let n of me.vertices) {
        color[n]=vc.WHITE;
        parents[n]=null;
    }

    // explore graph
    for(let n of SV) {
        if(color[n]===vc.WHITE) {
            dfs_visit(n);
        }
    }

    // if parents[u]=null, that means in this iteration
    // of dfs that vertex doesn't have a parent
    return parents;
};

/**
 * @description Use depth-first search to very whether
 * or not this graph has a back edge, and thus is not acyclic
 */
Graph.prototype.isAcyclic = function() {
    let me = this;
    let backEdgeFound=false;
    //white=reached,gray=visiting,black=visited
    let color = {};    
    let al = me.adjacencyList();
    let vc = me.vertexColor;

    // define the recursed operations
    function dfs_visit(u) {
        color[u] = vc.GRAY;
        for(let i=0;i<al[u].length&&backEdgeFound===false;i++) {
            let v=al[u][i];
            if (color[v]===vc.WHITE) {
                dfs_visit(v);                
            }
            else if(color[v]===vc.GRAY) {
                backEdgeFound=true;                
            }
        }
        color[u]=vc.BLACK;
    };

    // before graph exploration begins
    // mark all vertices as not yet explored
    for(let n of me.vertices) {
        color[n]=vc.WHITE;
    }

    // explore graph
    for(let i=0;i<me.vertices.length&&backEdgeFound===false;i++) {
        let n=me.vertices[i];
        if(color[n]===vc.WHITE) {
            dfs_visit(n);
        }
    }

    // if parents[u]=null, that means in this iteration
    // of dfs that vertex doesn't have a parent
    return !backEdgeFound;
};

/**
 * @description Use depth-first search to find
 * a topological sort of this graph
 */
Graph.prototype.topologicalSort = function() {
    let me = this;

    //white=reached,gray=visiting,black=visited
    let color = {};    
    let al = me.adjacencyList();
    let vc = me.vertexColor;
    let result = [];

    // define the recursed operations
    function dfs_visit(u) {
        color[u] = vc.GRAY;
        for(let v of al[u]) {
            if (color[v]===vc.WHITE) {
                dfs_visit(v);
            }                
        }
        color[u]=vc.BLACK;
        result.push(u);
    };

    // before graph exploration begins
    // mark all vertices as not yet explored
    for(let n of me.vertices) {
        color[n]=vc.WHITE;
    }

    // explore graph
    for(let n of me.vertices) {
        if(color[n]===vc.WHITE) {
            dfs_visit(n);
        }
    }

    // if parents[u]=null, that means in this iteration
    // of dfs that vertex doesn't have a parent
    return result;
};

/**
 * @description Use depth-first search to classify each 
 * edge as forward, back, leaf and cross.
 */
Graph.prototype.classifyEdges = function() {
    let me = this;

    //white=reached,gray=visiting,black=visited
    let color = {};
    let discoveryTime = {};
    //let parents = {}
    let finishTime = {};
    let timer = 0;    
    let al = me.adjacencyList();
    let vc = me.vertexColor;
    //let topologicalSort = [];
    let edgeClasses = new me.EdgeClassifications();

    // define the recursed operations
    function dfs_visit(u) {
        color[u] = vc.GRAY;
        timer++;
        discoveryTime[u]=timer;
        for(let v of al[u]) {
            if (color[v]===vc.WHITE) {
                //parents[v]=u;
                edgeClasses.leaf.push([u,v]);
                dfs_visit(v);                
            }
            else if(color[v]===vc.GRAY) {
                edgeClasses.back.push([u,v]);
                
            }
            else {
                if(finishTime[u]<finishTime[v]) {
                    edgeClasses.forward.push([u,v]);
                }
                else {
                    edgeClasses.cross.push([u,v]);
                }
            }
        }
        color[u]=vc.BLACK;
        timer++;
        finishTime[u]=timer;
        //topologicalSort.push(u);
    };

    // before graph exploration begins
    // mark all vertices as not yet explored
    for(let n of me.vertices) {
        color[n]=vc.WHITE;
        discoveryTime[n]=undefined;
        finishTime[n]=undefined;
        // parents[n]=null;
    }

    // explore graph
    for(let n of me.vertices) {
        if(color[n]===vc.WHITE) {
            dfs_visit(n);
        }
    }

    // if parents[u]=null, that means in this iteration
    // of dfs that vertex doesn't have a parent
    return edgeClasses;
}

/**
 * @summary computes the strongly connected components of the graph
 * 
 * @description 
 * The order in which a graph is explored depends 
 * on both the order of V (vertex list) and E
 * (edge list) passed into its ctor
 */
Graph.prototype.computeSCC = function() {
    
    function compute(G) {
        let stack = [];
        let color = {};
        let scc = [];
        let s = -1;
        scc = [];

        function dfs_visit(u,al) {
            color[u]='g';
            for(let v of al[u]) {
                if(color[v]==='w') {
                    scc[s].push(v);
                    dfs_visit(v,al);
                }				
            }
            color[u]='b';
            stack.unshift(u);
        }

        G.vertices.forEach(v => color[v]='w');
        let a2 = G.adjacencyList();
        G.vertices.forEach(v => {
            if(color[v]==='w') {
                s++;
                scc[s] = [];
                scc[s].push(v);
                dfs_visit(v,a2);
            }
        });
        return {scc,stack};
    };
    

    // 1. Compute finish times
    let {stack:s} = compute(this);

    // 2. Create tranpose of G
    let GT = new Graph(
        s //['b','e','a','c','d','g','h','f'] 
        ,this.edges.map(e=>[e[1],e[0]])
        ,this.isDirected
    );
    
    // 3. Compute the strongly connected compoments (SCC)
    let {scc:res} = compute(GT);
    
    return res;
};
// #endregion DFS Algortihms

/*#####################################################*\
    Algorithms to find the minimum spanning tree
\*#####################################################*/
// #region MST Algorithms

Graph.prototype.isSpanningTree = function(A)
{
	let av = [];
	let V = this.vertices;
	A.forEach(e=>{
		//av=[...av,...e]
		let [u,v] = e;
		if(!av.includes(u)) av.push(u);
		if(!av.includes(v)) av.push(v);  
	});

	return V.every(v=>av.includes(v));
};


/**
 * 
 * @summary Implementation of Kurskals algorithm 
 * for finding minimum spanning tree.
 * 
 * @description
 * An iteration of 
 * **_Generic_MST(G,w)_**
 * { 
 *  A = null
 *  **while** A does not form a spanning tree
 * 	    **do** find an edge e that is safe for A
 * 		    A.Add(e) 
 *  **return** A
 * }
 * 
 * **_TERMS_** 
 * 
 * **G = (V,E)**
 * 	V - set of vertices in G
 *  E - set of edges in G
 * 
 * **Minimum Spanning Tree**, T = (V,A)
 * 	T is composed of those edges in E that
 * 	connect all vertices in V with min weight
 * 	A = set of edges in T
 * 		(A <subset of> E)
 * 
 * A **CUT**,C = C <subset of> V
 * 
 * An edge (u,v) in E **CROSSES** C 
 * 	if either u or v is contained in C.
 * 
 * C **RESPECTS** A 
 * 	if no vertex in C appears as an
 * 	endpoint of any edge in A.
 * 
 * An edge (u,v) is a **LIGHT EDGE**
 * 	if it has the min weight of all edges 
 * 	crossing a cut, C.
 * 
 * A light edge is a **SAFE EDGE**
 */ 
Graph.prototype.kruskalMST = function() {
    // 0. The spanning tree starts as an empty set of edges
    let tree = [];
    let treeWeight = 0;
    let isST = false;
    // 1. Make the inititial cuts. At the start there
    //    are V cuts, each containing a single vertex
    let F = {};
    for(let v of this.vertices) {
        F[v] = [v];
    }

    // 2. Sort edges by their weight in ascending order 
    let SE = sortEdges(this.edges);

    // 3. Visit the sorted list of edges in the order 
    //    of their increasing weights (ensuring that each visited 
    //    edge is a safe edge) until a spanning tree is formed or 
    //    no more edges remain.
    while(!isST && SE.length > 0) {
        // remove edges as they are inspected
        let [u,v,w] = SE.shift();
        if(F[u]!==F[v]) {
            tree.push([u,v,w]);
            treeWeight+=w;
            let cut = [...F[u],...F[v]];
            cut.forEach(c => F[c] = cut);
            isST=this.isSpanningTree(tree);
        }
    }

    return (isST) ? tree : 'Graph does not contain a spanning tree';    
};

/**
 * 
 * @summary Implementation of Prims algorithm for 
 * finding minimum spanning tree.
 * 
 * @description
 * An iteration of 
 * **_Generic_MST(G,w)_**
 * { 
 *  A = null
 *  **while** A does not form a spanning tree
 * 	    **do** find an edge e that is safe for A
 * 		    A.Add(e) 
 *  **return** A
 * }
 * 
 * **_TERMS_** 
 * 
 * **G = (V,E)**
 * 	V - set of vertices in G
 *  E - set of edges in G
 * 
 * **Minimum Spanning Tree**, T = (V,A)
 * 	T is composed of those edges in E that
 * 	connect all vertices in V with min weight
 * 	A = set of edges in T
 * 		(A <subset of> E)
 * 
 * A **CUT**,C = C <subset of> V
 * 
 * An edge (u,v) in E **CROSSES** C 
 * 	if either u or v is contained in C.
 * 
 * C **RESPECTS** A 
 * 	if no vertex in C appears as an
 * 	endpoint of any edge in A.
 * 
 * An edge (u,v) is a **LIGHT EDGE**
 * 	if it has the min weight of all edges 
 * 	crossing a cut, C.
 * 
 * A light edge is a **SAFE EDGE**
 */
Graph.prototype.primMST = function() {
    /* Since we know that a spanning tree must containg every
    vertex, start with an arbitrary vertex, find the light edge from that vertex */
    let tree = [];
    let V = [...this.vertices];
    let E = [...this.edges];
    let root = [V.pop()];
    //let isST = false;

    while(V.length > 0 && E.length > 0) {

        //find lightest edge from root
        let edgesFromRoot = [];
        for(let [u,v,w] of E) {
            if(u===root || v===root) {
                edgesFromRoot.push([u,v,w]);
            }
        }
        if(edgesFromRoot.length > 0) {
            
            let lightedge = edgesFromRoot[0];
            for(let i=1;i<edgesFromRoot.length;i++) {
                let e = edgesFromRoot[i];
                if(e[2]<lightedge[2]) {
                    lightedge=e;
                }
            }
            
            // Remove added vertices
            if(V.indexOf(lightedge[0]) > -1) V.splice(V.indexOf(lightedge[0]),1);
            if(V.indexOf(lightedge[1]) > -1) V.splice(V.indexOf(lightedge[1]),1);

            // Remove visted edges
            //E = E.filter(e=>!edgesFromRoot.includes(e));

            tree.push(lightedge);
        }
        root = V.pop();
    }
    return tree;
}

let {BubbleSort} = require('./Sorting');
function sortEdges(E) {
    let W = E.map(e=>e[2]);  
    W = BubbleSort(W); 
    let SE = [];
    let current = -1;
    W.forEach(w => {
        if(current !== w) {
            let r = E.filter(e => e[2]===w);
            SE = [...SE, ...r];
            current=w;
        }
    });
    return SE;
}
// #endregion MST Algorithms


/*#####################################################*\
    Shortest Path Algorithms
\*#####################################################*/
// #region Shorted Path Algorithms
/**
 * @ description
 *  BELLMAN-FORD(G,w,s)
 * {
 *      INITIALIZE-SINGLE-SOURCE(G,s)
 *      **for** i <- 1 to |V|G||-1
 *          **for** each edge (u,v) ∈ E[G]
 *              **do** RELAX(u,v,w)
 *      **for** each edge (u,v) ∈ E[G]
 *          **if** d[v] > d[u] + w(u,v)
 *              **return** FALSE
 *      **return** TRUE
 * }
 * 
 * INITIALIZE-SINGLE-SOURCE(G,s)
 * {
 *      **for** each vertex v ∈ V[G]
 *          **do** d[v] <- ∞
 *              π[v] <- NIL
 *      d[s] <- 0
 * }
 * 
 * RELAX(u,v,w)
 * {
 *      **if** d[v] > d[u] + w 
 *          **then** d[v] <- d[u] + w;
 *               π[v] <- u
 * }
 * 
 * * d[u] holds shortest path estimate from s to u
 * * π[v] holds the parents vertex of V
 */
Graph.prototype.BellmanFord = function(s) {
    let d = {}; // holds the weights of all paths as we progress through the alogrithm
    let p = {}; // records the actual min path   
    let V = this.vertices;
    let E = this.edges;

    // INITIALIZE-SINGLE-SOURCE(G,s)
    for(let v of V) {
        d[v]=Infinity;
        p[v]=null;
    }
    d[s]=0;

    // for i <- 1 to |V|G||-1
    //   for each edge (u,v) ∈ E[G]
    //     do RELAX(u,v,w)
    for(let i=0;i<V.length-1;i++) {

        for(let [u,v,w] of E) {
            if(d[v] > d[u]+w) {
                d[v] = d[u] + w;
                p[v] = u;
            }

        }
    }

    // for each edge (u,v) ∈ E[G]
    //   if d[v] > d[u] + w(u,v)
    //     return FALSE
    // return TRUE
    for(let [u,v,w] of E) {
        if(d[v] > d[u] + w) {
            return false;
        }
    }
    return true;
}

/**
 * @description
 * DAG-SHORTEST-PATHS(G,w,s)
 * {
 *      ts <- TOPOLOGICAL-SORT(G)
 *      INITIALIZE-SINGLE-SOURCE(G,s)
 *      **for** u ∈ ts
 *          **for** each v ∈ Adj[u]
 *              **do** RELAX(u,v,w) 
 * }
 * 
 * * that statement u ∈ ts, takes each vertex u in topological sorted order
 * 
 * INITIALIZE-SINGLE-SOURCE(G,s)
 * {
 *      **for** each vertex v ∈ V[G]
 *          **do** d[v] <- ∞
 *              π[v] <- NIL
 *      d[s] <- 0
 * }
 * 
 * RELAX(u,v,w)
 * {
 *      **if** d[v] > d[u] + w 
 *          **then** d[v] <- d[u] + w;
 *               π[v] <- u
 * }
 * 
 * * d[u] holds shortest path estimate from s to u
 * * π[v] holds the parents vertex of V
 */
Graph.prototype.DAG_SP = function(s) {
    let d = {}; // holds the weights of all paths as we progress through the alogrithm
    let p = {}; // records the actual min path
    let V = this.vertices;
    let al = this.adjacencyList();

    // ts <- TOPOLOGICAL-SORT(G)
    let ts = this.topologicalSort();

    // INITIALIZE-SINGLE-SOURCE(G,s)
    for(let v of V) {
        d[v]=Infinity;
        p[v]=null;
    }
    d[s]=0;

    // for u ∈ ts
    //   for each v ∈ Adj[u]
    //     do RELAX(u,v,w)     
    for(let u of ts) {
        for(let [v,w] of al[u]) {
            if(d[v] > d[u]+w) {
                d[v] = d[u] + w;
                p[v] = u;
            }
        }
    }
    return {shortPathValues:d,path:p};
}

/**
 * @description
 * 
 * DIJKSTRA(G,w,s)
 * {
 *      INITIALIZE-SINGLE-SOURCE(G,s)
 *      S <- Ø
 *      Q <- V[G]
 *      **while** Q != Ø
 *          **do** u <- EXTRACT-MIN(Q)
 *              S <- S ∪ {u}
 *              **for** each v ∈ Adj[u]
 *                  **do** RELAX(u,v,w)
 * }
 * 
 * * S is the set of vertices whose final shortest path has been found
 * * Q is min-priorty queue of vertices, keyed by their d[v] values
 *      * Q = V - S at the start of each iteration of the while loop
 * 
 * INITIALIZE-SINGLE-SOURCE(G,s)
 * {
 *      **for** each vertex v ∈ V[G]
 *          **do** d[v] <- ∞
 *              π[v] <- NIL
 *      d[s] <- 0
 * }
 * 
 * RELAX(u,v,w)
 * {
 *      **if** d[v] > d[u] + w 
 *          **then** d[v] <- d[u] + w;
 *               π[v] <- u
 * }
 * 
 * * d[u] holds shortest path estimate from s to u
 * * π[v] holds the parents vertex of V
 */
Graph.prototype.Dijkstra = function(s) {
    let d = {}; // holds the weights of all paths as we progress through the alogrithm
    let p = {}; // records the actual min path
    let Q = {};
    let V = this.vertices;
    let S = {}; 
    let al = this.adjacencyList();


    // INITIALIZE-SINGLE-SOURCE(G,s)
    for(let v of V) {
        Q[v] = v;
        d[v]=Infinity;
        p[v]=null;
    }
    d[s]=0;

    // While Q != 0
    while (Object.keys(Q).length>0) 
    {
        // u <- EXTRACT-MIN(Q)
        let u;
        let min = Infinity;
        for(let v in Q) {
            if(d[v]<min) {
                min = d[v];
                u=v;
            }
        }
        delete Q[u];

        // S <- S ∪ {u}
        S[u]=d[u];

        // for each v ∈ Adj[u]
        for(let [v,w] of al[u])
        {
            // do RELAX(u,v,w)
            if(d[v] > d[u]+w) {
                d[v] = d[u] + w;
                p[v] = u;
            }
        }
    }
    return {shortestPaths:S,pathmap:p}
}
// #endregion Shorted Path Algorithms


module.exports = {
    AdjacencyList,
    AdjacencyMatrix,
    Graph
};