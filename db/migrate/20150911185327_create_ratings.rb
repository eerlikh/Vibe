class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :mood
      t.string :comment
      t.decimal :latitude
      t.decimal :longitude
      t.integer :user_id
      t.integer :zip_code_id

      t.timestamps null: false
    end
  end
end
