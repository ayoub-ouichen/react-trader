const express = require('express');
const connection = require('../connection');
const router = express.Router();
const mainCalcule = require('../mainCalcule')

router.post('/getData', async (req,res)=>{
    try {
            console.time('count');
            const date_debut = req.body.date_debut
            const date_fin = req.body.date_fin
            const data = mainCalcule(date_debut, date_fin)
            const lf_lines2 = data.lf_lines2.map((value, index) => {return {line_value: value, line_index: index}})
            const lineCategory3 = data.lineCategory3
            const pointsArry = data.pointsArry.map((value, index) => {return {point_value: value, point_index: index}})

            for (let index = 0; index < lf_lines2.length; index++) {
                const element = lf_lines2[index]
                let request = new connection.Request();
                
                request.input('param1', connection.Int, element.line_index);

                request.input('param2', connection.Int, element.line_value.point1.x);
                request.input('param3', connection.Float, element.line_value.point1.y);
                request.input('param4', connection.Int, element.line_value.point2.x);
                request.input('param5', connection.Float, element.line_value.point2.y);

                request.input('param6', connection.Float, element.line_value.pente);
                request.input('param7', connection.Float, element.line_value.constante);
                request.input('param8', connection.Float, element.line_value.delta);


                let result = await request.query('INSERT INTO T_PRO_TRENDS (line_index, point_1_x, point_1_y, point_2_x, point_2_y, pente, constante, delta) values (@param1,@param2,@param3,@param4,@param5,@param6,@param7,@param8);');
                console.log(index + ' / ' + lf_lines2.length);
            
            }
            


            for (let index = 0; index < pointsArry.length; index++) {
                const element = pointsArry[index]
                let request = new connection.Request();
            
                request.input('param1', connection.Int, element.point_index);
                request.input('param2', connection.Int, element.point_value.x);
                request.input('param3', connection.Float, element.point_value.y);
                request.input('param4', connection.VarChar, element.point_value.type);

                let result = await request.query('INSERT INTO T_PRO_TRENDS_POINTS (point_index, point_x, point_y, point_type) values (@param1,@param2,@param3,@param4);');
                console.log(index + ' / ' + pointsArry.length);
            
            }




            for (let index = 0; index < lineCategory3.length; index++) {
                const element = lineCategory3[index]
                let request = new connection.Request();
                
                request.input('param1', connection.Int, element.lineIndex);
                request.input('param2', connection.Float, element.pointIndex);
                request.input('param3', connection.Float, element.delta);

                let result = await request.query('INSERT INTO T_PRO_TRENDS_GP_POINTS (lineIndex, pointIndex, delta) values (@param1,@param2,@param3);');
                console.log(index + ' / ' + lineCategory3.length);
                
            }
            console.timeEnd('count')
            
        } catch (err) {
            return res.status(500).json({ success: false, message: err });
        }
    }
);

module.exports = router;