class UsersController < ApplicationController
  include SessionsHelper

#   users GET    /users(.:format)          users#index

  def index
    @users = User.all
  end


#   validate username

 def validate_username
   if User.exists?(:username => user_params['username'])
     render json: { "valid" => false }
   else
     render json: { "valid" => true }
   end

 end



#   POST   /users(.:format)          users#create

  def create
    @user = User.new(user_params)
    @user.image_url = params[:image_url] || "http://www.clipartbest.com/cliparts/4ib/Kz7/4ibKz78KT.gif"
    @user.save
    puts(@user.errors.full_messages)

    redirect_to log_in_path
  end

#   new_user GET    /users/new(.:format)      users#new

  def new
    @user = User.new
  end

#   edit_user GET    /users/:id/edit(.:format) users#edit

  def edit
    @user = current_user
  end

#   user_profile GET    /users/profile(.:format)           users#profile

  def profile
    return nil unless authenticate!
    @user = current_user
    #render layout: "profile_layout"
  end

#   PATCH  /users/:id(.:format)      users#update
#   PUT    /users/:id(.:format)      users#update

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to user_profile_path
  end

#   DELETE /users/:id(.:format)      users#destroy

  def destroy
    @user.find(params[:id])
    @user.delete
    redirect_to root_path
  end

#   log_in GET    /users/log_in(.:format)            users#log_in

  def log_in
  end

#   new_rating GET    /users/vibe(.:format)              users#new_rating

  def new_rating
    return nil unless authenticate!
    @user = current_user
    @ratings = Rating.all
  end

#   get_log_out GET    /users/log_out(.:format)           users#log_out

  def log_out
    session[:user_id] = nil
    redirect_to root_path
  end

#   map_view GET    /users/map_view(.:format)          users#map_view

  def map_view
    return nil unless authenticate!
    @changeClass = "superContainer"
    @user = current_user
    @ratings = Rating.all
    #render layout: "map_layout"
  end

#   defines user params

  private

  def user_params
    params.require(:user).permit(:username, :first_name, :last_name, :email, :address, :city, :state, :zip, :password, :password_confirmation, :image_url)
  end

end
