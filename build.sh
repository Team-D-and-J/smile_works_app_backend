#!/bin/bash

git pull

TAG=$(date +%Y.%m.%d.%H.%M)
echo "Building smile_works_app_backend:$TAG"

docker build -t smile_works_app_backend:"$TAG" .

