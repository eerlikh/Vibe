$(document).ready(function() {
  console.log("Slider time");
  init();
  setSlider();
});
function setSlider() {
  $( "#slider-range-max" ).slider({
    orientation: "vertical",
    range: "min",
    min: 1,
    max: 10,
    value: 10,
    slide: function( event, ui ) {
      $( "#amount" ).val( ui.value );

      var ratingColor = ui.value;
          switch (ratingColor) {
             case 1:
               $('.ui-slider-range').css( {"background-color": "#FF0000"});
               $('.ui-widget-content').css( {"background-color": "#FF0000"});
               break;
             case 2:
               $('.ui-slider-range').css( {"background-color": "#FF3300"});
               $('.ui-widget-content').css( {"background-color": "#FF3300"});
               break;
             case 3:
               $('.ui-slider-range').css( {"background-color": "#FF6600"});
               $('.ui-widget-content').css( {"background-color": "#FF6600"});
               break;
             case 4:
               $('.ui-slider-range').css( {"background-color": "#FFAA00"});
               $('.ui-widget-content').css( {"background-color": "#FFAA00"});
               break;
             case 5:
               $('.ui-slider-range').css( {"background-color": "#FFFF00"});
               $('.ui-widget-content').css( {"background-color": "#FFFF00"});
               break;
             case 6:
               $('.ui-slider-range').css( {"background-color": "#CCFF00"});
               $('.ui-widget-content').css( {"background-color": "#CCFF00"});
               break;
             case 7:
               $('.ui-slider-range').css( {"background-color": "#99FF00"});
               $('.ui-widget-content').css( {"background-color": "#99FF00"});
               break;
             case 8:
               $('.ui-slider-range').css( {"background-color": "#66FF00"});
               $('.ui-widget-content').css( {"background-color": "#66FF00"});
               break;
             case 9:
               $('.ui-slider-range').css( {"background-color": "#33FF00"});
               $('.ui-widget-content').css( {"background-color": "#33FF00"});
               break;
             case 10:
               $('.ui-slider-range').css( {"background-color": "#00FF00"});
               $('.ui-widget-content').css( {"background-color": "#00FF00"});
               break;
             default:
               $('.ui-slider-range').css( {"background-color": "grey"});
               $('.ui-widget-content').css( {"background-color": "grey"});
          }

          }
        });
        $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
      };

      function init() {
        console.log('slider scripts loaded');

        navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          $('#lat').attr('value', lat);
          $('#lon').attr('value', lon);
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

        // collection of a user's ratings
        var RatingCollection = Backbone.Collection.extend({
        model: Rating,
        url: '/api/ratings'
        });


        var ratings = new RatingCollection();



        $('.create-rating').on('submit', function(e){
          e.preventDefault();
          var data = $(this).serializeJSON();
          ratings.create(data.rating);
          window.location.replace('/users/map_view')
        });
      }


      // #FF0000 1
      // #FF3300 2
      // #FF6600 3
      // #FFAA00 4
      // #FFFF00 5
      // #CCFF00 6
      // #99FF00 7
      // #66FF00 8
      // #33FF00 9
      // #00FF00 10
