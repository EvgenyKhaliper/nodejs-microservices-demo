#!/bin/bash

cd api-gateway && npm install && cd -;
cd db && npm install && cd -;
cd order-service && npm install && cd -;
cd payment-service && npm install && cd -;