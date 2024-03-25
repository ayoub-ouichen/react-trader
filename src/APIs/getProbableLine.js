import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getProbableLine(pointsArray, pointX) { 
    API.post(URL + '/starter/getProbableLine', {pointsArray: pointsArray,pointX: pointX})
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