const express = require('express');
const connection = require('../connection');
const router = express.Router();
const deleteMaxMinSuite = require('../Modules/deleteMaxMinSuite')


router.post('/getSuiteMaxMin', async (req,res)=>{
    try {
            const pointsArry = req.body.pointsArry
            const suiteMaxMin = deleteMaxMinSuite(pointsArry)
            res.status(200).send({
                suiteMaxMin: suiteMaxMin
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


