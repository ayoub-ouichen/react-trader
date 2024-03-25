import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { 
    select, 
    axisBottom, 
    axisRight, 
    scaleLinear, 
    scaleBand, 
    zoom
} from 'd3'
import * as d3 from 'd3'
import mainDraw from '../mainDraw'

import { 
    fetchPrice,
    fetchSuiteMaxMin,
    fetchProbableLine,
    fetchTrendLines,
    fetchSMA,
    fetchEliottWaves,
    fetchFibonacci,
    fetchEliottWavesR,
    fetchRoundNumbers,
    fetchPointsPerLine,
    fetchLineByPoints,
    fetchCorrelationZone,
    fetchProTrends,
    fetchLineDouble,
    getPrice,
    getSuiteMaxMin,
    getProbableLine,
    getTrendLines,
    getSMA,
    getEliottWaves,
    getFibonacci,
    getEliottWavesR,
    getRoundNumbers,
    getPointsPerLine,
    getLineByPoints,
    getCorrelationZone,
    getProTrends,
    getLineDouble,
    getPriceStatus,
    getSuiteMaxMinStatus,
    getProbableLineStatus,
    getTrendLinesStatus,
    getSMAStatus,
    getEliottWavesStatus,
    getFibonacciStatus,
    getEliottWavesRStatus,
    getRoundNumbersStatus,
    getPointsPerLineStatus,
    getLineByPointsStatus,
    getCorrelationZoneStatus,
    getProTrendsStatus,
    getLineDoubleStatus
 } from "../featuers/dataFlowSlice";

const useResizeObserver = (ref) => {
    const [dimonsions, setDimonsions] = useState(null)
    useEffect(() => {
      const observerTarget = ref.current
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
            setDimonsions(entry.contentRect)
        })
      })
      resizeObserver.observe(observerTarget)
      return () => {
        resizeObserver.unobserve(observerTarget)
      }
    }, [ref])
    return dimonsions
}

export default function Chart({ c }) {
    const checkBox = !c ? [] : c;
    const wrapperRef = useRef()
    const dimonsions = useResizeObserver(wrapperRef)
    const svgRef = useRef();


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


    const PriceStatus = useSelector(getPriceStatus)
    const SuiteMaxMinStatus = useSelector(getSuiteMaxMinStatus)
    const ProbableLineStatus = useSelector(getProbableLineStatus)
    const TrendLinesStatus = useSelector(getTrendLinesStatus)
    const SMAStatus = useSelector(getSMAStatus)
    const EliottWavesStatus = useSelector(getEliottWavesStatus)
    const FibonacciStatus = useSelector(getFibonacciStatus)
    const EliottWavesRStatus = useSelector(getEliottWavesRStatus)
    const RoundNumbersStatus = useSelector(getRoundNumbersStatus)
    const PointsPerLineStatus = useSelector(getPointsPerLineStatus)
    const LineByPointsStatus = useSelector(getLineByPointsStatus)
    const CorrelationZoneStatus = useSelector(getCorrelationZoneStatus)
    const ProTrendsStatus = useSelector(getProTrendsStatus)
    const LineDoubleStatus = useSelector(getLineDoubleStatus)


    function allSucceded() {
        let count = true
        PriceStatus === 'succeeded' ? null : count = false
        SuiteMaxMinStatus === 'succeeded' ? null : count = false
        ProbableLineStatus === 'succeeded' ? null : count = false
        TrendLinesStatus === 'succeeded' ? null : count = false
        SMAStatus === 'succeeded' ? null : count = false
        EliottWavesStatus === 'succeeded' ? null : count = false
        FibonacciStatus === 'succeeded' ? null : count = false
        EliottWavesRStatus === 'succeeded' ? null : count = false
        RoundNumbersStatus === 'succeeded' ? null : count = false
        PointsPerLineStatus === 'succeeded' ? null : count = false
        LineByPointsStatus === 'succeeded' ? null : count = false
        CorrelationZoneStatus === 'succeeded' ? null : count = false
        ProTrendsStatus === 'succeeded' ? null : count = false
        LineDoubleStatus === 'succeeded' ? null : count = false

        console.log('PriceStatus :  ' + PriceStatus);
        console.log('SuiteMaxMinStatus :  ' + SuiteMaxMinStatus);
        console.log('ProbableLineStatus :  ' + ProbableLineStatus);
        console.log('TrendLinesStatus :  ' + TrendLinesStatus);
        console.log('SMAStatus :  ' + SMAStatus);
        console.log('EliottWavesStatus :  ' + EliottWavesStatus);
        console.log('FibonacciStatus :  ' + FibonacciStatus);
        console.log('EliottWavesRStatus :  ' + EliottWavesRStatus);
        console.log('RoundNumbersStatus :  ' + RoundNumbersStatus);
        console.log('PointsPerLineStatus :  ' + PointsPerLineStatus);
        console.log('LineByPointsStatus :  ' + LineByPointsStatus);
        console.log('CorrelationZoneStatus :  ' + CorrelationZoneStatus);
        console.log('ProTrendsStatus :  ' + ProTrendsStatus);
        console.log('LineDoubleStatus :  ' + LineDoubleStatus);

        return count
    }

    const dispatch = useDispatch()


    var data_Price = useSelector(getPrice)
    var data_SuiteMaxMin = useSelector(getSuiteMaxMin)
    var data_ProbableLine = useSelector(getProbableLine)
    var data_TrendLines = useSelector(getTrendLines)
    var data_SMA = useSelector(getSMA)
    var data_EliottWaves = useSelector(getEliottWaves)
    var data_Fibonacci = useSelector(getFibonacci)
    var data_EliottWavesR = useSelector(getEliottWavesR)
    var data_RoundNumbers = useSelector(getRoundNumbers)
    var data_PointsPerLine = useSelector(getPointsPerLine)
    var data_LineByPoints = useSelector(getLineByPoints)
    var data_CorrelationZone = useSelector(getCorrelationZone)
    var data_ProTrends = useSelector(getProTrends)
    var data_LineDouble = useSelector(getLineDouble)
    

    function colorCondition(color, condition) {
        return condition ? color : 'rgba(0,0,0,0)'
    }
    useEffect(() => {
    if (PriceStatus === 'idle') {
        dispatch(fetchPrice({data: ''}))
    }
    
    if (PriceStatus === 'succeeded') {

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
    
    if (SuiteMaxMinStatus === 'idle') {
        dispatch(fetchSuiteMaxMin({pointsArry: pointsArry}))
    } if (SuiteMaxMinStatus === 'succeeded') {
        newPointsArray = data_SuiteMaxMin.suiteMaxMin
    }

    if (ProbableLineStatus === 'idle') {
        dispatch(fetchProbableLine({pointsArray: pointsArry,pointX: midleMargin}))
    } if (ProbableLineStatus === 'succeeded') {
        probable_line_data = data_ProbableLine.lines
    }

    if (TrendLinesStatus === 'idle') {
        dispatch(fetchTrendLines({pointsArray: pointsMaxArry, pointX: midleMargin, incertitude: incertitude}))
    } if (TrendLinesStatus === 'succeeded') {
        upTrends = data_TrendLines.lines
        
        if (ProbableLineStatus === 'idle') {
            dispatch(fetchProbableLine({pointsArray: pointsMaxArry,pointX: midleMargin}))
        } if (ProbableLineStatus === 'succeeded') {
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
        }   
    }
        
    if (TrendLinesStatus === 'idle') {
        dispatch(fetchTrendLines({pointsArray: pointsMinArry, pointX: midleMargin, incertitude: incertitude}))
    } if (TrendLinesStatus === 'succeeded') {
        downTrends = data_TrendLines.lines
        
        if (ProbableLineStatus === 'idle') {
            dispatch(fetchProbableLine({pointsArray: pointsMinArry,pointX: midleMargin}))
        } if (ProbableLineStatus === 'succeeded') {
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
        }   
    }

    // SIMPLE MOVING AVREGE
    if (SMAStatus === 'idle') {
        dispatch(fetchSMA({data: data}))
    } if (SMAStatus === 'succeeded') {
        const smaData = data_SMA
        smaData20 = smaData.sma20
        smaData50 = smaData.sma50
        smaData100 = smaData.sma100
        smaData200 = smaData.sma200
    }
    

    // Eliott Waves
    if (EliottWavesStatus === 'idle' && SuiteMaxMinStatus === 'succeeded') {
        dispatch(fetchEliottWaves({newPointsArray: newPointsArray}))
    } if (EliottWavesStatus === 'succeeded') {
        waves = data_EliottWaves.waves
        var fiboRatioEW = []
        fiboREW = []
        for (let index = 0; index < waves.length; index++) {
            const wave = waves[index];
            if (FibonacciStatus === 'idle') {
                dispatch(fetchFibonacci({
                    point11: wave.points[2],
                    point22: wave.points[3]
                }))
            } if (FibonacciStatus === 'succeeded') {
                fiboRatioEW[index] = data_Fibonacci.fiboRatio
                for (let index2 = 0; index2 < fiboRatioEW[index].length; index2++) {
                    const element = fiboRatioEW[index][index2];
                    fiboREW.push(element)
                }
            }
        }
    }

    // Eliott Waves 12345a/bc
    if (EliottWavesRStatus === 'idle' && SuiteMaxMinStatus === 'succeeded') {
        dispatch(fetchEliottWavesR({newPointsArray: newPointsArray}))
    } if (EliottWavesRStatus === 'succeeded') {
        wavesReturn = data_EliottWavesR.wavesR
        var fiboRatioEWR = []
        fiboREWR = []
        for (let index = 0; index < wavesReturn.length; index++) {
            const waveReturn = wavesReturn[index];
            if (FibonacciStatus === 'idle') {
                dispatch(fetchFibonacci({
                    point11: waveReturn.points[5],
                    point22: waveReturn.points[6]
                }))
            } if (FibonacciStatus === 'succeeded') {
                fiboRatioEWR[index] = data_Fibonacci.fiboRatio
                for (let index2 = 0; index2 < fiboRatioEWR[index].length; index2++) {
                    const element = fiboRatioEWR[index][index2];
                    fiboREWR.push(element)
                }
            }
        }
    }
        
    // Draw Round Numbers
    const highNumber = Math.ceil(maxPrice)
    const lowNumber = Math.floor(minPrice)
    if (RoundNumbersStatus === 'idle') {
        dispatch(fetchRoundNumbers({
            highNumber: highNumber,
            lowNumber: lowNumber,
            pointX: midleMargin
        }))
    } if (RoundNumbersStatus === 'succeeded') {
        rndNumEqtion = data_RoundNumbers.lines
    }

    // Draw Horizontal Level Price
    nPoints2 = 1 // n(i) = 1 + p(i) ---> 3n = 1 + 3point = 4 point --- 3n = 4point
    horizontal_line = probable_line_data.filter(predicate => Math.abs(predicate.pente) <= incertitude)
    
    if (PointsPerLineStatus === 'idle') {
        dispatch(fetchPointsPerLine({
            equationsArray: horizontal_line,
            pointsArray: pointsArry,
            incertitude: incertitude
        }))
    } if (PointsPerLineStatus === 'succeeded') {
        const lineCategory2 = data_PointsPerLine.points
        if (LineByPointsStatus === 'idle') {
            dispatch(fetchLineByPoints({
                linePoints: lineCategory2
            }))
        } if (LineByPointsStatus === 'succeeded') {
            sumPointPerLine2 = data_LineByPoints.pointGroup
        }
    }
   
    
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
    if (CorrelationZoneStatus === 'idle') {
        dispatch(fetchCorrelationZone({
            indicators: tech_indicators,
            ma: sma_indicators,
            lastpointX: midleMargin,
            delta: 0.2,
            paraime: 3
        }))
    } if (CorrelationZoneStatus === 'succeeded') {
        zone = data_CorrelationZone.zone
    }

    // Draw Last Contact point OR First break point of line by price
    if (ProTrendsStatus === 'idle') {
        dispatch(fetchProTrends({
            priceData: data,
            linearEquations: upTrendLines,
            incertitude: incertitude,
            lastX: midleMargin
        }))
    } if (ProTrendsStatus === 'succeeded') {
        const lf_lines = data_ProTrends.lines
        if (LineDoubleStatus === 'idle') {
            dispatch(fetchLineDouble({
                linesArray: lf_lines
            }))
        } if (LineDoubleStatus === 'succeeded') {
            lf_lines2 = data_LineDouble.lines
        }
    }

    const { width, height } = dimonsions || wrapperRef.current.getBoundingClientRect();
    const svg = select(svgRef.current)
    
    svg.call(zoom);
    const xScale = scaleBand()
                    .domain([...dataCopy, ...dataMargin])
                    .range([0, width])
                    .padding(0.5)

    const yScale = scaleLinear()
                    .domain([minPrice, maxPrice])
                    .range([height, 0])
    

    const xAxis = axisBottom(xScale)
    const yAxis = axisRight(yScale)
    console.log(svg);
    if (allSucceded()) {
        try {
            mainDraw(lf_lines2,zone,nPoints2,horizontal_line,sumPointPerLine2,rndNumEqtion,wavesReturn,fiboRatioEWR,fiboREWR,waves,fiboRatioEW,fiboREW,smaData20,smaData50,smaData100,smaData200,upTrendLines,downTrendLines,upTrend,probableUpTrends,downTrend,probableDownTrends,probable_line_data, newPointsArray, pointsMaxArry, pointsMinArry, pointsArry, midleMargin,maxPrice,minPrice,incertitude,pointMax, pointMin, data,svg,width, height, dataCopy, dataMargin, margin,  dimonsions, xScale, yScale, xAxis, yAxis, colorCondition, checkBox)
            
        } catch (error) {
            console.log(error);
        }
    }
  
    function zoom(svg) {
        const extent = [[0, 0], [width, height]];
    
        svg.call(d3.zoom()
            .scaleExtent([1, 100])
            .translateExtent(extent)
            .extent(extent)
            .on("zoom", zoomed));
    
        function zoomed(event) {
            xScale
            .range([0, width].map(d => event.transform.applyX(d)));
            yScale
            .range([height, 0].map(d => event.transform.applyY(d)));

            if (allSucceded()) {
                try {
                    mainDraw(lf_lines2,zone,nPoints2,horizontal_line,sumPointPerLine2,rndNumEqtion,wavesReturn,fiboRatioEWR,fiboREWR,waves,fiboRatioEW,fiboREW,smaData20,smaData50,smaData100,smaData200,upTrendLines,downTrendLines,upTrend,probableUpTrends,downTrend,probableDownTrends,probable_line_data, newPointsArray, pointsMaxArry, pointsMinArry, pointsArry, midleMargin,maxPrice,minPrice,incertitude,pointMax, pointMin, data,svg,width, height, dataCopy, dataMargin, margin,  dimonsions, xScale, yScale, xAxis, yAxis, colorCondition, checkBox)
                    
                } catch (error) {
                    console.log(error);
                }
            }
        }
      }
    }
    }, [
        data, 
        dimonsions,
        PriceStatus,
        SuiteMaxMinStatus,
        ProbableLineStatus,
        TrendLinesStatus,
        SMAStatus,
        EliottWavesStatus,
        FibonacciStatus,
        EliottWavesRStatus,
        RoundNumbersStatus,
        PointsPerLineStatus,
        LineByPointsStatus,
        CorrelationZoneStatus,
        ProTrendsStatus,
        LineDoubleStatus
    ]
    )

  return (
    <React.Fragment>
        <div style={{width: '100%', height: '70vh' , paddingInline: '5%'}} ref={wrapperRef} className='mb-4'>
            <svg className='c-responsive-bar-chart' ref={svgRef}>
                <g className='x-axis' />
                <g className='y-axis' />
            </svg>
        </div>
    </React.Fragment>
  )
}
