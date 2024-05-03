## StreamFlix Backend

This backend was built in Java using Spring Boot. The dependencies used were Spring Data JPA, Spring Web,
Spring Session, Redis, Java Mail Sender, and PostgreSQL for the database.

If you want to run this on your machine you may need to update the application properties to take into account.
- The location of your database.
- The credentials of your database.
- The information for the email address that is used to send reset passwords.


The server runs at http://localhost:8080

## About SteamFlix

The focus of the backend are the Users and Movie models. These two are connected by the orders table that shows what movies that a user has purchased.
There is also a table for one time passwords that can be sent to reset a users password.

## RESTapi Endpoints

There are many different endpoints configured on this backend. They are broken down into two categories. The ones that deal with the Users and ones that focus on movies.

Many of these endpoints require an Http session which should be handled automatically if you are correctly using this backend with the StreamFlix frontend.

### User Controller Endpoints

- POST "/users/login" is used to login. It requires a username and password to be passed in the request body.
- GET "/users/session" is used to get the logged in user when a valid http session is present.
- GET "/users/admin" is used to check if the current http session user is an admin.
- POST "/users/logout" is used to logout the current http session user.
- GET "/users/myMovies" is used to get all the movies purchased by the current user.
- GET "/users/admin/{id}" is used to get a users purchased movies by their id. The http session user must be an admin.
- POST "/users/{email}/forgotPassword" is uesd to begin the process of changing a users password. This sends an email with a one time password to the email address if the email address is valid.
- POST"/users/{email}/verifyEmail/{otp}" is the middle step in resetting a users password. This verifies that the otp provided by the user is correct.
- PATCH "/users/resetPassword" is the final step in resetting a users password. In this step the new password is provided and the user is updated.
- PATCH "/users/admin/setAdmin/{id}" is used to give the user whose Id is provided admin privileges. The http session user must be an admin.
- PATCH "/users/addMoney" is used to add money to a users account. The amount is provided in the request body.
- GET "/users" is used to get a list of all users. The http session user must be an admin.
- POST "/register" is used to register a new user. The new user is passed in the request body.

### Movie Controller Endpoints

- POST "/movies" is used to create a movie. It requires a movie to be passed in the request body.
- GET "/movies/{id}" is used to get a movie by its id.
- GET "/movies" is used to get all movies. There must be a logged in user.
- GET "/movies/store" is used to get all of the movies that the http session user does not own.
- PUT "/movies/{id}" is used to update a movie. The id is the id of the movie to update. The updated movie is passed in the request body and the http session user must be an admin.
- DELETE "/movies/{id}" is used to delete a movie by its id. The http session user must be an admin.
- POST "movies/buy/{id}" is used for a user to purchase a movie. The movie is retrieved by its id and added to the http session users account.


   # StreamFlix Front End Dependencies

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project was build with React using Typescript and CSS.

To install the necessary packages for this project run the command `npm install`

Some of the packages we used are Axios, React Router, and Bootstrap.

## About StreamFlix

This is a Singlepage application that interacts with a Spring Boot Server hosted at http://localhost:8080

The application has functionality for a normal user to:
- Create an account
- Log in and out of your account
- View a list of movies available for purchase
- Add funds to your account
- Purchase movies
- View a movies details
- Reset your password

The application has functionality for an admin to:
- Add movies to the app
- Edit the information of a movie
- Delete movies
- View a list of Users
- Give a user admin privileges
- View the movies purchased by each user

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
