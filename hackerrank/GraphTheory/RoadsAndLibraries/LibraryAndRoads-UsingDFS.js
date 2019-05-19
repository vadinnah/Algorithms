'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// // Complete the roadsAndLibraries function below.
// // find the minimum cost of making libraries accessible
// // to all the citizens and print it on a new line.
// function roadsAndLibraries(n, c_lib, c_road, cities) {
//     // n - number of cities (vertices)
//     // c - roads (edges)
//     // c_lib - cost to build a library
//     // c_road - cost to rebuild a road
//     let clr = {};
//     let W = 'w',G='g',B='b';
//     let p = {};
//     let V = n;
//     let E = cities;
//     let Roads = [];
//     let al = {};

//     while(n)
//     {
//         p[n]=null;
//         clr[n]=W;
//         al[n]=[];
//         for(let [u,v] of E) {
//             if(u===n) al[u].push(v);
//             if(v===n) al[v].push(u);
//         }
//         n--;
//     }

//     function visit(al,u) {
//         clr[u]=G;
//         for(let v of al) {
//             if(clr[v]===W) {
//                 p[v]=u;
//                 visit(al,v);
//             }
//         }
//         clr[u]=B;
//     }

//     for(i=1;i<=V;i++) {
//         if(clr[i]===W) visit(al,i);
//     }

// }

// Complete the roadsAndLibraries function below.
// find the minimum cost of making libraries accessible
// to all the citizens and print it on a new line.
function roadsAndLibraries(n, c_lib, c_road, cities) {
    // n - number of cities (vertices)
    // c - roads (edges)
    // c_lib - cost to build a library
    // c_road - cost to rebuild a road
    let clr = {};
    let W = 'w',G='g',B='b';
    let p = [];
    let pi = 0;
    let V = n;
    let E = cities;
    let al = {};

    while(n)
    {
        clr[n]=W;
        al[n]=[];
        for(let [u,v] of E) {
            if(u===n) al[u].push(v);
            if(v===n) al[v].push(u);
        }
        n--;
    }

    function visit(al,u) {
        clr[u]=G;
        p[pi].push(u);
        for(let v of al[u]) {
            if(clr[v]===W) {
                visit(al,v);
            }
        }
        clr[u]=B;
    }

    for(let i=1;i<=V;i++) {
        if(clr[i]===W) {
            p[pi]=[];
            visit(al,i);
            pi++;
        }
    }

    console.log(`Paths required: ${pi}`);

    let mincost = 0;
    /*while(p.length > 0) {
        let r = p.pop();
        mincost+=c_lib;
        r.pop();
        while(r.length>0) {
            if(c_lib<c_road) {
                mincost+=c_lib;
            } else {
                mincost+=c_road;
            }
            r.pop();
        }
    }*/

    for(let j=0;j<pi;j++)
    {
        mincost+=c_lib;
        if(p[j].length>0) {
            let k = p[j].length-1;
            if(c_lib<c_road) {
                mincost+=c_lib*k;
            } else {
                mincost+=c_road*k;
            }
        }
    }
    return mincost;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const nmC_libC_road = readLine().split(' ');

        const n = parseInt(nmC_libC_road[0], 10);

        const m = parseInt(nmC_libC_road[1], 10);

        const c_lib = parseInt(nmC_libC_road[2], 10);

        const c_road = parseInt(nmC_libC_road[3], 10);

        let cities = Array(m);

        for (let i = 0; i < m; i++) {
            cities[i] = readLine().split(' ').map(citiesTemp => parseInt(citiesTemp, 10));
        }

        const result = roadsAndLibraries(n, c_lib, c_road, cities);

        ws.write(result + '\n');
    }

    ws.end();
}
