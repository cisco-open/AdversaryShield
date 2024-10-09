# AdversaryShield

This project is being developed as a solution to mitigate adversial attacks on LLMs via automatic deployment of predefined plugins.

## Description

__AdversaryShield__ project is composed of three main services: 
- __Tabularium__ provides the administrator with an interface to CRUD plugins and store into the DB;
- __Galea__ creates the containers to run the plugins based on manager configuration and helm charts;

Other services used are:
- __\<Database\>__: Used to store user test suites.

## Service Diagram

![Diagram]([https://github.com/AdversaryShield/tree/main/Diagram.jpeg](https://github.com/cisco-open/AdversaryShield/blob/main/Diagram.jpeg))

## Getting started
### Dependencies
- Docker Engine (Docker Desktop)
- minikube
- Python

### Deploying

ToDo: Run the __launch.sh__ script.

### Usage

Launch the application and use the Strategos provided interface to store the plugins (and their parameters) via the plugins view.
__WIP__: The run view will provide the user with the posibility of running a prompt through the plugins towards the desired LLM and have the outputs filtered in case of adversial attacks. Outputs with respective inputs will be tracked within the database for later review of mitigations.

## Authors
- Charles Fleming (chfleming@cisco.com), Project Manager
- Vasile Vartic (vavartic@cisco.com), Frontend Developer
- Andrei Manea (anmanea@cisco.com), Backend Developer

## Version history

- alpha 0.1
    - Init

## License

Work in progress.
