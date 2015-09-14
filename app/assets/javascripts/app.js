$(document).ready(function() {
  init();
});


function init() {

console.log('scripts loaded');
<<<<<<< HEAD
=======


navigator.geolocation.getCurrentPosition(function(position) {
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  $('#lat').attr('value', lat);
  $('#lon').attr('value', lon);
});

>>>>>>> f8647a04f22e68918ddc3dea43e7ef32ff6d5ef0

var token = $('#api-token').val();
$.ajaxSetup({
  headers:{
    "accept": "application/json",
    "token": token
}
});
//model
var Rating = Backbone.Model.extend({
  defaults: {
    "mood": 5,
    "comment": "whatevs"

  }
});
//collection
var RatingCollection = Backbone.Collection.extend({
model: Rating,
url: '/api/ratings'
});

var MapRatingCollection = Backbone.Collection.extend({
  model: Rating,
  url: '/api/ratings/map_ratings'
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
    var ratings = this.collection.models;
    var view;
    for (var i = 0; i < ratings.length; i++) {
      view = new RatingView({model: ratings[i]});
      view.render();
      this.$el.append( view.$el );
    }
  }
});


var ratings = new RatingCollection();
var mapRatings = new MapRatingCollection();
var RatingPainter = new RatingListView({
  collection: ratings,
  el: $('#ratings-list')
});
var MapRatingPainter = new RatingListView({
  collection: mapRatings,
  el: $('#map-ratings-list')
});
ratings.fetch();
mapRatings.fetch();

/*
$('form.create-rating').on('submit', function(e){
  e.preventDefault();
  var newRating = $(this).find("#rating-post").val();
  ratings.create({mood: newRating});
});
*/

$('.create-rating').on('submit', function(e){
  e.preventDefault();
  var data = $(this).serializeJSON();
  ratings.create(data.rating);
});

}

//
// var token = $('#api-token').val();
// $.ajaxSetup({
//   headers:{
//     "accept": "application/json",
//     "token": token
// }
// });
// //model
// var Rating = Backbone.Model.extend({});
// //collection
// var RatingCollection = Backbone.Collection.extend({
// model: Rating,
// url: 'api/ratings'
// });
// //views

// var RatingView = Backbone.View.extend({
//   tagName: 'div',
//   className: 'rating',
//   template: _.template( $('#rating-template').html() ),
//   render: function(){
//     this.$el.empty();
//     var html = this.template( this.model.toJSON() );
//     var $html = $( html );
//     this.$el.append( $html );
//   },
//   events:{
//     'click button.remove': 'removeRating'
//   },
//   removeRating: function(){
//     this.model.destroy();
//     this.$el.remove();
//   }
//
// });
//
// var RatingListView = Backbone.View.extend({
//   initialize: function(){
//     this.listenTo(this.collection, 'add', this.render);
//   },
//   render: function(){
//     this.$el.empty();
//     var ratings = this.collection.models;
//     var view;
//     for (var i = 0; i < ratings.length; i++) {
//       view = new RatingView({model: ratings[i]});
//       view.render();
//       this.$el.append( view.$el );
//     }
//   }
// });
//
//
// var ratings = new RatingCollection();
// var RatingPainter = new RatingListView({
//   collection: ratings,
//   el: $('#ratings-list')
// });
// ratings.fetch();
//
//
// $('form.create-rating').on('submit', function(e){
//   e.preventDefault();
//   var newRating = $(this).find("#rating-post").val();
//   ratings.create({mood: newRating});
// });
