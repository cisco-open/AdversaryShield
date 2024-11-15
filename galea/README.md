# Galea
## Component overview
Galea is the component used for deploying and managing defenses via [__helm__](https://helm.sh/) deployment. The service's functionalities are wrapped into an _API server_.
Galea is also provides caching of the results in order to speed up resource reading on demand.

## Endpoints and Functionalities
- **_Defense installing_** 
    Endpoint: /defenses
    Methods: POST, PUT
    Functionality: Installs (deploys) or upgrades (rollouts) defenses via _helm_
- **_Defenses reading_**
    Endpoint: /defenses
    Methods: GET
    Functionality: Reads all defenses release details from _helm_
- **_Defense uninstalling_**
    Endpoint: /defenses/_<defense>_
    Methods: DELETE
    Functionality: Uninstalls (deletes) defense via _helm_

## Requirements
- Python packages (and their dependencies):
    - Flask[async]
    - pyhelm3
- Applications:
    - [helm]((https://helm.sh/))

## Notes
Build docker image with __build.sh__ and deploy with __launch.sh__

## ToDo:
- Schedule task for refreshing cached defenses releases.
- Review README.md.
    