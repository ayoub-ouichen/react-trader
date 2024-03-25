// Create function probableLine to :
// #00 This the base after that should i compared with other tools like (Moving Avereg, Fibonaci Retracement)
// #01 Find Linear equation of all two Max/Min points in chart

const probableLine = (pointsArray, pointX) => {
    const equationsArray = []
    for (let index = 0; index < pointsArray.length - 1; index++) {
        const i = Math.min(pointsArray.length, index + 1000)
        for (let index2 = index + 1; index2 < i; index2++) {
            
            // Trouver la pente m
            const x_zero = pointsArray[index2].x - pointsArray[index].x
            const y_zero = pointsArray[index2].y - pointsArray[index].y
            const m = y_zero/x_zero
            
            // Trouver la constante b
            const b = pointsArray[index].y - (m * pointsArray[index].x)

            const pointY = m * pointX + b

            equationsArray.push({
                point1: {x: pointsArray[index].x, y: pointsArray[index].y},
                point2: {x: pointX, y: pointY},
                pente: m,
                constante: b,
                troisemePoint: {x: pointsArray[index2].x, y: pointsArray[index2].y}
            })
        }
    }
    return equationsArray
}

module.exports = probableLine