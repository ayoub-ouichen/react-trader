import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getEliottWaves(newPointsArray) { 
    API.post(URL + '/starter/getEliottWaves', {
        newPointsArray: newPointsArray
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