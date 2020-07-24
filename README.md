# money-hunter

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### For production you can you docker-compose
```
docker-compose up -d
docker-compose logs -f app - wait until "DONE" message

Thats all. Then you can use ./rebuild.sh script for rebuild app
Also you can override docker-compose configuration using docker-compose.override.yml

P.S. Current nginx server instance dont support ssl, so if you want to use it 
     you must provide another instance (in docker-compose.override.yml for example) 
     with ssl or reconfigurate current
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
