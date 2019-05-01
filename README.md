# vue-basic-client-server
A simple complete Vue.js client and Node.js server project.



## Goals
	
The goal of this repo was to create a simple secure project with the usual CRUD user operations and a admin dashboard.
The main frameworks used are JsonWebToken for authorization, Node-Express and MongoDB for the server side. With VueJS for the frontend and VueX store for managing local state. Designed mostly for phone use rather than desktop, updated css to come at a later date.

## Images

![home page](./docs/home.jpg?raw=true "home page")

![navbar](./docs/navbar_guest.jpg?raw=true "navbar")
![navbar](./docs/navbar_user.jpg?raw=true "navbar")
![navbar](./docs/navbar_admin.jpg?raw=true "navbar")

![account](./docs/account_login.jpg?raw=true "account")
![account](./docs/account_register.jpg?raw=true "account")
![account](./docs/account_logout.jpg?raw=true "account")
![account](./docs/account_show.jpg?raw=true "account")
![account](./docs/account_edit.gif?raw=true "account")

![admin](./docs/admin_panel.jpg?raw=true "admin")



## Client Page and access 
	
Path | visibility | description
------------- | ------------- | ------------- 
/					|	(all)			| Home page
/login				|	(guest)			| Account login
/register			|	(guest)			| Account creation
/account			|	(user/admin)	| Account info/edit
/logout				|	(user/admin)	| Account logout
/admin/request		|	(user)			| Admin account request
/admin				|	(admin)			| Admin dashboard



## Endpoints API and access:

Method | Path | accessability | description
------------ | ------------- | ------------- | ------------- 
GET 	|	/						| (open)	|	Vue.js package delivery.
POST 	|	/api/account/login		| (open)	|	Account login.
POST 	|	/api/account/create		| (open)	|	Account creation.
PUT 	|	/api/account/			| (secure)	|	Account update (requires token / token blacklisted).
DELETE 	|	/api/account/			| (secure)	|	Account delete (requires token / token blacklisted).
POST 	|	/api/account/logout		| (secure)	| 	Account logout (requires token / token blacklisted).
POST 	|	/api/admin/user/all		| (secure)	| 	Admin dashboard info of all users (requires admin token).
POST 	|	/api/admin/user/month	| (secure)	| 	Admin dashboard info last 30 days of users (requires admin token).
POST 	|	/api/admin/user/{ user-id } | (secure)	| Admin dashboard user edit (requires admin token).
DELETE 	|	/api/admin/user/{ user-id } | (secure)	| Admin dashboard user delete (requires admin token).
POST 	|	/api/admin/stats		| (secure)	| Admin dashboard database stats (requires admin token).
POST 	|	/api/admin/reset/{ collection } | (secure)	| Admin dashboard database stats (requires admin token).



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

Working example here: https://warm-chamber-83596.herokuapp.com/

`NPM start` from the server folder will start the server and serve the front end on request.

You can also run the server and front end seperately. To run the front end `NPM serve` in order to run via the Vue-Cli. 



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







