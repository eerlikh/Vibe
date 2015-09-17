# checks if user has a token, throws 401 if current user token is not found

module Api::RatingsHelper

  def current_api_user!
    #byebug
    if token = params[:token] || env['HTTP_TOKEN']
      @current_user = User.find_by({token: token})
    else
      render json: {status => 401}
    end
  end

end
