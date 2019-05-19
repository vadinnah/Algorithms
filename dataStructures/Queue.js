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
