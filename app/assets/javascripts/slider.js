$(document).ready(function() {
  console.log("Slider time");
  init();
  setSlider();
});
function setSlider() {
  $( "#slider-range-max" ).slider({
    orientation: "vertical",
    range: "min",
    min: 0,
    max: 10,
    value: 10,
    slide: function( event, ui ) {
      $( "#amount" ).val( ui.value );

      var ratingColor = ui.value;
          switch (ratingColor) {
             case 0:
               $('.ui-slider-range').css( {"background-color": "#BF1E2E"});
               $('.ui-widget-content').css( {"background-color": "#BF1E2E"});
             case 1:
               $('.ui-slider-range').css( {"background-color": "#EF4036"});
               $('.ui-widget-content').css( {"background-color": "#EF4036"});
               break;
             case 2:
               $('.ui-slider-range').css( {"background-color": "#F1592A"});
               $('.ui-widget-content').css( {"background-color": "#F1592A"});
               break;
             case 3:
               $('.ui-slider-range').css( {"background-color": "#F7941E"});
               $('.ui-widget-content').css( {"background-color": "#F7941E"});
               break;
             case 4:
               $('.ui-slider-range').css( {"background-color": "#FCB040"});
               $('.ui-widget-content').css( {"background-color": "#FCB040"});
               break;
             case 5:
               $('.ui-slider-range').css( {"background-color": "#F5EE31"});
               $('.ui-widget-content').css( {"background-color": "#F5EE31"});
               break;
             case 6:
               $('.ui-slider-range').css( {"background-color": "#D7DF21"});
               $('.ui-widget-content').css( {"background-color": "#D7DF21"});
               break;
             case 7:
               $('.ui-slider-range').css( {"background-color": "#8CC63F"});
               $('.ui-widget-content').css( {"background-color": "#8CC63F"});
               break;
             case 8:
               $('.ui-slider-range').css( {"background-color": "#39B54A"});
               $('.ui-widget-content').css( {"background-color": "#39B54A"});
               break;
             case 9:
               $('.ui-slider-range').css( {"background-color": "#0B9444"});
               $('.ui-widget-content').css( {"background-color": "#0B9444"});
               break;
             case 10:
               $('.ui-slider-range').css( {"background-color": "#056839"});
               $('.ui-widget-content').css( {"background-color": "#056839"});
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
