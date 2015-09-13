$(document).ready(function() {
  init();
})


function init() {

console.log('scripts loaded');

var token = $('#api-token').val();
$.ajaxSetup({
  headers:{
    "accept": "application/json",
    "token": token
}
});
//model
var Rating = Backbone.Model.extend({});
//collection
var RatingCollection = Backbone.Collection.extend({
model: Rating,
url: '/api/ratings'
});
//views
var RatingView = Backbone.View.extend({
  tagName: 'div',
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
var RatingPainter = new RatingListView({
  collection: ratings,
  el: $('#ratings-list')
});
ratings.fetch();

/*
$('form.create-rating').on('submit', function(e){
  e.preventDefault();
  var newRating = $(this).find("#rating-post").val();
  ratings.create({mood: newRating});
});
<<<<<<< HEAD
=======
*/

$('.create-rating').on('submit', function(e){
  e.preventDefault();
  var data = $(this).serializeJSON();
  ratings.create(data.rating);
});

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
