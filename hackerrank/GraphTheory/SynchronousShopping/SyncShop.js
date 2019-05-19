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

/*
 * Complete the 'shop' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n, the number of shopping centers 
 *  2. INTEGER k, the number of types of fish
 *  3. STRING_ARRAY centers
 *  4. 2D_INTEGER_ARRAY roads
 */

function shop(n, k, centers, roads) {
    // Write your code here

    // problem set
    let ps = {
        n:n, 
        k: function(arg) { 
            let res = [];
            for(let i=0;i<k;i++) res[i]=i+1;
            return res;
        }(k), 
        c: function(arg) {
            let res = {};
            for(let i=0;i<centers.length;i++) {
                let segs = centers[i].split(/\s/);
                res[i+1]=[];
                for(let s=1; s< segs.length;s++) {
                    res[i+1].push(parseInt(segs[s]));
                }
            }
            return res;
        }(centers),
        f: function(arg) {
            let res = {};
            let a = function(arg) {
                let res = {};
                for(let i=0;i<centers.length;i++) {
                    let segs = centers[i].split(/\s/);
                    res[i+1]=[];
                    for(let s=1; s< segs.length;s++) {
                        res[i+1].push(parseInt(segs[s]));
                    }
                }
                return res;
            }(centers)
            for(let i=1;i<=k;i++) res[i]=[];
            for(let p in a) {
                for(let ft of a[p]) {
                    res[ft].push(p);
                }
            }
            return res;
        }(),
        r:roads,
        print: function() {
            console.log(`Number of shopping centers: ${this.n}`);
            console.log(`Total number of the types of fish sold: ${this.k}`);
            console.log('Fishes sold by city:');
            for(let p in this.c) {
                console.log(`  city ${p}: ${this.c[p].join()}`)
            }
            console.log('Cities that sell fish of type:');
            for(let p in this.f) {
                console.log(`  fish type ${p}: ${this.f[p].join()}`)
            }
            console.log(`Roads:`);
            console.log(this.r);
        }
    }
 
    //ps.print();
    let fishWeight = [];
    for(let [u,v,w] of roads) {
        let a = [u,v,w];
        let s = new Set([...ps.c[u],...ps.c[v]]);
        let itr = s.values();
        let m = [];
        
        for(let i of itr) m.push(i);

        a.push(ps.k.filter(x=>!m.includes(x)));
        fishWeight.push(a);
    }
    console.log(fishWeight);

    let fal = {};
    for(let j = 1;j<=k;j++)
    {
        fal[j]=[];
        for(let [u,v,x,w] of  fishWeight) {
            if(u===j) fal[j].push([v,x,w]);
            else if(v===j) fal[j].push([u,x,w]);
        }
    }

    console.log(fal);

    //Find routes that satisfy fish find
    let W='w',G='g',B='b';
    let sp = Infinity;
    var Node = function(n,p) {
        this.parent = p
        this.data = n;
        this.child = [];
    };

    let tree = new Node(1, null);
    bfs = function(s) {
        let color = {};
        let distance = {};
        let frontier = [];
        let al = fal;
        let V = me.vertices;
        let {WHITE,GRAY,BLACK}=me.vertexColor;
    
        for(let u of V) {
            if(u!==s) {
                color[u]=WHITE;
                distance[u]=Infinity;
                parent[u]=null; 
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
}

function main() {
    const ws = process.stdout;
    let errmsg = "Please provide the name of a test file";
    if(process.argv.length < 3) {
        throw errmsg;
    } 
    
    let filepath = `${__dirname}\\${process.argv[2]}`;    
    ReadTest(filepath);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    const k = parseInt(firstMultipleInput[2], 10);

    let centers = [];

    for (let i = 0; i < n; i++) {
        const centersItem = readLine();
        centers.push(centersItem);
    }

    let roads = Array(m);

    for (let i = 0; i < m; i++) {
        roads[i] = readLine().replace(/\s+$/g, '').split(' ').map(roadsTemp => parseInt(roadsTemp, 10));
    }

    const res = shop(n, k, centers, roads);

    ws.write(res + '\n');

    ws.end();
}


main();