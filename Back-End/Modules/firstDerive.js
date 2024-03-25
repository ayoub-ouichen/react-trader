// Function to calculate derivative using central differences

const calculateDerivative = (x, y) => {
    const n = x.length;
    const poitMax = [];
    const pointMin = [];


    for (let i = 1; i < n - 1; i++) {
        const dx1 = x[i] - x[i - 1];
        const dx2 = x[i + 1] - x[i];

        const dy1 = y[i] - y[i - 1];
        const dy2 = y[i + 1] - y[i];

        const d1 = dy1/dx1;
        const d2 = dy2/dx2;

        if(d1 > 0 && d2 < 0) {
            // en i on a un poit local max
            poitMax.push({point_x: i, point_y: y[i]})
        }

        if(d1 < 0 && d2 > 0) {
            // en i on a un poit local min
            pointMin.push({point_x: i, point_y: y[i]})
        }
    }

    return {max: poitMax, min: pointMin};
}

module.exports = calculateDerivative


