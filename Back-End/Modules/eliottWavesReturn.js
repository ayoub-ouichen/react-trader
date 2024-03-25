// Function that find Eliott Waves Return 12345a/bc 

const eliottWavesReturn = (newPointsArray) => {
    const waves = []
    for (let index = 0; index < newPointsArray.length - 6; index++) {
        const point1 = newPointsArray[index];
        const point2 = newPointsArray[index + 1];
        const point3 = newPointsArray[index + 2];
        const point4 = newPointsArray[index + 3];
        const point5 = newPointsArray[index + 4];
        const point6 = newPointsArray[index + 5];
        const point7 = newPointsArray[index + 6];
        
        if (point1.type === 'min') {
            // Up Tendance
            if (point3.y > point1.y && point4.y > point2.y && point5.y > point3.y && point6.y > point4.y && point7.y < point6.y) {
                waves.push({
                    points : [
                        point1,
                        point2,
                        point3,
                        point4,
                        point5,
                        point6,
                        point7
                    ],
                    type: 'up'
                })
            }

        } else {
            // Down Tendance
            if (point3.y < point1.y && point4.y < point2.y && point5.y < point3.y && point6.y < point4.y && point7.y > point6.y) {
                waves.push({
                    points : [
                        point1,
                        point2,
                        point3,
                        point4,
                        point5,
                        point6,
                        point7
                    ],
                    type: 'down'
                })
            }
        }
    }
    return waves
}

module.exports = eliottWavesReturn