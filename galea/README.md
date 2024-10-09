# Galea
## Component overview
Galea is the component used for deploying and managing plugins via [__helm__](https://helm.sh/) deployment. The service's functionalities are wrapped into an _API server_.
Galea is also provides caching of the results in order to speed up resource reading on demand.

## Endpoints and Functionalities
- **_Plugin installing_** 
    Endpoint: /plugins
    Methods: POST, PUT
    Functionality: Installs (deploys) or upgrades (rollouts) plugins via _helm_
- **_Plugins reading_**
    Endpoint: /plugins
    Methods: GET
    Functionality: Reads all plugins release details from _helm_
- **_Plugin uninstalling_**
    Endpoint: /plugins/_<plugin>_
    Methods: DELETE
    Functionality: Uninstalls (deletes) plugin via _helm_

## Requirements
- Python packages (and their dependencies):
    - Flask[async]
    - pyhelm3
- Applications:
    - [helm]((https://helm.sh/))

## Notes
Build docker image with __build.sh__ and deploy with __launch.sh__

## ToDo:
- Schedule task for refreshing cached plugins releases.
- Review README.md.
    