
function QuickSort() {

}

function HeapSort() {

}

function BinarySort() {

}

function BubbleSort(L) {
    for(let i=1;i<L.length;i++) {
        if(L[i]<L[i-1]) {
            [L[i],L[i-1]] = [L[i-1],L[i]];
            i=0;
        }
    }
    return L;
}

function swap(x,y) {
    return [y,x];
}

module.exports = {
    BubbleSort
};