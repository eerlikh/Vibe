var lat;
var lon;


var mapDisplay;

var markers;

var googleMarkers = [];

var googleInfoWindows = [];


$(document).ready(function() {
  init();
});

function init() {



  console.log('map scripts loaded');


  var token = $('#api-token').val();
  console.log(token);
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
    template: _.template( $('#map-rating-template').html() ),
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
        var coordinates = [parseFloat(ratings[i].attributes.latitude), parseFloat(ratings[i].attributes.longitude), ratings[i].attributes.comment, ratings[i].attributes.mood];
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
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position);
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    mapDisplay = initMap(lat, lon);
    console.log(markers);
    //makeMarkers(markers);

    google.maps.event.addListenerOnce(mapDisplay, 'idle', function(){
      makeMarkers(markers);
    });
  }, function(error) {
    console.log("Error:" + error.code + " " + error.message);
    lat =  40.761792;
    lon =  -73.965431;
  });



}



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



    return map;
}

function makeMarkers(markers) {
  for(var i = 0; i < markers.length; i++) {
    var loc = markers[i];

    message = loc[2];
    mood = loc[3];

    var contentString = '<p>'+ mood + ': ' + message + '</p>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    googleInfoWindows.push(infowindow);

    var newMarker = new google.maps.Marker({
      position: {lat: loc[0], lng: loc[1]},
      map: mapDisplay
    });

    googleMarkers.push(newMarker)

    /* newMarker.addListener('click', function() {
      infowindow.open(mapDisplay, newMarker)
    }); */
  }

  console.log(googleInfoWindows);
  console.log(googleMarkers);

  addInfoWindowListeners();
}

function addInfoWindowListeners() {
  for(var i = 0; i < googleInfoWindows.length; i++) {
    currentMarker = googleMarkers[i];
    currentInfoWindow = googleInfoWindows[i];

    addInfo(currentMarker, currentInfoWindow);
    
  }
}

function addInfo(marker, infoWindow) {
  marker.addListener('click', function() {
    infoWindow.open(mapDisplay, marker);
  });
}
