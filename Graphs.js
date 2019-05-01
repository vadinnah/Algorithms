
// #region Ways to Build an Adjacency List

// Function method
function BuildAdjacencyList(nodes,edges)
{
    let al= {};
    for(let i=1;i<nodes;i++)
    {
        al[i] = [];
        for(let [u,v] of edges)
        {
            if(u===i) al[u].push(v);
            else if(v===i) al[v].push(u); 
        }
    }    
    return al;
};

// Object Oriented method
var AdjacencyList = function(nodes, edges, isDirected) {
    if (nodes instanceof Array) {
        for(let n of nodes) {
            this[n] = [];
            for(let [u,v] of edges) {
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
// #endregion

function bfs(s,al) {

    // Track distance of each node from start
    let levels = {};
    levels[s]=0;

    // Track the parent of each node from start
    let parents = {};
    parents[s]=null;

    // Track the nodes we have visited
    let frontier = [s];

    // Track the current level
    let i = 1;

    while(frontier && frontier.length>0)
    {
        // Track those nodes that will become a part of the next frontier
        let next = [];

        // Explore the nodes in the curent frontier
        for(let u of frontier) 
        {
            for(let v of al[u]) 
            {
                if(!levels.hasOwnProperty(v))
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
}


var tests = [
    new AdjacencyList(4, [[1,2],[1,3]]),
    new AdjacencyList(5,[[1,2],[1,3],[3,4]])
];

tests.forEach(t=> {
    let {levels:l,parents:p} = bfs(1,t);
    //let msg = `For testcase ${a},\nLevels = ${l}\n\n`;
    //let msg = "For testcase: "+a+",\nLevels = "+l+"}\n\n";
    console.log(t);
    console.log(l);
    console.log("----------------");
});





