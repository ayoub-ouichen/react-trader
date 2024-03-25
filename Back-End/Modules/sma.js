// Simple Moving Average

const sma = (data, unit) => {
    const firstStep = unit - 1
    const smaData = []
    for (let index = firstStep; index < data.length; index++) {
        var sum = 0
        for (let index2 = index; index2 >= index - firstStep; index2--) {
            sum = sum + parseFloat(data[index2]['4. close']);
        }

        const averagePrice = (sum/unit)
        smaData.push({x: index, y: averagePrice})
    }
    return smaData
}

module.exports = sma