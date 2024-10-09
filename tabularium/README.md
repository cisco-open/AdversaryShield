# Tabularium
## Component overview
Tabularium is the component used for storing plugin data and their parameters into a MySQL DataBase. The service's functionalities are wrapped into an _API server_.

## Endpoints and Functionalities
- **_Plugin creation_** 
    Endpoint: /plugins
    Methods: POST
    Functionality: Creates plugin record and its parameters within MySQL DB
- **_Plugins reading_**
    Endpoint: /plugins
    Methods: GET
    Functionality: Reads all plugins details and their parameters from DB
- **_Plugin reading_**
    Endpoint: /plugins/_<plugin>_
    Methods: GET
    Functionality: Reads plugin details and its parameters from DB
- **_Plugin update_**
    Endpoint: /plugins
    Methods: PUT
    Functionality: Updates plugin details and parameters into DB
- **_Plugin deletion_**
    Endpoint: /plugins/delete
    Methods: POST
    Functionality: Deletes one or more plugin records from MySQL DB based on JSON payload

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
    