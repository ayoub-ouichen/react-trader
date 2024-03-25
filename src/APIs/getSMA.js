import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getSMA(priceData) { 
    API.post(URL + '/starter/getSMA', {
        data: priceData
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