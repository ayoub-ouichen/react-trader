// Find intersection of Technical Indicators

const linearEquation = require('./LinearEquation')

const correlationZone = (indicators, ma, lastpointX, delta, paraime) => {
    const intersection = []
    // Boucler les Indicateurs
    for (let index2 = 0; index2 < indicators.length; index2++) {
        var indicator = indicators[index2]
        // Boucler les Donnees d'indicateur 
        for (let index3 = 0; index3 < indicator.length; index3++) {
            var indcatorData = indicator[index3];
            // Boucler les X
            for (let x = indcatorData.troisemePoint.x + 1; x <= lastpointX; x++) {
                if ("quatriemePoint" in indcatorData) {
                    if (x <= indcatorData.quatriemePoint.x) {
                        var y = linearEquation(indcatorData.point1, indcatorData.point2, x)
                        intersection.push({
                            indicator: index2,
                            x: x,
                            y: y
                        })
                    }
                } else {
                    var y = linearEquation(indcatorData.point1, indcatorData.point2, x)
                    intersection.push({
                        indicator: index2,
                        x: x,
                        y: y
                    })
                }
            }
        }
    }

    // Adding Moving Avrege
    for (let index = 0; index < ma.smaData20.length; index++) {
        const element = ma.smaData20[index];
        intersection.push({
            indicator: indicators.length,
            x: element.x,
            y: element.y
        })
    }
    
    for (let index = 0; index < ma.smaData50.length; index++) {
        const element = ma.smaData50[index];
        intersection.push({
            indicator: indicators.length + 1,
            x: element.x,
            y: element.y
        })
    }
    
    for (let index = 0; index < ma.smaData100.length; index++) {
        const element = ma.smaData100[index];
        intersection.push({
            indicator: indicators.length + 2,
            x: element.x,
            y: element.y
        })
    }
    
    for (let index = 0; index < ma.smaData200.length; index++) {
        const element = ma.smaData200[index];
        intersection.push({
            indicator: indicators.length + 3,
            x: element.x,
            y: element.y
        })
    }

    // Bloucler tout les X
    const yUnion = []
    for (let x = 0; x <= lastpointX; x++) {
        const GROUP_Y_BY_X = intersection.filter(predicate => predicate.x === x)
        for (let index = 0; index < GROUP_Y_BY_X.length; index++) {
            const y1 = GROUP_Y_BY_X[index];
            const count = []
            for (let index2 = 0; index2 < GROUP_Y_BY_X.length; index2++) {
                const y2 = GROUP_Y_BY_X[index2];
                let diff = Math.abs(y1.y - y2.y)
                if (diff <= delta && y1.indicator !== y2.indicator && !count.includes(y2.indicator)) {
                    count.push(y2.indicator)
                }
            }
            count.push(y1.indicator)
            if (count.length >= paraime) {
                yUnion.push(y1)
            }
        }
    }
    return yUnion
}

module.exports = correlationZone