# Descripcion
NodeJS application interacting with the Facebook marketing API to search interests.
Main features:
- Layer architecture with endpoints, controllers and use cases.
- Mediator between controller and use cases.
- Container for dependency injection and singleton.
- Integration tests for the API.
- Validation for url search params.
- Error handling.
- Docker container.

# Setup
```
Create .env file in to root folder (see env_sample)
npm install
npm start
```

# Assignment
Create 2 endpoints to get Facebook ad interests information.

You can find documentation on how to get this data from Facebook here: 
https://developers.facebook.com/docs/marketing-api/audiences/reference/targeting-search/

#### 1. Create a GET endpoint that returns a JSON array with all Facebook interests (id + name)
In the docs search for type=adTargetingCategory&class=interests

E.g.
```
GET /interests
[
  {"id":"6007828099136", "name":"Luxury goods"},
  {"id":"6009422452499", "name":"Home and garden"}
  ...
]
```
Notes:
Some interests are deprecated/not deliverable. To verify the status, use the Targeting Status endpoint (search for type=targetingoptionstatus).
Only return ad interests with status "NORMAL"

#### 2. Create a GET endpoint that returns the total audience size for a provided set of ids

E.g.
```
GET /interests/audience-size?ids=6007828099136,6009422452499,...
{
    "totalAudienceSize": 12311525
}
```

# Setup with Docker
```
npm run docker:build
npm run docker:nodemodules-volume
npm run docker:run
```
