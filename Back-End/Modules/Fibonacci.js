// Fibonacci Ratio Retracement

const fibonacci = (point11, point22) => {
    const fiboRatio = []
    const ratio = [
        -0.618,
        -0.277,
        0.236,
        0.382,
        0.500,
        0.618,
        0.786
    ]

    const rationReverse = ratio.reverse()
    

    const diff = parseFloat(point11.y) - parseFloat(point22.y)
    var yStart = parseFloat(point22.y)
    var coefficient = 1
    // if (diff < 0) {
    //     coefficient = -1
    // } else {
    //     coefficient = 1
    // }

    if (Math.abs(diff) >= 0) {
        for (let index2 = rationReverse.length - 1; index2 >= 0; index2--) {
            const yRatio = coefficient * (rationReverse[index2] * diff) + yStart;
            fiboRatio.push({
                point1 :{
                    x: point11.x, y: yRatio
                },
                point2 :{
                    x: point22.x + 12, y: yRatio
                },
                ratio: rationReverse[index2],
                troisemePoint: {
                    x: point22.x,
                    y: yRatio
                },
                quatriemePoint: {
                    x: point22.x + 12,
                    y: yRatio
                }
            })
        }
    }

    return fiboRatio
}

module.exports = fibonacci