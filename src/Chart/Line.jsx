import React, { useEffect, useRef, useState } from 'react'
import { 
    line, 
    select, 
    curveCardinal, 
    axisBottom, 
    axisRight, 
    scaleLinear 
} from 'd3'

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

export default function Line({ d }) {
    const data = !d ? [] : d;
    const svgRef = useRef();
    const wrapperRef = useRef()
    const dimonsions = useResizeObserver(wrapperRef)

    useEffect(() => {
        const svg = select(svgRef.current)
        if(!dimonsions) return

        const xScale = scaleLinear()
                        .domain([0, data.length - 1])
                        .range([0, dimonsions.width])

        const yScale = scaleLinear()
                        .domain([-3,3])
                        .range([dimonsions.height, 0])

        const xAxis = axisBottom(xScale)
                        .ticks(data.length)
                        .tickFormat(index => index + 1)
        svg
            .select('.x-axis')
            .style('transform', `translateY(${dimonsions.height}px)`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-60)")

        const yAxis = axisRight(yScale)
        svg
            .select('.y-axis')
            .style('transform', `translateX(${dimonsions.width}px)`)
            .call(yAxis)

        const myLine = line()
            .x((value, index) => xScale(index))
            .y(yScale)
        svg
            .selectAll('.line')
            .data([data])
            .join('path')
            .attr('class', 'line')
            .attr('d', myLine)
            .attr('fill', 'none')
            .attr('stroke', 'blue')
    }, [data])
    

  return (
    <React.Fragment>
        <div style={{width: '100%', height: '30vh' , paddingInline: '5%'}} ref={wrapperRef} className='mb-4'>
            <svg className='C-line' ref={svgRef}>
                <g className='x-axis' />
                <g className='y-axis' />
                {/* <path d='M0, 150 100, 100 150, 120' stroke='blue' fill='none' /> method without D3.js */}
            </svg>
        </div>
    </React.Fragment>
  )
}
