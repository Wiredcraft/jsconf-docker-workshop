#!/bin/bash
set -ev
pushd `dirname $0`

docker-compose up -d  --build
docker-compose ps

