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

// #endregion

// #region Graph attempt 1
/*
var Graph = function(V,E,isDirected) {
	var me = this;
	this.vertices = V;
	this.edges = E;
	this.isDirected = isDirected;

	// this.adjacencyList = function(nodes, edges, isDirected) {
	// 	if (nodes instanceof Array) {
	// 		for(let n of nodes) {
	// 			this[n] = [];
	// 			for(let [u,v] of edges)
	// 			{
	// 				if (u===n) this[n].push(v);
	// 				else if (!isDirected && v===n) this[n].push(u);
	// 			}
	// 		}
	// 	}
	// 	else {
	// 		//Assume nodes is a number
	// 		for(let i=1;i<=nodes;i++)
	// 		{
	// 			this[i] = [];
	// 			for(let [u,v] of edges)
	// 			{
	// 				if (u===i) this[i].push(v);
	// 				else if (!isDirected && v===i) this[i].push(u);
	// 			}
	// 		}
	// 	}
	// 	return this;
	// }(V,E,isDirected);

	// this.adjacencyMatrix = function(nodes, edges, isDirected) {
	// 	for(let n in nodes) {
	// 		this[n] = {};
	// 		for(let m in nodes) {
	// 			this[n][m] = 0;
	// 		}
	// 	}

	// 	for(let [u,v] of edges) {
	// 		this[u][v] = 1;
	// 		if (!isDirected) this[v][u] = 1; 
	// 	}
	// 	return this;
	// }(V,E,isDirected);

	this.adjacencyList = function(nodes, edges, isDirected) {
		let al = {};
		if (nodes instanceof Array) {
			for(let n of nodes) {
				al[n] = [];
				for(let [u,v] of edges)
				{
					if (u===n) al[n].push(v);
					else if (!isDirected && v===n) al[n].push(u);
				}
			}
		}
		else {
			//Assume nodes is a number
			for(let i=1;i<=nodes;i++)
			{
				al[i] = [];
				for(let [u,v] of edges)
				{
					if (u===i) al[i].push(v);
					else if (!isDirected && v===i) al[i].push(u);
				}
			}
		}
		return al;
	}(V,E,isDirected);

	this.adjacencyMatrix = function(nodes, edges, isDirected) {
		let am = {};
		if (nodes instanceof Array) {
			for(let n of nodes) {
				am[n] = {};
				for(let m of nodes) {
					am[n][m] = 0;
				}
			}
		}
		else {
			//Assume nodes is a number
			indices = new Array(nodes);	
			for(let i=1;i<=nodes;i++)
			{
				am[i] = {};
				for(let j=1;i<=nodes;j++) {
					am[i][j] = 0;
				}
			}
		}

		for(let [u,v] of edges) {
			am[u][v] = 1;
			if (!isDirected) am[v][u] = 1; 
		}
		return am;
	}(V,E,isDirected);
	
} 
*/
// #endregion


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



	this.adjacencyList = function() {
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
	}();

	this.adjacencyMatrix = function() {
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
	}();
	
	this.bfs = function(s) {
		// Track distance of each node from start
		let al = this.adjacencyList;
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

	this.shortestPath = function(s,v) {
		// if(s===v) return [];
		// let {parents,levels} = this.bfs(s);
		// let sp = [];
		// if(parents.hasOwnProperty(v)) {
		// 	let n = v;
		// 	while(parents.hasOwnProperty(n) && n!==s) {
		// 		let p = parents[n];
		// 		sp.push(n);
		// 		n = p;
		// 	}
		// }
		
		if(s===v) return [];
		let {parents} = this.bfs(s);
		let n = v;
		let sp = [];
		while(n && parents.hasOwnProperty(n)) {
			sp.push(n);
			n = parents[n];
		}
		return sp.reverse();
	};

	// this.dfs = function() {
	// 	let parents = {};
	// 	let al = me.adjacencyList;
	// 	function dfs_visit(al,s) {
	// 		for(let v of al[s])
	// 		{
	// 			if(!parents.hasOwnProperty(v))
	// 			{
	// 				parents[v]=s;
	// 				dfs_visit(al,v);
	// 			}
	// 		}
	// 	};

	// 	for(let s of vertices)
	// 	{
	// 		if(!parents.hasOwnProperty(s)) {
	// 			parents[s]=null;
	// 			dfs_visit.call(this,al,s);
	// 		}
	// 	}
	// 	return parents;
	// };

	// this.dfs_detect_edges = function() {
	// 	let parents = {};
	// 	let timestamps = {};
	// 	let timeCounter = 0;
	// 	let recurseStack = {};
	// 	let al = me.adjacencyList;
	// 	//let currlead = undefined;
	// 	function dfs_visit(al,s) {		
	// 		let stamp = {};
	// 		stamp.start = ++timeCounter;
	// 		//recurseStack[s] = currlead;
	// 		for(let v of al[s])
	// 		{			
	// 			if(!parents.hasOwnProperty(v))
	// 			{
	// 				parents[v]=s;
	// 				dfs_visit(al,v);
	// 			}			
	// 		}
	// 		stamp.end = ++timeCounter;
	// 		timestamps[s]=stamp;
	// 	}
	
	// 	function setLastLead() {
	
	// 	}
	
	// 	for(let s of me.vertices)
	// 	{
	// 		if(!parents.hasOwnProperty(s)) {
	// 			parents[s]=null;
	// 			dfs_visit(al,s);
	// 		}
	// 	}
	// 	return {parents,timestamps};
	// };
	
	
	this.dfs = function() {
		//white=reached,gray=visiting,black=visited
		let color = {};
		let discoveryTime = {};
		let parents = {}
		let finishTime = {};
		let tm = 0;
		function dfs_visit(u) {
			color[u] = 'gray';
			tm++;
			discoveryTime[u]=tm;
			for(let v of me.adjacencyList[u]) {
				if (color[v]==='white') {
					parents[v]=u;
					dfs_visit(v);
				}
			}
			color[u]='black';
			tm++;
			finishTime[u]=tm;
		};

		for(let n of me.vertices) {
			color[n]='white';
		}

		for(let n of me.vertices) {
			if(color[n]==='white') {
				dfs_visit(n);
			}
		}

		return {discoveryTime,finishTime,parents};
	};
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

//console.log(g1.adjacencyList);
console.log(g1.dfs());

// var g2 = new Graph(
// 	6
// 	,[[1,2],[1,5],[5,2],[4,5],[2,4],[2,3],[3,4]]
// 	//,true
// );
// console.log('\n\n');
// console.log(g2);