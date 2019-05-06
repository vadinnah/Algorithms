'use strict';

// #region AdjacencyList, AdjacencyMatrix, Graph classes

var AdjacencyList = function(nodes, edges, isDirected) {
	if (nodes instanceof Array) {
		for(let n of nodes) {
			this[n] = [];
			for(let [u,v] of edges)
			{
				if (u===n) this[n].push(v);
				else if (!isDirected && v===n) this[n].push(u);
			}
		}
	}
	else {
		//Assume nodes is a number
		for(let i=1;i<=nodes;i++)
		{
			this[i] = [];
			for(let [u,v] of edges)
			{
				if (u===i) this[i].push(v);
				else if (!isDirected && v===i) this[i].push(u);
			}
		}
	}
}

var AdjacencyMatrix = function(nodes, edges, isDirected) {
	if (nodes instanceof Array) {
		for(let n of nodes) {
			this[n] = {};
			for(let m of nodes) {
				this[n][m] = 0;
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
				this[i][j] = 0;
			}
		}
	}

	for(let [u,v] of edges) {
		this[u][v] = 1;
		if (!isDirected) this[v][u] = 1; 
	}
}

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

Graph.prototype.vertexColor =  {
    WHITE:'white',
    GRAY:'gray',
    BLACK:'black'
};
Object.freeze(Graph.prototype.vertexColor);

Graph.prototype.edgeClassifications = function()
{
    this.back = [];
    this.leaf = [];
    this.forward = [];
    this.cross = [];
}

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
    let queue = [];
    let al = me.adjacencyList();
    let V = me.vertices;
    let vertexColor=me.vertexColor;

    for(let u of V) {
        if(u!==s) {
            color[u]=vertexColor.WHITE;
            distance[u]=Infinity;
            //parent[u]=null; 
            parent[u]=undefined; 
        }
    }

    color[s]=vertexColor.GRAY;
    distance[s]=0;
    parent[s]=null;
    queue.push(s);
    
    while(queue.length>0)
    {
        let u = queue.shift();
        for(let v of al[u]) {
            if(color[v]===vertexColor.WHITE) {
                color[v]=vertexColor.GRAY;
                distance[v]=distance[u]+1;
                parent[v]=u;
                queue.push(v);
            }
        }
        color[u]=vertexColor.BLACK;
    }
    return {distance,parent};
}

/**
 * @description performs dfs,topological_sort and classifies edges
 */
// Graph.prototype.dfs_eeverything = function(SV) {
//     let me = this;

//     //white=reached,gray=visiting,black=visited
//     let color = {};
//     let discoveryTime = {};
//     let parents = {}
//     let finishTime = {};
//     let timer = 0;    
//     let al = me.adjacencyList();
//     let vc = me.vertexColor;
//     let topologicalSort = [];
//     let edgeClasses = new me.edgeClassifications();

//     // define the recursed operations
//     function dfs_visit(u) {
//         color[u] = vc.GRAY;
//         timer++;
//         discoveryTime[u]=timer;
//         for(let v of al[u]) {
//             if (color[v]===vc.WHITE) {
//                 parents[v]=u;
//                 edgeClasses.leaf.push([u,v]);
//                 dfs_visit(v);                
//             }
//             else if(color[v]===vc.GRAY) {
//                 edgeClasses.back.push([u,v]);
                
//             }
//             else {
//                 if(finishTime[u]<finishTime[v]) {
//                     edgeClasses.forward.push([u,v]);
//                 }
//                 else {
//                     edgeClasses.cross.push([u,v]);
//                 }
//             }
//         }
//         color[u]=vc.BLACK;
//         timer++;
//         finishTime[u]=timer;
//         topologicalSort.unshift(u);
//     };

//     // before graph exploration begins
//     // mark all vertices as not yet explored
//     for(let n of me.vertices) {
//         color[n]=vc.WHITE;
//         discoveryTime[n]=undefined;
//         finishTime[n]=undefined;
//         parents[n]=null;
//     }

//     // explore graph
//     for(let n of SV) {
//         if(color[n]===vc.WHITE) {
//             dfs_visit(n);
//         }
//     }

//     // if parents[u]=null, that means in this iteration
//     // of dfs that vertex doesn't have a parent
//     return {discoveryTime,finishTime,parents,topologicalSort,edgeClasses};
// };


Graph.prototype.dfs_explore = function(SV) {
    let me = this;

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
 * @summary Implementation of dfs according to textbook
 */
Graph.prototype.dfs = function() {
    return this.dfs_explore(this.vertices);
}

Graph.prototype.dfsAtRoot = function(s) {
    return this.dfs_explore([s]);
}

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

Graph.prototype.topological_sort = function() {
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
        result.unshift(u);
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

Graph.prototype.classify_edges = function() {
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
    let edgeClasses = new me.edgeClassifications();

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

//var WeightedGraph = function() {};

module.exports = {
    AdjacencyList,
    AdjacencyMatrix,
    Graph
};