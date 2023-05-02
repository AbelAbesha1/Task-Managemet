# Task Mnanagement App
This is a RESTful API for a Task App, built using Node.js, Express, MySQL, and bcrypt.
## Installation
- Clone this repository.
1. Clone this repository
2. Install dependencies by running the following command:

            `npm install`

3. Start the server by running the following command:
           
           `npm run start`

The server will start listening on port 5000.


# Endpoints
## `GET /tasks/:userEmail`
 Returns a JSON array of all tasks for the specified user.
 ## parameters
`userEmail` - email of the user whose tasks should be retrieved
     
## `POST /tasks`
 Adds a new task to the database.
## Request body 
- `user_email` - email of the user who owns the task
- `title` - title of the task
-` progress` - progress of the task
- `date` - date of the task created
## `PUT /tasks/:id`
Updates a task in the database.
## parameters
`id` - ID of the task to update 
## Request body 
- `user_email` - email of the user who owns the task
- `title` - title of the task
-` progress` - progress of the task
- `date` - date of the task created

## `DELETE /tasks/:id`
Deletes a task from the database.
## parameters
`id` - ID of the task to delete 
 ## `POST /signup`
Creates a new user account.

## Request Body

`Email` - email of the user to create
`Password` - password of the user to create     
## `POST /login`
Logs in a user.

## Request Body

`Email` - email of the user to log in
`Password` - password of the user to log in  
# Authentication
This API uses JWT-based authentication. To authenticate a request, include a JSON Web Token in the Authorization header of the request. The token can be obtained by calling the /signup or /login endpoints.  
# Clinet Side 
  1. Install dependencies by running the following command:

            `npm install`
  2. Start the server by running the following command:
           
           `npm run start` or `npm start`
 # Database
  I used Mysql databse and mysql library to connect the databse 
  use the  `db.js ` file in the server folder to create the databse query 
