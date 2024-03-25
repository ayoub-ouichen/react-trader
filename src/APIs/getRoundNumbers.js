import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getRoundNumbers(highNumber, lowNumber, pointX) { 
    API.post(URL + '/starter/getRoundNumbers', {
        highNumber: highNumber,
        lowNumber: lowNumber,
        pointX: pointX
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