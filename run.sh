#!/bin/bash
kill $(ps aux | grep 'api.js' | awk '{print $2}')
kill $(ps aux | grep 'post.js' | awk '{print $2}')
kill $(ps aux | grep 'user.js' | awk '{print $2}')
kill $(ps aux | grep 'db.js' | awk '{print $2}')
(cd api-gateway && node api.js localhost:3002 localhost:3001) &
(cd user-ms && node user.js localhost:3004) &
(cd post-ms && node post.js localhost:3004) &
(cd db-ms && node db.js) &