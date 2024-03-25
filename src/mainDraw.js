import drawLine from './Shapes/Line'

export default function mainDraw(lf_lines2, zone, nPoints2, horizontal_line, sumPointPerLine2, rndNumEqtion, wavesReturn, fiboREWR, waves, fiboREW, smaData20, smaData50, smaData100, smaData200, upTrendLines, downTrendLines, upTrend, probableUpTrends, downTrend, probableDownTrends, probable_line_data, newPointsArray, pointsMaxArry, pointsMinArry, pointsArry, midleMargin, maxPrice, minPrice, incertitude, pointMax, pointMin, data, dataCopy, dataMargin, margin, upTrends, downTrends, fiboRatioEWR, fiboRatioEW, svg,width, height,  dimonsions, xScale, yScale, xAxis, yAxis, colorCondition, checkBox) {

    svg.select('.x-axis')
    .style('transform', `translateY(${height}px)`)
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-70)")
 
    
    
    svg
        .select('.y-axis')
        .style('transform', `translateX(${width}px)`)
        .call(yAxis)
        
    // Draw Wicks
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let highWickPoint = {x: index, y: element['2. high']}
        let lowWickPoint = {x: index, y: element['3. low']}
        let wickColor = (element['4. close'] > element['1. open']) ? colorCondition("blue",checkBox[0]) : colorCondition("red",checkBox[0])
        drawLine(svg, [highWickPoint,lowWickPoint], wickColor, 'wick' + index, xScale, yScale)
        checkBox[0] ? null : svg.selectAll('.wick' + index).remove()
    }
    
    // Draw Candles
    svg
        .selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', (value, index) => xScale(index))
        .attr('y', (value) => yScale(Math.max(value['1. open'], value['4. close'])))
        .attr('width', xScale.bandwidth())
        .on('mousemove', (event, value) => {
            // look at github some changes in d3.js is the cause
            const index = svg.selectAll(".bar").nodes().indexOf(event.target);
            svg
            .selectAll(".tooltips")
            .data([value])
            .join((enter) => enter.append("text").attr("y", height + 20))
            .attr("class", "tooltips")
            .style('fill', 'black')
            .text(value['date'])
            .attr("x", xScale(index) + xScale.bandwidth() / 2)
            .attr("text-anchor", "middle")
            .transition()
            .attr("y", height - 10)
            .attr("opacity", 1);
            })
        .style('cursor','pointer')
        .on("mouseleave", () => svg.select(".tooltips").remove())
        .attr("height", (value) => Math.abs(yScale(value['1. open']) - yScale(value['4. close'])))
        .attr("fill", value => (value['4. close'] > value['1. open']) ? colorCondition("blue",checkBox[0]) : colorCondition("red",checkBox[0]))
        checkBox[0] ? null : svg.selectAll('.bar').remove()
        checkBox[0] ? null : svg.selectAll('.tooltips').remove()

    // Draw high line
    let dataHighPoints = data.map((value, index) => {return {x: index, y: value['2. high']}})
    drawLine(svg, dataHighPoints, colorCondition("black",checkBox[1]), 'line1', xScale, yScale)
    checkBox[1] ? null : svg.selectAll('.line1').remove()

    // Draw Low Line
    let dataLowPoints = data.map((value, index) => {return {x: index, y: value['3. low']}})
    drawLine(svg, dataLowPoints, colorCondition("black",checkBox[2]), 'line2', xScale, yScale)
    checkBox[2] ? null : svg.selectAll('.line2').remove()


    // Draw pointMax Circle
    svg
        .selectAll('.high')
        .data(pointMax.max)
        .join("circle")
        .attr('class', 'high')
        .attr('cx', (value, index) => xScale(value['point_x']) + xScale.bandwidth()/2)
        .attr('cy', (value, index) => yScale(value['point_y']) )
        .attr('r', 2)
        .attr('fill', colorCondition("black",checkBox[3]))
        checkBox[3] ? null : svg.selectAll('.high').remove()


    // Draw pointMin Circle
    svg
        .selectAll('.low')
        .data(pointMin.min)
        .join("circle")
        .attr('class', 'low')
        .attr('cx', (value, index) => xScale(value['point_x']) + xScale.bandwidth()/2)
        .attr('cy', (value, index) => yScale(value['point_y']) )
        .attr('r', 2)
        .attr('fill', colorCondition("black",checkBox[4]))
        checkBox[4] ? null : svg.selectAll('.low').remove()

    // Draw TrendLines
    // // Draw Up Trend
    for (let index = 0; index < upTrend.length; index++) {
        const trend_line = upTrend[index]
        const lineData = probableUpTrends[trend_line.line]
        drawLine(svg, [lineData.point1, lineData.point2], colorCondition("red",checkBox[7]), 'is-up-trend-' + index, xScale, yScale)
        checkBox[7] ? null : svg.selectAll('.is-up-trend-' + index).remove()
    }

    // //Draw Down Trend
    for (let index = 0; index < downTrend.length; index++) {
        const trend_line = downTrend[index]
        const lineData = probableDownTrends[trend_line.line]
        drawLine(svg, [lineData.point1, lineData.point2], colorCondition("yellow",checkBox[8]), 'is-down-trend-' + index, xScale, yScale)
        checkBox[8] ? null : svg.selectAll('.is-down-trend-' + index).remove()
    }

    // Draw SMA 20
    drawLine(svg, smaData20, colorCondition("black",checkBox[9]), 'sma20', xScale, yScale)
    checkBox[9] ? null : svg.selectAll('.sma20').remove()
    // Draw SMA 50
    drawLine(svg, smaData50, colorCondition("black",checkBox[9]), 'sma50', xScale, yScale)
    checkBox[9] ? null : svg.selectAll('.sma50').remove()
    // Draw SMA 100
    drawLine(svg, smaData100, colorCondition("black",checkBox[9]), 'sma100', xScale, yScale)
    checkBox[9] ? null : svg.selectAll('.sma100').remove()
    // Draw SMA 200
    drawLine(svg, smaData200, colorCondition("black",checkBox[9]), 'sma200', xScale, yScale)
    checkBox[9] ? null : svg.selectAll('.sma200').remove()


    // Eliott Waves 123/45
    for (let index = 0; index < waves.length; index++) {
        const wave = waves[index];
        drawLine(svg, [...wave.points], colorCondition("black",checkBox[11]), 'wave' + index, xScale, yScale)
        checkBox[11] ? null : svg.selectAll('.wave').remove()
        for (let index2 = 0; index2 < fiboRatioEW[index].length; index2++) {
            const element = fiboRatioEW[index][index2];
            drawLine(svg, [element.point1,element.point2],colorCondition("black",checkBox[11]), 'fibo-ratio-' + index2 + 1 + index, xScale, yScale)
            checkBox[11] ? null : svg.selectAll('.fibo-ratio-' + index2 + 1 + index).remove()
            svg
            .selectAll(".tooltip" + index2 + 1 + index)
            .data([element])
            .join((enter) => enter.append("text").attr("y", height + 20))
            .attr("class", "tooltip" + index2 + 1 + index)
            .style('fill', colorCondition("black",checkBox[11]))
            .text(d => d.ratio)
            .attr("x", d => xScale(d.point2.x) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.point2.y))
            .style("font-size", 9);
            checkBox[11] ? null : svg.selectAll('.tooltip' + index2 + 1 + index).remove()
        }
    }

    // Eliott Waves 12345a/bc
    for (let index = 0; index < wavesReturn.length; index++) {
        const waveReturn = wavesReturn[index];
        drawLine(svg, [...waveReturn.points], colorCondition("black",checkBox[12]), 'waveReturn' + index, xScale, yScale)
        checkBox[12] ? null : svg.selectAll('.waveReturn').remove()
        for (let index2 = 0; index2 < fiboRatioEWR[index].length; index2++) {
            const element = fiboRatioEWR[index][index2];
            drawLine(svg, [element.point1,element.point2],colorCondition("black",checkBox[12]), 'fibo-return-' + index2 + 1 + index, xScale, yScale)
            checkBox[12] ? null : svg.selectAll('.fibo-return-' + index2 + 1 + index).remove()
            svg
            .selectAll(".tooltip-return" + index2 + 1 + index)
            .data([element])
            .join((enter) => enter.append("text").attr("y", height + 20))
            .attr("class", "tooltip-return" + index2 + 1 + index)
            .style('fill', colorCondition("black",checkBox[12]))
            .text(d => d.ratio)
            .attr("x", d => xScale(d.point2.x) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.point2.y))
            .style("font-size", 9);
            checkBox[12] ? null : svg.selectAll('.tooltip-return' + index2 + 1 + index).remove()
        }
    }

    // Draw MaxMinoidal
    drawLine(svg, newPointsArray, colorCondition("rgba(0,100,255,0.5)",checkBox[10]), 'maxMinoidal', xScale, yScale)
    checkBox[10] ? null : svg.selectAll('.maxMinoidal').remove()

    // Draw Round Numbers
    for (let index = 0; index < rndNumEqtion.length; index++) {
        const rnEquation = rndNumEqtion[index]
        drawLine(svg, [rnEquation.point1, rnEquation.point2], colorCondition('black',checkBox[13]), 'round-number-' + index, xScale, yScale)
        checkBox[13] ? null : svg.selectAll('.round-number-' + index).remove()
    }

    // Draw Horizontal Level Price
    for (let index = 0; index < sumPointPerLine2.length; index++) {
        const point_line = sumPointPerLine2[index]
        const lineData = horizontal_line[point_line.line]

        if (point_line.points >= nPoints2) {
            drawLine(svg, [lineData.point1, lineData.point2], colorCondition("orange",checkBox[14]), 'horizontal-level-' + index, xScale, yScale)
            checkBox[14] ? null : svg.selectAll('.horizontal-level-' + index).remove()
        }
    }
    
    // Draw Correlation Zone
    svg
        .selectAll('.zone')
        .data(zone)
        .join("circle")
        .attr('class', 'zone')
        .attr('cx', (value, index) => xScale(value['x']) + xScale.bandwidth()/2)
        .attr('cy', (value, index) => yScale(value['y']) )
        .attr('r', 2)
        .attr('fill', colorCondition("black",checkBox[15]))
    checkBox[15] ? null : svg.selectAll('.zone').remove()

    // Draw Last Contact point OR First break point of line by price
    for (let index = 0; index < lf_lines2.length; index++) {
        const lineData = lf_lines2[index]
        drawLine(svg, [lineData.point1, lineData.point2], colorCondition("orange",checkBox[16]), 'lf_lines-' + index, xScale, yScale)
        checkBox[16] ? null : svg.selectAll('.lf_lines-' + index).remove()
    }

}