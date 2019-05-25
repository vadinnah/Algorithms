'use strict';

const fs = require('fs');
const DisjointSet = require('./../../../dataStructures/DisjointSet');

var inputString = '';
var currentLine = 0;

function readLine() {
    return inputString[currentLine++];
}

function ReadTest(filepath)
{
    let contents = fs.readFileSync(filepath,'utf8');
    inputString = contents.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));
}

// t6.txt - expected output = 4;
// Complete the evenForest function below.
function evenForest(t_nodes, t_edges, t_from, t_to) {
	
	var al = function() {
		let res = {};
		for(let i = 1; i <= t_nodes; i++) {
			res[i] = [];
		} 
		for(let i = 0; i < t_edges; i++) {
			res[t_from[i]].push(t_to[i]);
			res[t_to[i]].push(t_from[i]);
		}
		return res;
	}();
	
	let p = {};
	let d = {};
	let f = [1];
	let c = {};
	let W=0,G=1,B=2;
	for(let i = 1; i <= t_nodes; i++) {
		p[i]=null;
		d[i]=Infinity;
		c[i]=W;
	} 
	d[1]=0;
	while(f.length> 0)
	{
		let next = [];
		for(let u of f) {
			for(let v of al[u]) {
				if(c[v]===W) {
					p[v]=u;
					d[v]=d[u]+1;
					c[v]=G;
					next.push(v);
				}
				c[u]=B;
			}
		}
		f=next;
	}

	let maxleaf = 1;
	for(let p in d) {
		if(d[p] > d[maxleaf]) maxleaf = p;
	}

	let x = null;
	let cuts = 0;
	let n = maxleaf;
	while(n) {
		//Cut
		let pa = p[n];
		let k = 0;
		for(let v in p) {
			if(p[v]===pa) {
				delete p[v];
				k++;
			}
		}
		if(k%2===0) {
			let gpa = p[pa];
			x = p[gpa];
			delete p[gpa];
			delete p[pa];
		} else {
			x = p[pa];
			delete p[pa];
		}
		n = undefined;

		if(Object.getOwnPropertyNames(p).length>0) {
			if(x!==null) cuts++;

			//Find newleaf
			
			for(let v in p) {
				if(n===undefined || d[v] > d[n]) n=v;
			}
		}
		

	}
	return cuts;
}

function main() {
    const ws = process.stdout;
    let errmsg = "Please provide the name of a test file";
    if(process.argv.length < 3) {
        throw errmsg;
    } 
    
    let filepath = `${__dirname}\\${process.argv[2]}`;    
    ReadTest(filepath);
	
	const tNodesEdges = readLine().split(' ');

    const tNodes = parseInt(tNodesEdges[0], 10);
    const tEdges = parseInt(tNodesEdges[1], 10);

    let tFrom = [];
    let tTo = [];

    for (let i = 0; i < tEdges; i++) {
        const tFromTo = readLine().split(' ');

        tFrom.push(parseInt(tFromTo[0], 10));
        tTo.push(parseInt(tFromTo[1], 10));
    }

    const res = evenForest(tNodes, tEdges, tFrom, tTo);

    ws.write(res + '\n');

    ws.end();
}

main();