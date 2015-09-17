class SessionsController < ApplicationController

#   sessions POST   /sessions(.:format)                sessions#create

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to map_view_path
    else
      redirect_to root_path
    end
  end

#   log_out DELETE /sessions(.:format)                sessions#destroy

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end
end
