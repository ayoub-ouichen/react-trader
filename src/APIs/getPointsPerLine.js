import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getPointsPerLine(equationsArray, pointsArray, incertitude) { 
    API.post(URL + '/starter/getPointsPerLine', {
        equationsArray: equationsArray,
        pointsArray: pointsArray,
        incertitude: incertitude
    })
    .then(function (response) {
        // handle success
        data = response.data
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .finally(function () {
        // always executed
    });
    return data
}