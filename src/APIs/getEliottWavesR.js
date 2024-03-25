import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getEliottWavesR(newPointsArray) { 
    API.post(URL + '/starter/getEliottWavesR', {newPointsArray: newPointsArray})
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