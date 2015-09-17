              // RUNS INIT ON DOCUMENT READY

$(document).ready(function() {
  init();
});

function init() {

  console.log('profile scripts loaded');

              // PLACES TOKEN

  var token = $('#api-token').val();
  $.ajaxSetup({
    headers:{
      "accept": "application/json",
      "token": token
  }
  });

            // RATING MODEL

  var Rating = Backbone.Model.extend({
    defaults: {
      "mood": 5,
      "comment": "whatevs",
      "latitude": 90,
      "longitude": 0

    }
  });

            // RATING BACKBONE VIEW, USES UNDERSCORE TEMPLATE TO RENDER

  var RatingView = Backbone.View.extend({
    tagName: 'tr',
    className: 'rating',
    template: _.template( $('#profile-rating-template').html() ),
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

          // RATING BACKBONE LIST VIEW, APPENDS VIEWS AND RENDERS, ALSO GRABS LOCATION

  var RatingListView = Backbone.View.extend({
    initialize: function(){
      this.listenTo(this.collection, 'add', this.render);
    },
    render: function(){
      this.$el.empty();
      var ratings = this.collection.models;
      var view;
      for (var i = 0; i < ratings.length; i++) {
        view = new RatingView({model: ratings[i]});
        view.render();
        this.$el.append( view.$el );
      }
    }
  });

  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    $('#lat').attr('value', lat);
    $('#lon').attr('value', lon);
  });

              // COLLECTION OF USER RATINGS IN RATINGS API

  var RatingCollection = Backbone.Collection.extend({
  model: Rating,
  url: '/api/ratings'
  });


  var ratings = new RatingCollection();

  var RatingPainter = new RatingListView({
    collection: ratings,
    el: $('#ratings-list')
  });

  ratings.fetch();

  $('.create-rating').on('submit', function(e){
    e.preventDefault();
    var data = $(this).serializeJSON();
    ratings.create(data.rating);
  });

}
