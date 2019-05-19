'use strict';
var Queue = function()
{
    let me = this;
    me.list = new Array();
    me.enqueue = function(e) {me.list.pop(e)};
    me.enqueueRange = function(range) {me.list = [...list,...range]};
    me.dequeque = function(e) {return me.list.shift(e)};
}