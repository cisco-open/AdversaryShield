eval $(minikube docker-env)
docker build -t "anmanea228/frontend" -f "$(dirname $0)/Dockerfile" .
docker push "anmanea228/frontend"