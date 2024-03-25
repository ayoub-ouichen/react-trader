const express = require('express');
const connection = require('../connection');
const router = express.Router();
const pointPerLine = require('../Modules/pointPerLine')


router.post('/getPointsPerLine', async (req,res)=>{
    try {
            const equationsArray = req.body.equationsArray
            const pointsArray = req.body.pointsArray
            const incertitude = req.body.incertitude
            const points = pointPerLine(equationsArray, pointsArray, incertitude)
            res.status(200).send({
                points: points
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


