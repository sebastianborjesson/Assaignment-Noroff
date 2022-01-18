function getLength (array) {
    let counter = 0;
    for (let index = 0; index < array.length; index++) {
        if (array[index].length) {
            counter += getLength(array[index]);
        } else {
            counter++;
        }
    }
    return counter;
}

console.log(getLength([1, [2, 3]]));
console.log(getLength([1, [2, [3, 4]]]));
console.log(getLength([1, [2, [3, [4, [5, 6]]]]]));
console.log(getLength([1, [2], 1, [2], 1]));
console.log(getLength([]));