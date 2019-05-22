
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
};

Heap.prototype.parent = function(i) { return Math.floor((i-1)/2);}
Heap.prototype.left = function(i) { return 2*i+1;}
Heap.prototype.right = function(i) { return 2*i+2;}

Heap.prototype.Delete = function() {};

Heap.prototype.ExtractMin() = function() {
	let L = this.list;
	let min = L.shift();
	for(let i = 0; i < L.length; )
	{
		let li = 2*i+1;
		let ri = 2*i+2;
		let mi = (L[li]<L[ri]) ? li : ri;
		if(L[mi]<L[i]) {
			[L[mi],L[i]] = [L[i],L[mi]];
			i=mi;
		} else {
			i = Infinity;
		}
	}
};

Heap.prototype.DecreaseKey(k) = function() {

};