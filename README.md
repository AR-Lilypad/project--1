# project--1 Team Project

Project design Title: WEATHER WEAR

Weather Wear is an app to offer clothing recommendatiion to users based on the weather conditions.   Personalized service recommendations based on customer profile parameters such as:
  1.  customer 
  2. length of day
  3. weather sensitivities (always cold, hot, or neutral)
  4. types of clothes customer typically wears: sweater person, t-shirt person, business casual.

  What the APP is going to do:

 # Open the to landing page
1. landing page - new user, return user
2. intro page slide show showing persons and weather situations
3. login-in page / return user 
   -- a get started here button is the first call to action to have the user "register" to open a personal profile
   -- on click down, a modal opens for user registration and at the bottom, if already registered, log in.
    -- registration modal takes the basic user information name, email, password 
   -- submit takes the user to a questionaire page soliciting the general personal information 
        -- age, commute, personal temperature range, and birthday, and zip code 
   -- upon submit, user will be taken to current weather conditions based on zip code
   -- information is in 3 hour blocks, date, time, temperature, ambient conditions ie cloudy, sunny, etd
   -- a recommendation of what to wear outside- wear a sweater
   -- and a cute giphy relative to the current weather

4. The app utilizes a Bootstrap Modal
5. Two api pulls:
        one from Weather API
        One from GIPHY
6.  and a firebase data base to store customer information

7.  What the app WILL NOT DO, use or store email addreses or login information as we are not there yet.
