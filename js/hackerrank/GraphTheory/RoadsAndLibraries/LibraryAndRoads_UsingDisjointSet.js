'use strict';

const fs = require('fs');
const DisjointSet = require('./../../../dataStructures/DisjointSet');

var inputString = '';
var currentLine = 0;

// process.stdin.resume();
// process.stdin.setEncoding('utf-8');



// process.stdin.on('data', inputStdin => {
//     inputString += inputStdin;
// });

// process.stdin.on('end', function() {
//     inputString = inputString.replace(/\s*$/, '')
//         .split('\n')
//         .map(str => str.replace(/\s*$/, ''));

//     main();
// });

function readLine() {
    return inputString[currentLine++];
}

// Complete the roadsAndLibraries function below.
// find the minimum cost of making libraries accessible
// to all the citizens and print it on a new line.
function roadsAndLibraries(n, c_lib, c_road, cities) {
    // n - number of cities (vertices)
    // c - roads (edges)
    // c_lib - cost to build a library
    // c_road - cost to rebuild a road

    let mincost = 0;
    let P = {};
    let ds = new DisjointSet(n);

    for(let [u,v] of cities) {
        ds.Union(u,v);
    }

    while(n) {
        let s = ds.Find(n);
        if(P[s]===undefined) {
            P[s]=1;
        } else {
            P[s]++;
        }
        n--;
    }

    for(let i in P) {
        mincost+=c_lib;
        let k = P[i]-1;
        if(c_lib<c_road) {
            mincost+=c_lib*k;
        } else {
            mincost+=c_road*k;
        }
    }

    return mincost;
}

function ReadTest(filepath)
{
    let contents = fs.readFileSync(filepath,'utf8');
    inputString = contents.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));
}

function main() {
    const ws = process.stdout;
    let filepath = 'E:\\CodeSpace\\Algorithms\\hackerrank\\GraphTheory\\RoadsAndLibraries\\LibsAndRoads1.txt';

    ReadTest(filepath);

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

main();