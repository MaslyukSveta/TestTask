/**
 * Calculates the area of a triangle using Heron's formula, given the lengths of its sides.
 * Returns a fixed value if the side lengths do not form a valid triangle.
 *
 * @param {number} a - The length of the first side of the triangle.
 * @param {number} b - The length of the second side of the triangle.
 * @param {number} c - The length of the third side of the triangle.
 * @returns {number} The area of the triangle rounded to two decimal places, or -1 if the triangle is not valid.
 */
const getTriangleValue = (a, b, c) => {


    if (![a, b, c].every(side => Number.isFinite(side))) {
        return -1;
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
        return -1;
    }

    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));


    return Number(area.toFixed(2));
};


console.log(`Area of triangle: ${getTriangleValue(3, 4, 5)}`);
