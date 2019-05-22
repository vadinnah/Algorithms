
var Heap = function()
{
	this.list = [];
};

Heap.prototype.Insert = function(x) {
	let L = this.list;
	L.push(x);
	if(L.length>1) {
		let i = L.length-1;
		let p = Math.floor((i-1)/2);
		while(p >= 0 && i >= 1 && L[i]<L[p])
		{
			[L[i],L[p]] = [L[p],L[i]];
			i = p;
			p = Math.floor((i-1)/2);
		}
	}
	console.log(this.list);
};

Heap.prototype.parent = function(i) { return Math.floor((i-1)/2);}
Heap.prototype.left = function(i) { return 2*i+1;}
Heap.prototype.right = function(i) { return 2*i+2;}

Heap.prototype.Delete = function() {};

Heap.prototype.ExtractMin = function() {
	let i = 0;
	//function p(){return Math.floor((i-1)/2);}
	function l(){return 2*i+1;}
	function r(){return 2*i+2;}
	function m() {
		if(l<L.length && r<L.length) return (L[l]<L[r]) ? l : r;
		else if(r>L.length) return l ;
		else if(l>L.length) return r;
		else return Infinity;
		
	}
	let L = this.list;
	let min = L.shift();
	while(i < L.length)
	{ 
		if(L[m]<L[i]) {
			[L[m],L[i]] = [L[i],L[m]];
			i=m;
		} else {
			i = Infinity;
		}
	}
	console.log([min, this.list]);
	return min;
};

Heap.prototype.DecreaseKey = function(k) {

};

var h = new Heap();
for(let n of [2,4,14,33,7,5,6,9,1,100,17]) {
	h.Insert(n);
}
console.log('--Extracting--');
h.ExtractMin();
h.ExtractMin();
h.ExtractMin();
h.ExtractMin();
