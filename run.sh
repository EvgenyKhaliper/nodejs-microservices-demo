#!/bin/bash
kill $(ps aux | grep 'api.js' | awk '{print $2}')
kill $(ps aux | grep 'blogs.js' | awk '{print $2}')
kill $(ps aux | grep 'users.js' | awk '{print $2}')
kill $(ps aux | grep 'db.js' | awk '{print $2}')
(cd api-gateway && node api.js localhost:3002 localhost:3001) &
(cd users-ms && node users.js localhost:3004) &
(cd blogs-ms && node blogs.js localhost:3004) &
(cd db-ms && node db.js) &