import calculateDerivative from "./firstDerive";

// Function to calculate second derivative using central differences
const calculateSecondDerivative = (x, y) => {
    const firstDerivative = calculateDerivative(x, y);
    const n = x.length;
    const secondDerivative = [];

    // Calculate central differences for the interior points
    for (let i = 1; i < n - 1; i++) {
        const dx = x[i + 1] - x[i - 1];
        const dy = firstDerivative[i + 1] - firstDerivative[i - 1];
        secondDerivative.push(dy / dx);
    }

    // Handle boundary points with forward/backward differences
    const secondDerivativeFirst = (firstDerivative[1] - firstDerivative[0]) / (x[1] - x[0]);
    const secondDerivativeLast = (firstDerivative[n - 1] - firstDerivative[n - 2]) / (x[n - 1] - x[n - 2]);

    // Combine second derivatives
    //secondDerivative.unshift(secondDerivativeFirst);
    //secondDerivative.push(secondDerivativeLast);

    return secondDerivative;
}

module.exports = calculateSecondDerivative