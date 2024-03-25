const express = require('express');
const connection = require('../connection');
const router = express.Router();
const correlationZone = require('../Modules/correlationZone')


router.post('/getCorrelationZone', async (req,res)=>{
    try {
            const indicators = req.body.indicators
            const ma = req.body.ma
            const lastpointX = req.body.lastpointX
            const delta = req.body.delta
            const paraime = req.body.paraime
            const zone = correlationZone(indicators, ma, lastpointX, delta, paraime)
            
            res.status(200).send({
                zone: zone
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;




