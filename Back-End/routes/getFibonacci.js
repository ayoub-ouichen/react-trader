const express = require('express');
const connection = require('../connection');
const router = express.Router();
const fibonacci = require('../Modules/Fibonacci')


router.post('/getFibonacci', async (req,res)=>{
    try {
            const point11 = req.body.point11
            const point22 = req.body.point22
            const fiboRatio = fibonacci(point11, point22)
            
            res.status(200).send({
                fiboRatio: fiboRatio
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


