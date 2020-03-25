const axios = require('axios');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2a49c6481cc15c3af3df03a3cf640062/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);

    axios({ url }).then( ({ data }) => {
        if(data.code === 400){
            callback(undefined, 'Unable to find the location');
            //console.log(response.data.error);
        }
        else{
            callback(undefined, `${data.daily.data[0].summary} It is currently ${data.currently.temperature} degrees out there, there is ${(data.currently.precipProbability)*100}% chance of rain with visibility of ${data.currently.visibility}%`);
        }
    }).catch( error => {
        callback('Unable to connect to the weather service', undefined);
    });
};

module.exports = forecast;