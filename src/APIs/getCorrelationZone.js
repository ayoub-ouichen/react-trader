import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getCorrelationZone(indicators, ma, lastpointX, delta, paraime) { 
    API.post(URL + '/starter/getCorrelationZone', {
        indicators: indicators,
        ma: ma,
        lastpointX: lastpointX,
        delta: delta,
        paraime: paraime
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