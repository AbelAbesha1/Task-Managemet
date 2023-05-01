# Task-Managemet

Request Body
user_email - email of the user who owns the task
title - title of the task
progress - progress of the task
date - date of the task
DELETE /tasks/:id
Deletes a task from the database.

Parameters
id - ID of the task to delete
POST /signup
Creates a new user account.

Request Body
Email - email of the user to create
Password - password of the user to create
POST /login
Logs in a user.

Request Body
Email - email of the user to log in
Password - password of the user to log in
Authentication
This API uses JWT-based authentication. To authenticate a request, include a JSON Web Token in the Authorization header of the request. The token can be obtained by calling the /signup or /login endpoints.




