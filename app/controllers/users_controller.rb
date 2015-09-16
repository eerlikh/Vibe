class UsersController < ApplicationController
  include SessionsHelper

#    users GET    /users(.:format)          users#index
  def index
    @users = User.all
  end

  #          POST   /users(.:format)          users#create
  def create
    @user = User.new(user_params)
    @user.save
    redirect_to map_view_path
  end

  # new_user GET    /users/new(.:format)      users#new
  def new
    @user = User.new
  end

  #edit_user GET    /users/:id/edit(.:format) users#edit
  def edit
      @user = current_user
  end

  def profile
    return nil unless authenticate!
    @user = current_user
    #render layout: "profile_layout"
  end

  #          PATCH  /users/:id(.:format)      users#update
  #          PUT    /users/:id(.:format)      users#update
  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to user_profile_path
  end
  #          DELETE /users/:id(.:format)      users#destroy
  def destroy
    @user.find(params[:id])
    @user.delete
    redirect_to root_path
  end

  def log_in
  end

  def new_rating
    return nil unless authenticate!
    @user = current_user
    @ratings = Rating.all
  end

  def log_out
    session[:user_id] = nil
    redirect_to root_path
  end

  def map_view
    return nil unless authenticate!
    @user = current_user
    @ratings = Rating.all
    #render layout: "map_layout"
  end

  private

  def user_params
    params.require(:user).permit(:username, :first_name, :last_name, :email, :address, :city, :state, :zip, :password, :password_confirm)
  end


end
