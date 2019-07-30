#!/bin/bash
pkill mongod
sleep 1s
mongod --bind_ip 127.0.0.1 &
sleep 1s

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

npm start
