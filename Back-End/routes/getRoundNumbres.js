const express = require('express');
const connection = require('../connection');
const router = express.Router();
const roundNumbers = require('../Modules/roundNumbers')


router.post('/getRoundNumbers', async (req,res)=>{
    try {
            const highNumber = req.body.highNumber
            const lowNumber = req.body.pointX
            const pointX = req.body.pointX
            const lines = roundNumbers(highNumber, lowNumber, pointX)
            res.status(200).send({
                lines: lines
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


