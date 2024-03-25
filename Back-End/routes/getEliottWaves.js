const express = require('express');
const connection = require('../connection');
const router = express.Router();
const eliottWaves = require('../Modules/eliottWaves')


router.post('/getEliottWaves', async (req,res)=>{
    try {
            const newPointsArray = req.body.newPointsArray
            const waves = eliottWaves(newPointsArray)
            
            res.status(200).send({
                waves: waves
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


