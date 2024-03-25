// Function To Draw Lines

import { line } from "d3"

export default function drawPath(svgElement, linePoints, lineColor, lineClass, xScale, yScale) {
    const myLine = line()
    .x((value, index) => xScale(value.x) + xScale.bandwidth()/2)
    .y(value => yScale(parseFloat(value.y)))
    svgElement
        .selectAll('.' + lineClass)
        .data([linePoints])
        .join('path')
        .attr('class', lineClass)
        .attr('d', myLine)
        .attr('fill', 'none')
        .attr('stroke', lineColor)
}
