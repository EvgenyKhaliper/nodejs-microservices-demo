#!/bin/bash
kill $(ps aux | grep 'app.js' | awk '{print $2}')
(cd api-gateway && node app.js localhost:3001 localhost:3002) &
(cd order-service && node app.js localhost:3001 localhost:3004) &
(cd payment-service && node app.js localhost:3004) &
(cd db && node app.js) &