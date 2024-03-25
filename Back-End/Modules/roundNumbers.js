// Function that return round numbers

const roundNumbers = (high, low, pointX) => {
    const rndNumEqt = []
    var count = low
    while (count < high) {
        count += 0.50
        rndNumEqt.push({
            point1: {x: 0, y:count},
            point2: {x: pointX, y:count},
            troisemePoint: {x: 0, y: count}
        })
    }
    return rndNumEqt
}

module.exports = roundNumbers