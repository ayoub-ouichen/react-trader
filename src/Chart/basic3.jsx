import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Plot from 'react-plotly.js';
import { changeStatue, fetchMainCalcule, getMainCalcule, getMainCalculeStatus } from '../featuers/dataFlowSlice'
import { tickFormat } from 'd3';

var data = [] 
var layout = {}

var date = []
var close = []
var open = []
var high = []
var low = [] 

export default function Basic3({ date_debut, date_fin }) {
    const plotRef = useRef(null);
    const [width, setWidth] = useState()
    const [height, setHeight] = useState()
    const mainCalcule = useSelector(getMainCalcule)
    const mainCalculeStatus = useSelector(getMainCalculeStatus)
    const dispatch = useDispatch()

    useEffect(() => {
        if (mainCalculeStatus === 'succeeded') {
            dispatch(changeStatue())
        }
    }, [date_debut, date_fin])

    // Function to update plot dimensions when window is resized
    const updateDimensions = () => {
        const plotNode = plotRef.current;
        if (plotNode) {
            const local_width = plotNode.offsetWidth;
            const local_height = plotNode.offsetHeight;
            setWidth(local_width)
            setHeight(local_height)
        }
    };

    // Effect hook to add resize event listener
    useEffect(() => {
        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => {
        window.removeEventListener('resize', updateDimensions);
        };
    }, []);
    
    useEffect(() => {
        if(mainCalculeStatus === 'idle') {
            dispatch(fetchMainCalcule({date_debut: date_debut, date_fin: date_fin}))
        }
    
        if (mainCalculeStatus === 'succeeded') {
            const mainData = mainCalcule.data.data
            date = mainData.map(value => value.date)
            open = mainData.map(value => value['1. open'])
            high = mainData.map(value => value['2. high'])
            low = mainData.map(value => value['3. low'])
            close = mainData.map(value => value['4. close'])


        var trace1 = {
    
            x: date,

            close: close,

            decreasing: {line: {color: 'red', width: 1}}, 
            
            high: high,

            increasing: {line: {color: 'green', width: 1}}, 
            
            line: {color: 'rgba(31,119,180,1)', width: 1}, 
            
            low: low,

            open: open,

            type: 'candlestick', 
            xaxis: 'x', 
            yaxis: 'y'
        };

        data = [trace1];

        layout = {
            width: width,
            height: height,
            dragmode: 'zoom', 
            margin: {
            r: 30, 
            t: 25, 
            b: 40, 
            l: 30
            }, 
            showlegend: false, 
            xaxis: {
                type: 'date',
                tickFormat: '%Y-%m-%d',
                rangebreaks:[
                    {
                        bounds: ['sat', 'mon']
                    }
                ],
                rangeslider: {
                    visible: false
                }
            }
        };
    }
 
    }, [
        date_debut,
        date_fin
    ]
    )
console.log(data);
    return (
        <div ref={plotRef} style={{ width: '100%', height: '70vh' }}>
            <Plot
                data={data}
                layout={layout}
            />
        </div>
    )
}
