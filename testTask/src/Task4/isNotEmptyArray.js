/**
 * Checks if the provided parameter is a non-empty array.
 * @param {any} data - The data to check.
 * @returns {Array|boolean} - The original array if it is non-empty, otherwise false.
 */
function isNotEmptyArray(data) {
    return Array.isArray(data) && data.length > 0 ? data : false;
}


console.log(isNotEmptyArray([1, 2, 3]));
console.log(isNotEmptyArray([]));
console.log(isNotEmptyArray(null));
console.log(isNotEmptyArray("not an array"));