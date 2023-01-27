# RESTful API
Tech-Stack: MonogoDB, Express, NodeJS

## Created end-points for Sales data, and Auth data for Users:

1) GET -> 'http://localhost:3000/sales/:id'

Retrieving data from MongoDB database

    if (:id === 'full') --> entire list of sales will fetch
    else --> single sales info will fetch


2) GET -> 'http://localhost:3000/authData/:id'

    if (:id === 'full') --> entire list of auth will fetch
    else --> single auth info will fetch
    
3) POST -> 'http://localhost:3000/authData/:username/:password'

  add a user with username and password to auth database

4) DELETE -> 'http://localhost:3000/authData/:id'

  delete a user's auth using its `id`
