var lat;
var lon;


var mapDisplay;

var markers;


$(document).ready(function() {
  init();
});

function init() {



  console.log('map scripts loaded');

  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    mapDisplay = initMap(lat, lon);
    console.log(markers);
    makeMarkers(markers);
  });

  var token = $('#api-token').val();
  $.ajaxSetup({
    headers:{
      "accept": "application/json",
      "token": token
  }
  });

  // rating model
  var Rating = Backbone.Model.extend({
    defaults: {
      "mood": 5,
      "comment": "whatevs",
      "latitude": 90,
      "longitude": 0

    }
  });

  //views

  var RatingView = Backbone.View.extend({
    tagName: 'tr',
    className: 'rating',
    template: _.template( $('#rating-template').html() ),
    render: function(){
      this.$el.empty();
      var html = this.template( this.model.toJSON() );
      var $html = $( html );
      this.$el.append( $html );
    },
    events:{
      'click button.remove': 'removeRating'
    },
    removeRating: function(){
      this.model.destroy();
      this.$el.remove();
    }
  });

  var RatingListView = Backbone.View.extend({
    initialize: function(){
      this.listenTo(this.collection, 'add', this.render);
    },
    render: function(){
      this.$el.empty();
      markers = [];
      var ratings = this.collection.models;
      var view;
      for (var i = 0; i < ratings.length; i++) {
        var coordinates = [parseFloat(ratings[i].attributes.latitude), parseFloat(ratings[i].attributes.longitude)];
        markers.push(coordinates);
        view = new RatingView({model: ratings[i]});
        view.render();
        this.$el.append( view.$el );
      }



    }
  });

  // Collection of ALL user's ratings for display on map
  var MapRatingCollection = Backbone.Collection.extend({
    model: Rating,
    url: '/api/ratings/map_ratings'
  });

  var mapRatings = new MapRatingCollection();

  var MapRatingPainter = new RatingListView({
    collection: mapRatings,
    el: $('#map-ratings-list')
  });

  mapRatings.fetch();



}

// navigator.geolocation.getCurrentPosition(function(position) {
//   lat = position.coords.latitude;
//   lon = position.coords.longitude;
// });
// var infoWindow = new google.maps.InfoWindow({map: map});
//
//   // Try HTML5 geolocation.
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//
//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }
//
// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
// }







// var myMap = myMap || {};
// var myApplication =  myApplication || {};

function initMap(lat, lon) {
    var map;
    var currentLatLng;
    var zoom = 14;
    var mapEl = document.getElementById('map');

    currentLatLng = new google.maps.LatLng( lat, lon );
    map = new google.maps.Map( mapEl, {
        center: currentLatLng,
        zoom: zoom
    });


    // this.marker = new google.maps.Marker({
    //       position: this.currentLatLng,
    //       map: this.map,
    //       title: 'Hello World!',
    //       animation: google.maps.Animation.DROP
    // });

    return map;
}

function makeMarkers(markers) {
  for(var i = 0; i < markers.length; i++) {
    var loc = markers[i];
    var newMarker = new google.maps.Marker({
      position: {lat: loc[0], lng: loc[1]},
      map: mapDisplay
    });
  }
}

/*
myMap.reCenterMap = function() {
  myMap.map.setCenter( this.currentLatLng );
}

myMap.updateMarker = function() {
  myMap.marker.setPosition( this.currentLatLng );
  myMap.marker.setAnimation( google.maps.Animation.DROP );
}

myApplication.init = function() {
  myMap.reCenterMap();
  myMap.updateMarker();
}
*/
