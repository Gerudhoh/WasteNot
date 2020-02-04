'use strict';

const {
  dialogflow,
  Image,
  Suggestions
} = require('actions-on-google');

const functions = require('firebase-functions');
const app = dialogflow({debug: true});

app.intent('get_place', (conv, {location}) => {
      const axios = require('axios');
      var api_key = "REDACTED";
      var user_location = JSON.stringify(location["street-address"]);
      var loc = JSON.stringify(location);
      var geo_code = "https://maps.googleapis.com/maps/api/geocode/json?address=" + encodeURIComponent(user_location) + "&region=.ca&key=" + api_key;
      return axios.get(geo_code)
        .then(response => {
          var places_information = response.data.results[0].geometry.location;
          var place_latitude = JSON.stringify(places_information.lat);
          var place_longitude = JSON.stringify(places_information.lng);
          var coordinates = [place_latitude, place_longitude];
          return coordinates;
      }).then(coordinates => {
        var lat = coordinates[0];
        var long = coordinates[1];
        var place_search = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&fields=photos,formatted_address,name,opening_hours,rating&key=" + api_key;
        return axios.get(place_search)
        .then(response => {
            var photo_reference = response.data.candidates[0].photos[0].photo_reference;
            var address = JSON.stringify(response.data.candidates[0].formatted_address);
            var name = JSON.stringify(response.data.candidates[0].name);
            var photo_request = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + photo_reference + '&key=' + api_key;
            conv.ask(`Fetching your request...`);
            conv.ask(new Image({
                url: photo_request,
                alt: 'Restaurant photo',
              }))
            conv.close(`Okay, the restaurant name is ` + name + ` and the address is ` + address + `. The following photo uploaded from a Google Places user might whet your appetite!`);
        })
    })
});

exports.get_place = functions.https.onRequest(app);
