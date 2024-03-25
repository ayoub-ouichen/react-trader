import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getProTrends(priceData, linearEquations, incertitude, lastX) { 
    API.post(URL + '/starter/getProTrends', {
        priceData: priceData,
        linearEquations: linearEquations,
        incertitude: incertitude,
        lastX: lastX
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