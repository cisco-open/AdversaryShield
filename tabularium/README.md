# Tabularium
## Component overview
Tabularium is the component used for storing defense data and their parameters into a MySQL DataBase. The service's functionalities are wrapped into an _API server_.

## Endpoints and Functionalities
- **_Defense creation_** 
    Endpoint: /defenses
    Methods: POST
    Functionality: Creates defense record and its parameters within MySQL DB
- **_Defenses reading_**
    Endpoint: /defenses
    Methods: GET
    Functionality: Reads all defenses details and their parameters from DB
- **_Defense reading_**
    Endpoint: /defenses/_<defense>_
    Methods: GET
    Functionality: Reads defense details and its parameters from DB
- **_Defense update_**
    Endpoint: /defenses
    Methods: PUT
    Functionality: Updates defense details and parameters into DB
- **_Defense deletion_**
    Endpoint: /defenses/delete
    Methods: POST
    Functionality: Deletes one or more defense records from MySQL DB based on JSON payload

## Requirements
- Python packages (and their dependencies):
    - Flask
    - PyMySQL

## Notes
Build docker image with __build.sh__ and deploy with __launch.sh__

## ToDo:
- Run test endpoint;
- Communication with Galea (API calls or Kafka?);
- Review README.md.
    