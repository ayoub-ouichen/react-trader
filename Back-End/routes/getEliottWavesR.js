const express = require('express');
const connection = require('../connection');
const router = express.Router();
const eliottWavesReturn = require('../Modules/eliottWavesReturn')


router.post('/getEliottWavesR', async (req,res)=>{
    try {
            const newPointsArray = req.body.newPointsArray
            const wavesR = eliottWavesReturn(newPointsArray)
            res.status(200).send({
                wavesR: wavesR
            })
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);


module.exports = router;


