// Function that return Last Contact point OR First break point of line by price

const linearEquation = require('./LinearEquation')

const proTrends = (priceData, linearEquations, incertitude, lastX) => {
    const points = []
    for (let index = 0; index < linearEquations.length; index++) {
        const line = linearEquations[index]
        for (let x = line.point1.x; x < priceData.length; x++) {
            const price = priceData[x];
            const y = linearEquation(line.point1, line.point2, x)
            const diff = y - parseFloat(price['2. high'])

            const a = Math.abs((-1 * parseFloat(price['2. high'])) + (line.pente * x) + line.constante)
            const b = Math.sqrt(1 + Math.pow(line.constante, 2))
            const deltaY = a/b

            if (diff < 0 && deltaY >= incertitude * 3) {
                points.push({
                    point1: line.point1,
                    point2: {x: x, y: y},
                    pente: line.pente,
                    constante: line.constante,
                    delta: line.delta
                })
                break;
            }
        }
        
    }
    for (let index = 0; index < linearEquations.length; index++) {
        const line = linearEquations[index]
        var breaked = false
        for (let x = line.point1.x; x < priceData.length; x++) {
            const price = priceData[x];
            const y = linearEquation(line.point1, line.point2, x)
            const diff = y - parseFloat(price['2. high'])

            const a = Math.abs((-1 * parseFloat(price['2. high'])) + (line.pente * x) + line.constante)
            const b = Math.sqrt(1 + Math.pow(line.constante, 2))
            const deltaY = a/b

            if (diff < 0 && deltaY >= incertitude * 3) {
                breaked = true
            }
        }
        if (breaked == false) {
            let lastY = linearEquation(line.point1, line.point2, lastX)
            points.push({
                point1: line.point1,
                point2: {x: lastX, y: lastY},
                pente: line.pente,
                constante: line.constante,
                delta: line.delta
            })
        }
    }
    return points
}

module.exports = proTrends