#!/bin/bash

script_location=$(dirname $0)
echo $script_location/server
cd $script_location/server
pwd

git archive -o ../server.zip HEAD