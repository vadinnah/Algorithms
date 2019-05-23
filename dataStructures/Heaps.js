
var Heap = function(lessComparer,moreComparer,equalComparer)
{
	this.list = []; 
	if(lessComparer && lessComparer instanceof Function) 
		this.isLess = lessComparer;
	if(moreComparer && moreComparer instanceof Function) 
		this.isMore = moreComparer;
	if(equalComparer && equalComparer instanceof Function) 
		this.isEqual = equalComparer
};

Heap.prototype.isLess = function(x,y) { return x < y; }
Heap.prototype.isMore = function(x,y) { return x > y; }
Heap.prototype.isEqual = function(x,y) { return x === y; }

Heap.prototype.Insert = function(x) {
	let {list:L,isLess:less} = this;
	L.push(x);
	if(L.length>1) {
		let i = L.length-1;
		let p = Math.floor((i-1)/2);
		while(p >= 0 && i >= 1 && less(L[i],L[p]))
		{
			[L[i],L[p]] = [L[p],L[i]];
			i = p;
			p = Math.floor((i-1)/2);
		}
	}
	console.log(this.list);
};

Heap.prototype.Delete = function(k) 
{
	let i = this.list.findIndex(k);
	if(i>=0) {
		this.list[i] = -Infinity;
	}
	if(L.length>1) {
		let p = Math.floor((i-1)/2);
		while(p >= 0 && i >= 1 && less(L[i],L[p]))
		{
			[L[i],L[p]] = [L[p],L[i]];
			i = p;
			p = Math.floor((i-1)/2);
		}
	}

	if(L[0]!==-Infinity)
		throw 'Heap.Delete(): Rebalance of heap failed.';

	this.list.shift();
};

Heap.prototype.ExtractMin = function() {

	if(this.list.length==0) {
		return null;
	}

	let {list:L,isLess:less} = this;

	let i = 0;
	//function p(){return Math.floor((i-1)/2);}
	function l(){return 2*i+1;}
	function r(){return 2*i+2;}
	function m() {
		if(l<L.length && r<L.length) return (less(L[l],L[r])) ? l : r;
		else if(r>L.length) return l ;
		else if(l>L.length) return r;
		else return Infinity;
		
	}
	
	let min = L.shift();
	while(i < L.length)
	{ 
		if(less(L[m],L[i])) {
			[L[m],L[i]] = [L[i],L[m]];
			i=m;
		} else {
			i = Infinity;
		}
	}
	return min;
};

Heap.prototype.ChangeKey = function(k,val) {
	let i = this.list.findIndex(k);
	if(i<0) {
		throw 'Heap.DecreaseKey(): Value not found.'
	}
	this.list[i] = val;
	function p(){return Math.floor((i-1)/2);}

	if(L.length>1) {
		while(p >= 0 && i >= 1 && less(L[i],L[p]))
		{
			[L[i],L[p]] = [L[p],L[i]];
			i = p;
		}
	}
	
	this.list.shift();
};

Heap.prototype.inorder()
{
	function p(){return Math.floor((i-1)/2);}
	function l(){return 2*i+1;}
	function r(){return 2*i+2;}
	let L = this.list;

	for(let i = 0; i < L.length;i++)
	{
		if(p >= 0 && isMore(L[p],L[i])) return false;		
		if(r < L.length && isLess(L[r],L[i])) return false;
		if(l < L.length && isLess(L[l],L[i])) return false;
	}
	return true;
}

var h = new Heap();
for(let n of [2,4,14,33,7,5,6,9,1,100,17]) {
	h.Insert(n);
}
console.log('--Extracting--');
h.ExtractMin();
h.ExtractMin();
h.ExtractMin();
h.ExtractMin();
