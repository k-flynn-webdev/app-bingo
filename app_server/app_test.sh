#!/bin/bash

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

# set node env to production on live server, development otherwise
export NODE_ENV="test"

npm test

