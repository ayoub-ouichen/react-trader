const express = require('express');
const connection = require('../connection');
const router = express.Router();
const lineGroupByPoint = require('../Modules/lineGroupByPoint')


router.post('/getLineByPoints', async (req,res)=>{
    try {
            const linePoints = req.body.linePoints
            const pointGroup = lineGroupByPoint(linePoints)
            
            res.status(200).send({
                pointGroup: pointGroup
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


