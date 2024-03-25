// Function that return data from [min, max] to [0, 1]

const normalisation = (pointsArray) => {
    const normalizedArray = []

    const xMax = pointsArray.reduce((max, obj) => obj.x > max ? obj.x : max, pointsArray[0].x)
    const xMin = pointsArray.reduce((min, obj) => obj.x < min ? obj.x : min, pointsArray[0].x)

    const yMax = pointsArray.reduce((max, obj) => obj.y > max ? obj.y : max, pointsArray[0].y)
    const yMin = pointsArray.reduce((min, obj) => obj.y < min ? obj.y : min, pointsArray[0].y)

    for (let index = 0; index < pointsArray.length; index++) {
        const point = pointsArray[index];
        const xNew = (point.x - xMin) / (xMax - xMin)
        const yNew = (point.y - yMin) / (yMax - yMin)
        normalizedArray.push({x: xNew, y: yNew})
    }
    return {arry: normalizedArray, xmin: xMin, xmax: xMax, ymin: yMin, ymax: yMax}
}

module.exports = normalisation