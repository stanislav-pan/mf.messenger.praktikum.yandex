function partition(arr, start = 0, end = arr.length - 1) {
    const pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
        if (arr[i] <= pivotValue) {
            swap(arr, i, pivotIndex);
            pivotIndex += 1;
        }
    }

    swap(arr, pivotIndex, end);

    return pivotIndex;
}

function swap(arr, i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

const arr = [6,5,3,1,8,7,2,4];

const res = partition(arr);
console.log(res);

debugger

// window.location.href = `${window.location.origin}/static/messanger.html`;
