const express = require('express');
const connection = require('../connection');
const router = express.Router();
const data = require('../data')
const calculateDerivative = require('../Modules/firstDerive')

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

router.post('/getPrice', async (req,res)=>{
    try {
            const dataArray = Object.entries(data).map(([date, values]) => ({ date, ...values }))
            let x = dataArray.map((value, index) => index)
            let yHigh = dataArray.map((value, index) => value['2. high'])
            let yLow = dataArray.map((value, index) => value['3. low'])
            const pointMax = calculateDerivative(x, yHigh.reverse())
            const pointMin = calculateDerivative(x, yLow.reverse())
            const maxPrice = parseFloat(getHighPrice(dataArray)) + 1
            const minPrice = parseFloat(getLowPrice(dataArray)) - 2
            const pointsMaxArry = pointMax.max.map(value => { return {x: value.point_x, y: value.point_y, type: 'max'} })
            const pointsMinArry = pointMin.min.map(value => { return {x: value.point_x, y: value.point_y, type: 'min'} })
            const pointsArry = [...pointsMinArry, ...pointsMaxArry]
            pointsArry.sort((a, b) => a.x - b.x)
            
            res.status(200).send({
                price: dataArray.reverse(),
                pointsMax: pointMax,
                pointsMin: pointMin,
                maxPrice: maxPrice,
                minPrice: minPrice,
                pointsMaxArry: pointsMaxArry,
                pointsMinArry: pointsMinArry,
                pointsArry: pointsArry
            })
            
        } catch (error) {
            console.log(error);
            //return res.status(500).json({ success: false, message: error });
        }
    }
);


module.exports = router;


