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
import { changeStatue, fetchMainCalcule, getMainCalcule, getMainCalculeStatus } from '../featuers/dataFlowSlice'

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

export default function Chart({ c , date_debut, date_fin }) {
    var checkBox = !c ? [] : c;
    const wrapperRef = useRef()
    const dimonsions = useResizeObserver(wrapperRef)
    const svgRef = useRef();
    const mainCalcule = useSelector(getMainCalcule)
    const mainCalculeStatus = useSelector(getMainCalculeStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        checkBox = new Array(100).fill(false)
        if (mainCalculeStatus === 'succeeded') {
            dispatch(changeStatue())
        }
    }, [date_debut, date_fin])
    

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

    function colorCondition(color, condition) {
        return condition ? color : 'rgba(0,0,0,0)'
    }
    useEffect(() => {
    if(mainCalculeStatus === 'idle') {
        dispatch(fetchMainCalcule({date_debut: date_debut, date_fin: date_fin}))
    }

    if (mainCalculeStatus === 'succeeded') {
        lf_lines2 = mainCalcule.data.lf_lines2
        zone = mainCalcule.data.zone
        nPoints2 = mainCalcule.data.nPoints2
        horizontal_line = mainCalcule.data.horizontal_line
        sumPointPerLine2 = mainCalcule.data.sumPointPerLine2
        rndNumEqtion = mainCalcule.data.rndNumEqtion
        wavesReturn = mainCalcule.data.wavesReturn
        fiboREWR = mainCalcule.data.fiboREWR
        waves = mainCalcule.data.waves
        fiboREW = mainCalcule.data.fiboREW
        smaData20 = mainCalcule.data.smaData20
        smaData50 = mainCalcule.data.smaData50
        smaData100 = mainCalcule.data.smaData100
        smaData200 = mainCalcule.data.smaData200
        upTrendLines = mainCalcule.data.upTrendLines
        downTrendLines = mainCalcule.data.downTrendLines
        upTrend = mainCalcule.data.upTrend
        probableUpTrends = mainCalcule.data.probableUpTrends
        downTrend = mainCalcule.data.downTrend
        probableDownTrends = mainCalcule.data.probableDownTrends
        probable_line_data = mainCalcule.data.probable_line_data
        newPointsArray = mainCalcule.data.newPointsArray
        pointsMaxArry = mainCalcule.data.pointsMaxArry
        pointsMinArry = mainCalcule.data.pointsMinArry
        pointsArry = mainCalcule.data.pointsArry
        midleMargin = mainCalcule.data.midleMargin
        maxPrice = mainCalcule.data.maxPrice
        minPrice = mainCalcule.data.minPrice
        incertitude = mainCalcule.data.incertitude
        pointMax = mainCalcule.data.pointMax
        pointMin = mainCalcule.data.pointMin
        data = mainCalcule.data.data
        dataCopy = mainCalcule.data.dataCopy
        dataMargin = mainCalcule.data.dataMargin
        margin = mainCalcule.data.margin
        upTrends = mainCalcule.data.upTrends
        downTrends = mainCalcule.data.downTrends
        fiboRatioEWR = mainCalcule.data.fiboRatioEWR
        fiboRatioEW = mainCalcule.data.fiboRatioEW
        
    const svg = select(svgRef.current)
    const { width, height } = dimonsions || wrapperRef.current.getBoundingClientRect();
    
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
    
    mainDraw(lf_lines2, zone, nPoints2, horizontal_line, sumPointPerLine2, rndNumEqtion, wavesReturn, fiboREWR, waves, fiboREW, smaData20, smaData50, smaData100, smaData200, upTrendLines, downTrendLines, upTrend, probableUpTrends, downTrend, probableDownTrends, probable_line_data, newPointsArray, pointsMaxArry, pointsMinArry, pointsArry, midleMargin, maxPrice, minPrice, incertitude, pointMax, pointMin, data, dataCopy, dataMargin, margin, upTrends, downTrends, fiboRatioEWR, fiboRatioEW, svg,width, height,  dimonsions, xScale, yScale, xAxis, yAxis, colorCondition, checkBox)
           
  
    function zoom(svgi) {
        const extent = [[0, 0], [width, height]];
    
        svgi.call(d3.zoom()
            .scaleExtent([1, 100])
            .translateExtent(extent)
            .extent(extent)
            .on("zoom", zoomed));
    
        function zoomed(event) {
            xScale
            .range([0, width].map(d => event.transform.applyX(d)));
            yScale
            .range([height, 0].map(d => event.transform.applyY(d)));

        mainDraw(lf_lines2, zone, nPoints2, horizontal_line, sumPointPerLine2, rndNumEqtion, wavesReturn, fiboREWR, waves, fiboREW, smaData20, smaData50, smaData100, smaData200, upTrendLines, downTrendLines, upTrend, probableUpTrends, downTrend, probableDownTrends, probable_line_data, newPointsArray, pointsMaxArry, pointsMinArry, pointsArry, midleMargin, maxPrice, minPrice, incertitude, pointMax, pointMin, data, dataCopy, dataMargin, margin, upTrends, downTrends, fiboRatioEWR, fiboRatioEW, svg,width, height,  dimonsions, xScale, yScale, xAxis, yAxis, colorCondition, checkBox)
             
        }
      }
    }
    }, [
        data, 
        dimonsions,
        mainCalculeStatus,
        date_debut,
        date_fin
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
