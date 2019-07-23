'use strict';

const fs = require('fs');

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
    let errmsg = "Please provide the name of a test file";
    if(process.argv.length < 3) {
        throw errmsg;
    } 
    
    let filepath = `${__dirname}\\${process.argv[2]}`;    
    ReadTest(filepath);

    //Place test code here

    ws.end();
}

main();