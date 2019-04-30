
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
var AdjList = function(nodes,edges)
{
    for(let i=1;i<nodes;i++)
    {
        this[i] = [];
        for(let [u,v] of edges)
        {
            if(u===i) this[u].push(v);
            else if(v===i) this[v].push(u); 
        }
    }    
}
// #endregion

function BFS(s,adj)
{
    let levels = {};
    levels[s]=0;
    let parents = {};
    parents[s]=null;
    let frontier = [s];
    for(let i=1;frontier && frontier.length>0;i++)
    {
        let next = [];
        for(let u of frontier)
        {
            for(let v of adj[u])
            {
                if(levels[v]===undefined)
                {
                    levels[v]=i;
                    parents[v]=u;
                    next.push(v);
                }
            }
        }
        frontier=next;
    }
    return { levels,parents}
}



var tests = [
    new AdjList(4, [[1,2],[1,3]]),
    new AdjList(5,[[1,2],[1,3],[3,4]])
];

tests.forEach(t=> {
    let {levels:l,parents:p} = BFS(1,t);
    //let msg = `For testcase ${a},\nLevels = ${l}\n\n`;
    //let msg = "For testcase: "+a+",\nLevels = "+l+"}\n\n";
    console.log(t);
    console.log(l);
    console.log("----------------");
});





