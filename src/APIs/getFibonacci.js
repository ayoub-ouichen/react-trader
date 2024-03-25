import API from '../APIs/api';
const URL = 'http://localhost:2001'

var data = []
export default function getFibonacci(point11, point22) { 
    API.post(URL + '/starter/getFibonacci', {
        point11: point11,
        point22: point22
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