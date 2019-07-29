#!/bin/bash
pkill mongod

sleep 2s

mongod --bind_ip 127.0.0.1 &

sleep 2s

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

# set node env to production on live server, development otherwise
export NODE_ENV="test"

npm test

