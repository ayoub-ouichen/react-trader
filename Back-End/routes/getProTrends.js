const express = require('express');
const connection = require('../connection');
const router = express.Router();
const proTrends = require('../Modules/ProTrends')


router.post('/getProTrends', async (req,res)=>{
    try {
            const priceData = req.body.priceData
            const linearEquations = req.body.linearEquations
            const incertitude = req.body.incertitude
            const lastX = req.body.lastX
            const lines = proTrends(priceData, linearEquations, incertitude, lastX)
            res.status(200).send({
                lines: lines
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


