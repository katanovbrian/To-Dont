### To-Don't 
## The Forgetful Task Manager
----- 
To-Don't forgets your tasks every day, just like you

## Deploy
------
1. Deploy the backend
    
    ~~~{bash}
        mongod &&
        nodemon app.js
    ~~~
    in `./backend/`
    
    use node instead of nodemon in production, nodemon is used for live reloading during developement

2. Deploy the frontend
    
    ~~~{bash}
        ng serve
    ~~~
    in `./frontend/`


## References
-----
Adapted from 
[this](https://www.youtube.com/watch?v=E-GA9GKJWuE)
Todo list tutorial for a MEAN Stack To-Do List