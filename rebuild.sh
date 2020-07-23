#!/usr/bin/env bash

echo 'Pulling new code'
git pull --ff-only
echo 'Building to dist_rebuild'
docker-compose exec app node_modules/.bin/vue-cli-service build --dest dist_rebuild
echo 'Coping files from dist_rebuild to dist'
docker-compose exec app cp -fR ./dist_rebuild/* ./dist
echo 'Removing dist_rebuild'
docker-compose exec app rm -Rf dist_rebuild
echo 'DONE'