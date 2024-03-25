// That function calculate the angle between two Lines

const angleTwoLines = (line1, line2) => {
    const angleTan = (line2.pente - line1.pente)/(1 + (line2.pente * line1.pente))
    const angleRadian = Math.atan(angleTan)
    const angleDegree = angleRadian * (180 / Math.PI)
    return {rad: angleRadian, deg: angleDegree}
}

module.exports = angleTwoLines