
/**
 * Special thanks to https://www.mathblog.dk/disjoint-set-data-structure/
 * @param {*} V 
 */
var DisjointSet = function(V) {
    this.Parent = {};
    this.Rank = {};
    this.Count = 0;

    if(V instanceof Array) {
        this.Count = V.length;
        for(let v of V) {
            this.Parent[v] = v;
            this.Rank[v] = 0;
        }
    } else {
        this.Count = V;
        for(let v=1;v<=V;v++) {
            this.Parent[v] = v;
            this.Rank[v] = 0;
        }
    }  
}

DisjointSet.prototype.Find = function(v) {
    let r = this.Parent[v];
    let t = v;
    while(r!==t) {
        t = r;
        r = this.Parent[t];
    }
    this.Parent[v]=r;
    return r;
}

DisjointSet.prototype.Union = function(u,v) {
    let uSet = this.Find(u);
    let vSet = this.Find(v);
    let rankOfUSet = this.Rank[u];
    let rankOfVSet = this.Rank[v];

    if(uSet===vSet) {
        return;
    }

    if(rankOfUSet<rankOfVSet) {
        this.Parent[uSet]=vSet;
    }
    else if(rankOfVSet<rankOfUSet) {
        this.Parent[vSet]=uSet;
    }
    else {
        this.Parent[uSet]=vSet;
        this.Rank[vSet]++;
    }
}

module.exports = DisjointSet;