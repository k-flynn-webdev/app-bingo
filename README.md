<!-- # vue-basic-client-server -->
# Bullshit Bingo
<!-- A simple complete Vue.js client and Node.js server project. -->



## Goals
Create an online multiplayer bullshit bingo.
Easy to generate a board with multiple phrases/words and share with any number of people to join an online session. With the winner being announced to everyone currently playing.


wip video here: https://www.instagram.com/p/BumuGBPFBdn/


![shot](./docs/current.png?raw=true "current wip")


## Variables:

In order to run smoothly the following enviroment variables need to be supplied.

	IP / PORT : 		not required.
	HASHSECRET : 		required (long string).
	DATABASEURL : 		required (mongodb uri).
	TOKENSECRET : 		required (long string).
	ADMINPASSWORD : 	required (long string).
	NODE_ENV : 		not required, will default to debug.



## Config: 

Server options are loaded from a folder depending on the node_env (Test/Debug/Production) found here: `app_base_user_server/config/{ node_env profile }`

options available:

	string.min_size : 	string min size for user input.
	string.max_size : 	string max size for user input.
	role.guest : 		string role match.
	role.user : 		string role match.
	role.admin : 		string role match.
	file.max_size : 	file upload size.
	jsonSpaces : 		json cfg.
	port:		 		n/a.
	ip: 				n/a.
	rate.time : 		rate limiting time duration.
	rate.max : 			rate limiting allowed attempts.
	db : 				databse uri.
	hash.strength : 	bcrypt salt strength.
	token.secret : 		string to hash with.
	token.expiry : 		token expire date.

	

## To Run:

<!-- Working example here: https://warm-chamber-83596.herokuapp.com/

`NPM start` from the server folder will start the server and serve the front end on request.

You can also run the server and front end seperately. To run the front end `NPM serve` in order to run via the Vue-Cli. 
 -->


## Validation:

Validation middleware options available: 

	app_base_user_server/controllers/user.validate.js

	user.validate.create : 		Requires Name, Email and Password are supplied.
	user.validate.login : 		Requires Email and Password are supplied.

	user.validate.name : 		Sanitizes the name string. 
	user.validate.email :		Sanitizes the email string. 	
	user.validate.password : 	Sanitizes the password string. 



## Authentication:

All requests to a secured end point will go through a JWT middleware `token.check`. If an invalid or missing token is recieved a error message will be returned in a json response.

Example Request Header:

	Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y…EzNX0.EvrI6zeEwcmunonqt1ocPw-dzyoY-ZCUOqsLoPC1FDU

On successfull authorization the payload of the JWT will be available from `request.body.token.clean` or the raw string at `request.body.token.raw`.



## Authentication Blacklist:

All failed tokens are added to a token blacklist in the database.
Every time a user logs out or updates user details their current token is also added to the token blacklist.
Tokens are removed from the blacklist once they have expired by date.







