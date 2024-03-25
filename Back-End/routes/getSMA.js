const express = require('express');
const connection = require('../connection');
const router = express.Router();
const sma = require('../Modules/sma')


router.post('/getSMA', async (req,res)=>{
    try {
            const data = req.body.data
            const sma20 = sma(data, 20)
            const sma50 = sma(data, 50)
            const sma100 = sma(data, 100)
            const sma200 = sma(data, 200)
            
            res.status(200).send({
                sma20: sma20,
                sma50: sma50,
                sma100: sma100,
                sma200: sma200
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


