FORMAT: 1A

These are the APIs for the Gym Friend App. You can run run the below curl commands in terminal to test inividual API endpoint. Install jq to beautifly JSON response(`sudo apt install jq`).

# GET /
```
curl -X GET http://localhost:3000/
```
+ Response 200 (application/json; charset=utf-8)

        {"message": "Hello World!"}

# GET /createAdmin
```
curl -X GET http://localhost:3000/createAdmin
```
+ Response 200 (application/json; charset=utf-8)

        {"success": true }

# GET /api/
```
curl -X GET http://localhost:3000/api/
```
+ Response 200 (application/json; charset=utf-8)

        {"message": "Welcome to the coolest API on earth!" }

# GET /api/users
Need token to authenticate. First login with `/api/login` to get token. Then assign it to the "token" property of JSON request body.
```
curl -H "Content-Type: application/json" -X GET -d '{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmljayBDZXJtaW5hcmEiLCJpYXQiOjE0OTkzNDk2MDUsImV4cCI6MTQ5OTQzNjAwNX0.2c04rVsyIo3sWxf-gqqZZcrTOfq0i4mtkyA9sYK7qm0"}'  http://localhost:3000/api/users | jq
```
+ Request
    + Headers
        x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmljayBDZXJtaW5hcmEiLCJpYXQiOjE0OTkxODYxMjYsImV4cCI6MTQ5OTE4NzU2Nn0.RK9-vy0uCLBgKYSCAhkQGH1srhfqibKicgvTupHme2M

+ Response 200 (application/json; charset=utf-8)

        [{"username":"Nick Cerminara","password":"password","admin":true}]

# POST /api/login
```
curl -H "Content-Type: application/json" -X POST -d '{"username":"Nick Cerminara","password":"password"}' http://localhost:3000/api/login | jq
```
+ Request (application/json)
    + Body
        {
            "username": "Nick Cerminara",
            "password": "password"
        }
+ Response 200 (application/json; charset=utf-8)

        {"success":true,"message":"Enjoy your token!","token":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmljayBDZXJtaW5hcmEiLCJpYXQiOjE0OTkxODYxMjYsImV4cCI6MTQ5OTE4NzU2Nn0.RK9-vy0uCLBgKYSCAhkQGH1srhfqibKicgvTupHme2M"}}

# POST /api/users
Create a new user with provided name and password.
username and password are mandatory; others are optional; sports has to follow the format of sport schema
Currently hasn't define how to represent the unit for weight and tall (maybe just append unit after value? like these: 170cm, 5.6f, 60kg, 150lbs). I just use cm/kg in this example.
```
curl -H "Content-Type: application/json" -X POST -d '{"username":"ben1","password":"pass1","name":"benben","tall":170,"weight":60,"sports":[{"name":"swim"},{"name":"gym"}]}' http://localhost:3000/api/users | jq
```
+ Request (application/json)
    + Body
        {
            "username": "ben",
            "password": "pass1",
            "name": "benben",
            "tall": "170",
            "weight": "60",
            "sports": [{"name": "swim", "name": "gym"}]
        }
+ Response 200 (application/json; charset=utf-8)

        {"success":true,"message":"Enjoy your token!","token":{"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmljayBDZXJtaW5hcmEiLCJpYXQiOjE0OTkxODYxMjYsImV4cCI6MTQ5OTE4NzU2Nn0.RK9-vy0uCLBgKYSCAhkQGH1srhfqibKicgvTupHme2M"}}
