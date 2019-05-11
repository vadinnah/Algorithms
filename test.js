var {Graph} = require('./Graphs');

// var g = new Graph(
// 	['a','b','c','d','e','f','g','h','i']
// 	,[
// 		['a','b',4]
// 		,['a','h',8]
// 		,['b','c',8]
// 		,['c','d',7]
// 		,['d','e',9]
// 		,['d','f',14]
// 		,['e','f',10]
// 		,['b','h',11]
// 		,['c','i',2]
// 		,['c','f',4]
// 		,['h','i',7]
// 		,['i','g',6]
// 		,['g','h',1]
// 		,['g','f',2]
// 	]
// 	,false
// );
//console.log(g.kruskalMST());
//console.log(g.primMST());

// to test Bellman Ford
// var g = new Graph(
// 	['s','t','x','y','z']
// 	,[
// 		['s','t',6]
// 		,['s','y',7]
// 		,['t','y',8]
// 		,['z','s',2]
// 		,['t','x',5]
// 		,['x','t',-2]
// 		,['z','x',7]
// 		,['y','z',9]
// 		,['y','x',-3]
// 		,['t','z',-4]
// 	]
// 	,true
// );
//console.log(g.BellmanFord('s'));

var dag = new Graph(
	['r','s','t','x','y','z']
	,[
		['r','s',5]
		,['s','t',2]
		,['t','x',7]
		,['x','y',-1]
		,['y','z',-2]
		,['s','x',6]
		,['x','z',1]
		,['r','t',3]
		,['t','y',4]
		,['t','z',2]
	]
	,true
);
console.log(dag.DAG_SP('s'));

// function bfs(al,s) {
// 	let d = {}; //distance
// 	let p = {}; //parent
// 	let f = []; //frontier
// 	let dc = 1; //distance counter
// 	d[s] = 0;
// 	p[s] = null;
// 	f.push(s);
// 	while(f.length) {
// 		let nf = []; //next frontier
// 		for(let v of al[u]) {
// 			if(!p[v]) {
// 				nf.push(u);
// 				p[v]=u;
// 				d[v]=dc;
// 			}
// 		}
// 		f=nf;
// 		dc++;
// 	}
// 	return {d,p};
// }


