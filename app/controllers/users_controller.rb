class UsersController < ApplicationController

#    users GET    /users(.:format)          users#index
  def index
    @users = user.all
  end

  #          POST   /users(.:format)          users#create
  def create
    @user = User.new(user_params)
    @user.save
    redirect_to root_path
  end

  # new_user GET    /users/new(.:format)      users#new
  def new
    @user = User.new
  end

  #edit_user GET    /users/:id/edit(.:format) users#edit
  def edit
    @user = User.find(params[:id])
  end

  #     user GET    /users/:id(.:format)      users#show
  def show
    @user = User.find(params[:id])
  end

  #          PATCH  /users/:id(.:format)      users#update
  #          PUT    /users/:id(.:format)      users#update
  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to user_path(@user)
  end
  #          DELETE /users/:id(.:format)      users#destroy
  def destroy
    @user.find(params[:id])
    @user.delete
    redirect_to root_path
  end

  def log_in

  end

  private

  def user_params
    params.require(:user).permit(:username, :first_name, :last_name, :email, :address, :city, :state, :zip, :password, :password_confirm)
  end


end