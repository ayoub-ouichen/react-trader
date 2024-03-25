// Function to delete double Lines

const angleTwoLines = require('./angleTwoLines')

function removeDuplicatesAry(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
}

function removeDuplicatesObj(array, key) {
    return array.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t[key] === item[key]
        ))
    );
}

const lineDouble = (lineArray) => {
    const uniqueLine = []
    const pointsX1 = lineArray.map(v => v.point1.x)
    const pointsX2 = removeDuplicatesAry(pointsX1)
    for (let index = 0; index < pointsX2.length; index++) {
        const pointX = pointsX2[index];
        const lines = lineArray.filter(value => value.point1.x === pointX)
        const linesDistence = lines.map((v, i) => {return {lineIndex: i, distence: v.point2.x - v.point1.x}})
        const linesDistence2 = removeDuplicatesObj(linesDistence, 'distence')
        const linesAngle = lines.map((v, i) => {return {lineIndex: i, angle: Math.round(angleTwoLines({pente: 0}, v).rad)}})
        const linesAngle2 = removeDuplicatesObj(linesAngle, 'angle')

        /////////////////////////////////////////////////////////////////////
        const dlines = linesDistence2.map(v => v.lineIndex)
        const alines = linesAngle2.map(v => v.lineIndex)

        for (let i = 0; i < dlines.length; i++) {
            for (let j = 0; j < alines.length; j++) {
                if (dlines[i] === alines[j]) {
                    uniqueLine.push(lines[dlines[i]])
                    break;
                }
            }
        }
    }
    return uniqueLine
}

module.exports = lineDouble
