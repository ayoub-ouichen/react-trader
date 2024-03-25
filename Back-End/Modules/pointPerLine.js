// Create function isPointsInSameLine to :
// #00 Increase probableLine() validation
// #01 Trace upTrend : Finding line that contien 3 Max points or more (input Max point only)
// #02 Trace downTrend : Finding line that contien 3 Max points or more (input Min point only)
// #03 Trace KeyLevel : Finding line that contien 3 Max/Min points or more


const pointPerLine = (equationsArray, pointsArray, incertitude) => {
    const linePoints = []

    for (let index = 0; index < equationsArray.length; index++) {
        const lineEquation = equationsArray[index];
        for (let index2 = 0; index2 < pointsArray.length; index2++) {
            const point = pointsArray[index2];
            if (lineEquation.point1.x < point.x) {
                const a = Math.abs((-1 * point.y) + (lineEquation.pente * point.x) + lineEquation.constante)
                const b = Math.sqrt(1 + Math.pow(lineEquation.constante, 2))
                const delat = a/b
                if (delat <= incertitude) {
                    linePoints.push({lineIndex: index, pointIndex: index2, delta: delat})
                }
            }
        }
    }
    return linePoints
}

module.exports = pointPerLine

