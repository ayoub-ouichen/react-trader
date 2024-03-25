// Function that find Eliott Waves initialization 123/45 

const eliottWaves = (newPointsArray) => {
    const waves = []
    for (let index = 0; index < newPointsArray.length - 3; index++) {
        const point1 = newPointsArray[index];
        const point2 = newPointsArray[index + 1];
        const point3 = newPointsArray[index + 2];
        const point4 = newPointsArray[index + 3];
        
        if (point1.type === 'min') {
            // Up Tendance
            if (point3.y > point1.y && point4.y > point2.y) {
                waves.push({
                    points : [
                        point1,
                        point2,
                        point3,
                        point4
                    ],
                    type: 'up'
                })
            }

        } else {
            // Down Tendance
            if (point3.y < point1.y && point4.y < point2.y) {
                waves.push({
                    points : [
                        point1,
                        point2,
                        point3,
                        point4
                    ],
                    type: 'down'
                })
            }
        }
    }
    return waves
}

module.exports = eliottWaves