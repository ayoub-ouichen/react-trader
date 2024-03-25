import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getTrendLines(pointsArray, pointX, incertitude) { 
    API.post(URL + '/starter/getTrendLines', {
        pointsArray: pointsArray,
        pointX: pointX,
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