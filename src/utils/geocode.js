const axios = require('axios');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib255eDA5MyIsImEiOiJjazd4YjQ5dzEwMDJqM2twZzJoNm85dm1iIn0.gsnZvh0NRWWHSVjSZIWr-w';

    axios({ url }).then( ({ data }) => {
        if(data.features.length === 0){
            callback(undefined, 'Unable to find the coordinates');
        }
        else{
            callback(undefined, {
                longitude: data.features[0].center[0],
                latitude: data.features[0].center[1],
                location: data.features[0].place_name
            });
        }
    }).catch(error => {
        callback('Unable to connect to the geocoding service', undefined);
    });
};

module.exports = geocode;