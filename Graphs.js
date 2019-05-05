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

var Graph = function(V,E,isDirected) {
	var me = this;
	this.vertices = function(nodes){
		if (nodes instanceof Array) {
			return nodes;
		}
		else {
			//Assume nodes is a number
			indices = new Array(nodes);	
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
    let me = this;
    let al = {};
    for(let n of me.vertices) {
        al[n] = [];
        for(let [u,v] of me.edges)
        {
            if (u===n) al[n].push(v);
            else if (!me.isDirected && v===n) al[n].push(u);
        }
    }

    return al;
}

Graph.prototype.adjacencyMatrix = function() {
    let me = this;
    let am = {};
    for(let n of me.vertices) {
        am[n] = {};
        for(let m of me.vertices) {
            am[n][m] = 0;
        }
    }

    for(let [u,v] of me.edges) {
        am[u][v] = 1;
        if (!me.isDirected) am[v][u] = 1; 
    }
    return am;
};

/**
 * @summary implementation from MIT OCW Course 
 * @param {*} s starting vertex
 * @param {*} g Graph
 */
Graph.prototype.bfs_mit = function(s) {
    // Track distance of each node from start
    let al = this.adjacencyList();
    let levels = {};
    levels[s]=0;
    // Track the parent of each node from start
    let parents = {};
    parents[s]=null;
    // Track the nodes we have visited
    let frontier = [s];
    // Track the current level
    let i = 1;
    while(frontier && frontier.length>0) {
        // Track those nodes that will become a part of the next frontier
        let next = [];
        // Explore the nodes in the curent frontier
        for(let u of frontier) {
            for(let v of al[u]) {
                if(levels[v]===undefined || levels[v]===null)
                {
                    // set the current level of the newly reached node
                    levels[v]=i;
                    // set the parents of the newly reach node
                    parents[v]=u;
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
    return {levels,parents};
};

/**
 * @summary
 * @description
 * @param {*} s 
 * @param {*} g 
 */
Graph.prototype.bfs_textbook = function(s) {
    let me = this;
    //white=reached,gray=visiting,black=visited
    let color = {};
    let distance = {};
    let parent = {};
    let queue = [];

    let V = me.vertices;
    let al = me.adjacencyList;

    for(let u of V) {
        if(u!==s) {
            color[u]='white';

        }
    }
}

var g1 = new Graph(
	['v','s','w','q','t','x','z','y','r','u'],
	[
		['s','v']
		,['v','w']
		,['w','s']
		,['q','s']
		,['q','w']
		,['q','t']
		,['t','x']
		,['x','z']
		,['z','x']
		,['t','y']
		,['y','q']
		,['u','y']
		,['r','u']
		,['r','y']
	],
	true
);

var g2 = new Graph(
	6
	,[[1,2],[1,5],[5,2],[4,5],[2,4],[2,3],[3,4]]
	//,true
);

for(let g of [g1,g2]) {
    console.log('\n----------------------------');
    console.log(g);
    console.log(g.adjacencyList());
    console.log(g.adjacencyMatrix());
    console.log('----------------------------\n');
}

// console.log(g1.adjacencyList());
//console.log(g1);