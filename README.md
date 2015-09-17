# [Vibe](https://morning-meadow-2120.herokuapp.com)
## A social media platform for measuring the mood of your world

Project Devs:
- Eduard Erlikh
- Matt Koski
- Sam Shull

Welcome to Vibe, a social network where you can express your feelings and compare them to those of the people around you. Vibe uses a simple color-coded map interface to display the anonymously-shared thoughts, moods, and feeling of the people in your immediate geographical area.  Using the geolocation capabilities of your computer, tablet, or smartphone, you can add your own "vibes" to the map and help create a visual representation of the emotional pulse of society.

### Concept:

Vibe is intended as a real-time visual representation of positive and negative emotions within a given geographical area. Users make posts, called "vibes", in which they rate their current feelings on a scale of 0 (worst) to 10 (best), and provide an optional message of up to 140 characters. User input is tied to the user's current geographical coordinates and plotted, anonymously, on a map that is visible to all other users. Vibes are displayed on the map as colored markers ranging on the RGB scale from Red (worst) to green (best), where yellow and orange are used to represent more neutral emotions. The map automatically centers on the user's current location, but it can be freely moved and zoomed to other areas as desired.

Potential applications for this app are wide ranging. Aside from allowing users to see how their emotions compare to those of their geographical neighbors, Vibe could potentially help users find areas of positive feeling (outdoor events, street fairs, etc.) and to avoid negative ones (traffic jams, subway delays, long lines).

### User Stories:
- As a user, I would like to be able to see a color-coded display of emotion in my geographical area, sort of like a radar weather map of good and bad feelings.
- As a user, I would like to be able to add my own thoughts and feelings, anonymously to the map and have them appear at my current location.

### Technologies Used:
![Vibe ERD](https://dl.dropboxusercontent.com/u/50332766/vibe_erd.png)

Vibe is built on a back-end using the Ruby on Rails framework and a PostgreSQL database, feeding data to Backbone and the Google Maps API on the client side.  The relational database stores data using a simple one to many relationship, in which every entry in the users table corresponds to many entries in the "vibes" table.  This allows each user to create as many vibes as he or she wishes, and each vibe can be associated with the user who created it.  The association between users and vibes is visible only internally.  Front-end users see only the content of each vibe, maintaining user anonymity.

The Google Maps API provides a straightforward way to display an interactive map based on the user's current latitude and longitude coordinates, determined using whatever geolocation capabilities are available to the individual user's web browser.  The choice of geolocation method is left to the HTML5 geolocation API (navigator.geolocation), ensuring location support across many desktop and mobile platforms. Once the user's location has been determined and a map has been drawn, vibe data served from our database is converted into Google Maps markers with info windows that display content when the markers are clicked. Google Maps allows developers to supply custom marker icons, and a simple switch statement provides logic to choose the appropriately-colored marker graphic based on the mood value of each vibe.

The front end of our app is styled using the Bootstrap CSS framework and is designed to be fully responsive and mobile-friendly. A slider input from the JQueryUI library allows for one-touch mood selection.
