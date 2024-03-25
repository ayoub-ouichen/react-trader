const express = require('express');
const connection = require('../connection');
const router = express.Router();
const probableLine = require('../Modules/probableLine')


router.post('/getProbableLine', async (req,res)=>{
    try {
            const pointsArray = req.body.pointsArray
            const pointX = req.body.pointX
            const lines = probableLine(pointsArray, pointX)
            res.status(200).send({
                lines: lines
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


