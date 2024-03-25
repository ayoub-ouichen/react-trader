const express = require('express');
const connection = require('../connection');
const router = express.Router();
const lineDouble = require('../Modules/lineDouble')


router.post('/getLineDouble', async (req,res)=>{
    try {
            const linesArray = req.body.linesArray
            const lines = lineDouble(linesArray)
            
            res.status(200).send({
                lines: lines
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


