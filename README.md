# Blog_EJS
The primary goal of this project was simply practicing my back-end skills using node, express and ejs initially, then adding data persistence with PostgreSQL. In this case, the website I am developing is a blog, and the project is based on a challenge from the following web development course: https://www.udemy.com/course/the-complete-web-development-bootcamp/

## Features
1. Post Creation: Users should be able to create new posts.
2. Post Viewing: The home page should allow the user to view all their posts.
3. Post Update/Delete: Users should be edit and delete posts as needed.
4. Styling: The application should be well-styled and responsive, ensuring a good user 
experience on both desktop and mobile devices.

## Installation

```bash
$ npm install
```

## Database

You should add your database access information in a .env file created by you before running the app.

## Running the app

```bash
# development
$ node index.js

# watch mode
$ npm i -g nodemon #only-once installation
$ nodemon index.js
```
The app is accesed in http://localhost:3000/