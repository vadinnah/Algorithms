'use strict';
var Queue = function()
{
    let me = this;
    me.list = new Array();
}

Queue.prototype.enqueue = function(e) {
    this.list.push(e)
};
Queue.prototype.enqueueRange = function(range) {
    this.list = [...this.list,...range]
};

Queue.prototype.dequeue = function() {
    let res = undefined;
    if(this.list.length>0) {
        res = this.list.shift();
    }
    return res;
};

var q = new Queue();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueueRange([4,5,6]);
