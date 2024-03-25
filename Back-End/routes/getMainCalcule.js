const express = require('express');
const connection = require('../connection');
const router = express.Router();
const mainCalcule = require('../mainCalcule')

router.post('/getMainCalcule', async (req,res)=>{
    try {
            const date_debut = req.body.date_debut
            const date_fin = req.body.date_fin
            const data = mainCalcule(date_debut, date_fin)

            res.status(200).send({data: data})
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);

module.exports = router;




