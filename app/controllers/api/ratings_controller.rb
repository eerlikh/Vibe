class Api::RatingsController < ApplicationController

include Api::RatingsHelper

before_action :current_api_user!

#   api_ratings GET    /api/ratings(.:format)             api/ratings#index

def index
  render json: @current_user.ratings
end

#   api_ratings_map_ratings GET    /api/ratings/map_ratings(.:format) api/ratings#map_ratings

def map_ratings
  render json: Rating.all
end

#   api_ratings_new_rating GET    /api/ratings/new_rating(.:format)  api/ratings#create

def create
  rating = @current_user.ratings.create(ratings_params)
  render json: rating
end

#    POST   /api/ratings(.:format)             api/ratings#create

def show
  render json: @current_user.ratings.find(params[:id])
end

#   DELETE /api/ratings/:id(.:format)         api/ratings#destroy

def destroy
  @current_user.ratings.destroy(params[:id])
  head :no_content
end

#   defines rating params

private
def ratings_params
  params.require(:rating).permit(:mood, :comment, :latitude, :longitude, :zip_code_id)
end
end
