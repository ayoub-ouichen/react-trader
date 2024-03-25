const calculateDerivative = require('./Modules/firstDerive')
const correlationZone = require('./Modules/correlationZone')
const deleteMaxMinSuite = require('./Modules/deleteMaxMinSuite')
const eliottWaves = require('./Modules/eliottWaves')
const eliottWavesReturn = require('./Modules/eliottWavesReturn')
const fibonacci = require('./Modules/Fibonacci')
const lineDouble = require('./Modules/lineDouble')
const lineGroupByPoint = require('./Modules/lineGroupByPoint')
const pointPerLine = require('./Modules/pointPerLine')
const probableLine = require('./Modules/probableLine')
const proTrends = require('./Modules/ProTrends')
const roundNumbers = require('./Modules/roundNumbers')
const sma = require('./Modules/sma')
const trendlines = require('./Modules/trendLines')
const jsonData = require('./data.json')

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
var fiboRatioEWR = []
var fiboRatioEW = []

function getHighPrice(d) {
    var maxPrice = 0.00
    d.forEach((value, index) => {
        value['2. high'] - maxPrice > 0 ? maxPrice = value['2. high'] : null
    })
    return maxPrice
}

function getLowPrice(d) {
    var minPrice = 1000000
    d.forEach((value, index) => {
        value['3. low'] < minPrice ? minPrice = value['3. low'] : null
    })
    return minPrice
}

const mainCalcule = (date_debut, date_fin) => {
    const dataArray = Object
                            .entries(jsonData)
                            .map(([date, values]) => ({ date, ...values }))
                            .filter(predicate => predicate.date >= date_debut)
                            .filter(predicate => predicate.date <= date_fin)

    let x = dataArray.map((value, index) => index)
    let yHigh = dataArray.map((value, index) => value['2. high'])
    let yLow = dataArray.map((value, index) => value['3. low'])
    pointMax = calculateDerivative(x, yHigh.reverse())
    pointMin = calculateDerivative(x, yLow.reverse())
    maxPrice = parseFloat(getHighPrice(dataArray)) + 1
    minPrice = parseFloat(getLowPrice(dataArray)) - 2
    pointsMaxArry = pointMax.max.map(value => { return {x: value.point_x, y: value.point_y, type: 'max'} })
    pointsMinArry = pointMin.min.map(value => { return {x: value.point_x, y: value.point_y, type: 'min'} })
    pointsArry = [...pointsMinArry, ...pointsMaxArry]
    pointsArry.sort((a, b) => a.x - b.x)

    data = dataArray.reverse()

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

    newPointsArray = deleteMaxMinSuite(pointsArry)

    probable_line_data = probableLine(pointsArry, midleMargin) 

    upTrends = trendlines(pointsMaxArry, midleMargin, incertitude)

    probableUpTrends = probableLine(pointsMaxArry, midleMargin)

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

    downTrends = trendlines(pointsMinArry, midleMargin, incertitude)

    probableDownTrends = probableLine(pointsMinArry, midleMargin)

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

    smaData20 = sma(data, 20)
    smaData50 = sma(data, 50)
    smaData100 = sma(data, 100)
    smaData200 = sma(data, 200)


    // Eliott Waves
    waves = eliottWaves(newPointsArray)
    fiboREW = []
    for (let index = 0; index < waves.length; index++) {
        const wave = waves[index];
        fiboRatioEW[index] =  fibonacci(wave.points[2], wave.points[3])
        for (let index2 = 0; index2 < fiboRatioEW[index].length; index2++) {
            const element = fiboRatioEW[index][index2];
            fiboREW.push(element)
        }
    }

    // Eliott Waves 12345a/bc
    wavesReturn = eliottWavesReturn(newPointsArray)
    fiboREWR = []
    for (let index = 0; index < wavesReturn.length; index++) {
        const waveReturn = wavesReturn[index];
        fiboRatioEWR[index] = fibonacci(waveReturn.points[5], waveReturn.points[6])
        for (let index2 = 0; index2 < fiboRatioEWR[index].length; index2++) {
            const element = fiboRatioEWR[index][index2];
            fiboREWR.push(element)
        }
    }

    // Draw Round Numbers
    const highNumber = Math.ceil(maxPrice)
    const lowNumber = Math.floor(minPrice)
    rndNumEqtion = roundNumbers(highNumber,lowNumber,midleMargin)

    // Draw Horizontal Level Price
    nPoints2 = 1 // n(i) = 1 + p(i) ---> 3n = 1 + 3point = 4 point --- 3n = 4point
    horizontal_line = probable_line_data.filter(predicate => Math.abs(predicate.pente) <= incertitude)

    const lineCategory2 = pointPerLine(horizontal_line, pointsArry, incertitude)
    sumPointPerLine2 = lineGroupByPoint(lineCategory2)



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

    zone = correlationZone(tech_indicators, sma_indicators, midleMargin, 0.2, 3)

    // Draw Last Contact point OR First break point of line by price
    const lf_lines = proTrends(data,upTrendLines,incertitude,midleMargin)
    lf_lines2 = lineDouble(lf_lines)

    //const lineCategory3 = pointPerLine(lf_lines2, pointsArry, incertitude)
    
    return {
        lf_lines2: lf_lines2,
        zone: zone,
        nPoints2: nPoints2,
        horizontal_line: horizontal_line,
        sumPointPerLine2: sumPointPerLine2,
        rndNumEqtion: rndNumEqtion,
        wavesReturn: wavesReturn,
        fiboREWR: fiboREWR,
        waves: waves,
        fiboREW: fiboREW,
        smaData20: smaData20,
        smaData50: smaData50,
        smaData100: smaData100,
        smaData200: smaData200,
        upTrendLines: upTrendLines,
        downTrendLines: downTrendLines,
        upTrend: upTrend,
        probableUpTrends: probableUpTrends,
        downTrend: downTrend,
        probableDownTrends: probableDownTrends,
        probable_line_data: probable_line_data,
        newPointsArray: newPointsArray,
        pointsMaxArry: pointsMaxArry,
        pointsMinArry: pointsMinArry,
        pointsArry: pointsArry,
        midleMargin: midleMargin,
        maxPrice: maxPrice,
        minPrice: minPrice,
        incertitude: incertitude,
        pointMax: pointMax,
        pointMin: pointMin,
        data: data,
        dataCopy: dataCopy,
        dataMargin: dataMargin,
        margin: margin,
        upTrends: upTrends,
        downTrends: downTrends,
        fiboRatioEWR: fiboRatioEWR,
        fiboRatioEW: fiboRatioEW
        //,lineCategory3: lineCategory3
    }
}

module.exports = mainCalcule