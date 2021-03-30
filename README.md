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

### Tech choices:
* Docker: Emulate all tecnologies the application needs in a image and providering quick to consume;
* Node: It is quick to development and I am more familiar with this programming language at the moment;
* Typescript: It provide Typing and it help for handle values across the application; There are support the specification JS (EcmaScript);
It is good for maintenance
* Express: It is a framework to creating end point for NodeJS and it had a good implementation
* JWT: authentication to support multi users
* Mongo/Mongoose: Document repository with a schema validation.
* MockMongo/Jest/supertest: For behavihor test, unit test and end-to-end test. Thoses frameworks
JS is easy for tests implemation in Node development.
