# notes-backend
This is the result of a code challange

## requirements to run:
* docker and docker-compose

## requirements to run tests:
* Node.js > 12

## How to run:
```
$ docker-compose up
```

## How to run tests:
```
$ npm install
$ npm run test
```

### Authentication
This project uses JWT and has this default information:

algo: HS256
secret: jwt-secret

to generate a new valid token http://jwtbuilder.jamiekurtz.com/

The JWT require the `sub` claim and is how it extracts the user information.


## How to use the API
I add a documentation that can be imported with postman, or you can (visit this page)[https://documenter.getpostman.com/view/10661620/TzCL9UXD]

### NOTES:
* this doesn't handle nicely validation errors
