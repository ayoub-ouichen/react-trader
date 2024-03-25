const express = require('express');
const connection = require('../connection');
const router = express.Router();
const trendLines = require('../Modules/trendLines')


router.post('/getTrendLines', async (req,res)=>{
    try {
            const pointsArray = req.body.pointsArray
            const pointX = req.body.pointX
            const incertitude = req.body.incertitude
            const lines = trendLines(pointsArray, pointX, incertitude)
            res.status(200).send({
                lines: lines
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


