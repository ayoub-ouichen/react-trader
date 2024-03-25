import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getLineByPoints(linePoints) { 
    API.post(URL + '/starter/getLineByPoints', {
        linePoints: linePoints
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