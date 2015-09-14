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







var myMap = myMap || {};
var myApplication =  myApplication || {};
var lat;
var lon;
myMap.init = function() {
    this.map;
    this.currentLatLng;
    this.zoom = 6;
    this.mapEl = document.getElementById('map');

    this.currentLatLng = new google.maps.LatLng( 20, -10 );
    this.map = new google.maps.Map( this.mapEl, {
        center: this.currentLatLng,
        zoom: this.zoom
    });

    this.marker = new google.maps.Marker({
          position: this.currentLatLng,
          map: this.map,
          title: 'Hello World!',
          animation: google.maps.Animation.DROP
    });
}

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

$(document).ready(function() {
    myMap.init();
    myApplication.init();
});
