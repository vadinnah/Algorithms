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

function main() {
    const ws = process.stdout;
    let filepath = 'E:\\CodeSpace\\Algorithms\\hackerrank\\GraphTheory\\RoadsAndLibraries\\LibsAndRoads3.txt';

    ReadTest(filepath);

    ws.end();
}

main();