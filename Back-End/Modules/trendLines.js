    // Function that verify if line that contain 3 points have not been breaked

const lineGroupByPoint = require('./lineGroupByPoint');
const pointPerLine = require('./pointPerLine');
const probableLine = require('./probableLine');
    
const trendlines = (pointsArray, pointX, incertitude) => {
    const allLines = probableLine(pointsArray, pointX)
    const point_per_line = pointPerLine(allLines, pointsArray, incertitude)
    const points_per_line = lineGroupByPoint(point_per_line)
    const trends = []

    for (let index = 0; index < points_per_line.length; index++) {
        if (points_per_line[index].points >= 2) {
            var upLineBreakd = false
            var downLineBreakd = false
            const lineIndex = points_per_line[index].line
            const lineEquation = allLines[lineIndex]
            const pointsIndex = point_per_line.filter(predicate => predicate.lineIndex === lineIndex)
            const troisemePoint = pointsArray[pointsIndex[1].pointIndex]
            const premierePoint = lineEquation.point1

            for (let index2 = 0; index2 < pointsArray.length; index2++) {
                const pointLoop = pointsArray[index2]
                if (pointLoop.x < troisemePoint.x && pointLoop.x > premierePoint.x) {

                    const yLine = lineEquation.pente * pointLoop.x + lineEquation.constante
                    const diffY = yLine - pointLoop.y

                    const a = Math.abs((-1 * pointLoop.y) + (lineEquation.pente * pointLoop.x) + lineEquation.constante)
                    const b = Math.sqrt(1 + Math.pow(lineEquation.constante, 2))
                    const deltaY = a/b

                    if (diffY < 0 && deltaY >= incertitude) { // delta = yLine - pointLoop.y > 0
                        upLineBreakd = true
                    }

                    if (diffY > 0 && deltaY >= incertitude) { // delta = yLine - pointLoop.y < 0
                        downLineBreakd = true
                    }
                }
            }
            if (upLineBreakd === false) {
                trends.push({line: index, type: 'up', troisemePoint: troisemePoint, delta: pointsIndex[1].delta})
            }
            if (downLineBreakd === false) {
                trends.push({line: index, type: 'down', troisemePoint: troisemePoint, delta: pointsIndex[1].delta})
            }
        } 
        
    }
    return trends
}

module.exports = trendlines














































































































































{/*
    // Function that verify if line that contain 3 points have not been breaked

import lineGroupByPoint from "./lineGroupByPoint";
import pointPerLine from "./pointPerLine";
import probableLine from "./probableLine";

export default function trendlines(pointsArray, pointX, incertitude) {
    const allLines = probableLine(pointsArray, pointX)
    const point_per_line = pointPerLine(allLines, pointsArray, incertitude)
    const points_per_line = lineGroupByPoint(point_per_line)
    const trends = []

    for (let index = 0; index < points_per_line.length; index++) {
        if (points_per_line[index].points >= 2) {
            var upLineBreakd = false
            var downLineBreakd = false
            const lineIndex = points_per_line[index].line
            const lineEquation = allLines[lineIndex]
            const pointsIndex = point_per_line.filter(predicate => predicate.lineIndex === lineIndex)
            const troisemePoint = pointsArray[pointsIndex[1].pointIndex]
            const premierePoint = lineEquation.point1

            for (let index2 = 0; index2 < pointsArray.length; index2++) {
                const pointLoop = pointsArray[index2]
                if (pointLoop.x < troisemePoint.x && pointLoop.x > premierePoint.x) {

                    const yLine = lineEquation.pente * pointLoop.x + lineEquation.constante
                    const diffY = yLine - pointLoop.y

                    const a = Math.abs((-1 * pointLoop.y) + (lineEquation.pente * pointLoop.x) + lineEquation.constante)
                    const b = Math.sqrt(1 + Math.pow(lineEquation.constante, 2))
                    const deltaY = a/b

                    if (diffY < 0 && deltaY >= incertitude) { // delta = yLine - pointLoop.y > 0
                        upLineBreakd = true
                    }

                    if (diffY > 0 && deltaY >= incertitude) { // delta = yLine - pointLoop.y < 0
                        downLineBreakd = true
                    }
                }
            }
            if (upLineBreakd === false) {
                trends.push({line: index, type: 'up', troisemePoint: troisemePoint})
            }
            if (downLineBreakd === false) {
                trends.push({line: index, type: 'down', troisemePoint: troisemePoint})
            }
        } 
        
    }
    return trends
}
*/}