# Nodejs CRUD On User

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|CORS           | Cors accepted values            | "*"      |


# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


# Getting started
- Clone the repository
```
git clone  https://github.com/mammadsafar/company_employee_mongoose.git
```
- Install dependencies
```
cd company_employee_mongoose
install mongodb
npm install
npm install nodemon
```
- Build and run the project
```
npm start
```
Navigate to `http://localhost:3000/`

For use api you should install [postman](https://www.postman.com/downloads/)
and import postman api from `api.json`



# Common Issues

## npm install fails
The current solution has an example for using a private npm repository. if you want to use the public npm repository, remove the .npmrc file.


