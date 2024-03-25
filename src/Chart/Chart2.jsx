var lf_lines2 = []
var zone = []
var nPoints2 = []
var horizontal_line = []
var sumPointPerLine2 = []
var rndNumEqtion = []
var wavesReturn = []
var fiboREWR = []
var waves = []
var fiboREW = []
var smaData20 = []
var smaData50 = []
var smaData100 = []
var smaData200 = []
var upTrendLines = []
var downTrendLines = []
var upTrend = []
var probableUpTrends = []
var downTrend = []
var probableDownTrends = []
var probable_line_data = []
var newPointsArray = []
var pointsMaxArry = []
var pointsMinArry = []
var pointsArry = []
var midleMargin = []
var maxPrice = []
var minPrice = []
var incertitude = []
var pointMax = []
var pointMin = []
var data = []
var dataCopy = []
var dataMargin = []
var margin = []
var upTrends = []
var downTrends = []

fetchPrice({data: ''})
const api_price = data_Price
data = api_price.price;
pointMax = api_price.pointsMax;
pointMin = api_price.pointsMin;
maxPrice = api_price.maxPrice;
minPrice = api_price.minPrice;
pointsMaxArry = api_price.pointsMaxArry; 
pointsMinArry = api_price.pointsMinArry; 
pointsArry = api_price.pointsArry; 

incertitude = 0.001

dataCopy = data.map((value, index) => index)
margin = 20
dataMargin = []

// Fill dataMargin by additional index to add margin in front price index
for (let index = 1; index <= margin; index++) {
    dataMargin.push(dataCopy[dataCopy.length - 1] + index)
}

// Calculate the midle index in dataMargin
const midleMarginIndex = dataMargin.length/2
midleMargin = dataMargin[Math.floor(midleMarginIndex)] 

fetchSuiteMaxMin({pointsArry: pointsArry})
newPointsArray = data_SuiteMaxMin.suiteMaxMin

fetchProbableLine({pointsArray: pointsArry,pointX: midleMargin})
probable_line_data = data_ProbableLine.lines

fetchTrendLines({pointsArray: pointsMaxArry, pointX: midleMargin, incertitude: incertitude})
upTrends = data_TrendLines.lines

fetchProbableLine({pointsArray: pointsMaxArry,pointX: midleMargin})
probableUpTrends = data_ProbableLine.lines

////// Up Trends
upTrend = upTrends.filter(predicate => predicate.type === 'up')
upTrendLines = []
for (let index = 0; index < upTrend.length; index++) {
    const trend_line = upTrend[index]
    const lineData = probableUpTrends[trend_line.line]
    upTrendLines.push({
        point1: lineData.point1,
        point2: lineData.point2,
        troisemePoint: trend_line.troisemePoint,
        pente: lineData.pente,
        constante: lineData.constante,
        delta: trend_line.delta
    })
}

fetchTrendLines({pointsArray: pointsMinArry, pointX: midleMargin, incertitude: incertitude})
downTrends = data_TrendLines.lines

fetchProbableLine({pointsArray: pointsMinArry,pointX: midleMargin})
probableDownTrends = data_ProbableLine.lines

////// Down Trends
downTrend = downTrends.filter(predicate => predicate.type === 'down')
downTrendLines = []
for (let index = 0; index < downTrend.length; index++) {
    const trend_line = downTrend[index]
    const lineData = probableDownTrends[trend_line.line]
    downTrendLines.push({
        point1: lineData.point1,
        point2: lineData.point2,
        troisemePoint: trend_line.troisemePoint
    })
}

// SIMPLE MOVING AVREGE
fetchSMA({data: data})
const smaData = data_SMA
smaData20 = smaData.sma20
smaData50 = smaData.sma50
smaData100 = smaData.sma100
smaData200 = smaData.sma200


// Eliott Waves
fetchEliottWaves({newPointsArray: newPointsArray})
waves = data_EliottWaves.waves
var fiboRatioEW = []
fiboREW = []
for (let index = 0; index < waves.length; index++) {
    const wave = waves[index];
    fetchFibonacci({
        point11: wave.points[2],
        point22: wave.points[3]
    })

    fiboRatioEW[index] = data_Fibonacci.fiboRatio
    for (let index2 = 0; index2 < fiboRatioEW[index].length; index2++) {
        const element = fiboRatioEW[index][index2];
        fiboREW.push(element)
    }
}

// Eliott Waves 12345a/bc
fetchEliottWavesR({newPointsArray: newPointsArray})
wavesReturn = data_EliottWavesR.wavesR
var fiboRatioEWR = []
fiboREWR = []
for (let index = 0; index < wavesReturn.length; index++) {
    const waveReturn = wavesReturn[index];
    fetchFibonacci({
        point11: waveReturn.points[5],
        point22: waveReturn.points[6]
    })
    fiboRatioEWR[index] = data_Fibonacci.fiboRatio
    for (let index2 = 0; index2 < fiboRatioEWR[index].length; index2++) {
        const element = fiboRatioEWR[index][index2];
        fiboREWR.push(element)
    }
}



// Draw Round Numbers
const highNumber = Math.ceil(maxPrice)
const lowNumber = Math.floor(minPrice)
fetchRoundNumbers({
    highNumber: highNumber,
    lowNumber: lowNumber,
    pointX: midleMargin
})
rndNumEqtion = data_RoundNumbers.lines

// Draw Horizontal Level Price
nPoints2 = 1 // n(i) = 1 + p(i) ---> 3n = 1 + 3point = 4 point --- 3n = 4point
horizontal_line = probable_line_data.filter(predicate => Math.abs(predicate.pente) <= incertitude)
fetchPointsPerLine({
    equationsArray: horizontal_line,
    pointsArray: pointsArry,
    incertitude: incertitude
})
const lineCategory2 = data_PointsPerLine.points
fetchLineByPoints({
    linePoints: lineCategory2
})
sumPointPerLine2 = data_LineByPoints.pointGroup



// Draw Correlation Zone
const tech_indicators = [
    horizontal_line,
    rndNumEqtion,     
    fiboREWR,      
    fiboREW,               
    upTrendLines,   
    downTrendLines        
]
const sma_indicators = {
    smaData200: smaData200,            
    smaData100: smaData100,            
    smaData50: smaData50,            
    smaData20: smaData20  
}
fetchCorrelationZone({
    indicators: tech_indicators,
    ma: sma_indicators,
    lastpointX: midleMargin,
    delta: 0.2,
    paraime: 3
})
zone = data_CorrelationZone.zone

// Draw Last Contact point OR First break point of line by price

fetchProTrends({
    priceData: data,
    linearEquations: upTrendLines,
    incertitude: incertitude,
    lastX: midleMargin
})
const lf_lines = data_ProTrends.lines
fetchLineDouble({
    linesArray: lf_lines
})
lf_lines2 = data_LineDouble.lines


