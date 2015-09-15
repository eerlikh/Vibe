Rails.application.routes.draw do


  get 'api/ratings/new_rating' => 'api/ratings#create'
  get 'api/ratings/map_ratings' => 'api/ratings#map_ratings'

  namespace :api do
    resources :ratings, except: [:new, :edit, :show]
  end



  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

  root 'welcome#index'
  get '/users/log_in' => 'users#log_in', as: :log_in
  get '/users/log_out' => 'users#log_out', as: :get_log_out

  resources :users, except: [:show]
  get '/users/profile' => 'users#profile', as: :user_profile
  get '/users/map_view' => 'users#map_view', as: :map_view
  get '/users/vibe' => 'users#new_rating', as: :new_rating

  post '/sessions' => 'sessions#create'
  delete '/sessions' => 'sessions#destroy', as: :log_out


  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
