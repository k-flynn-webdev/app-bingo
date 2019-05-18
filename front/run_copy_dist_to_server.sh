#!/bin/bash
#!/usr/bin/env bash

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd


cp -R ./dist/ ../app_server/public

