import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getSuiteMaxMin(pointsArry) { 
    API.post(URL + '/starter/getSuiteMaxMin', pointsArry)
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