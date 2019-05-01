#!/bin/bash
#!/usr/bin/env bash

script_location=$(dirname $0)
echo $script_location
cd $script_location
pwd

# cp -R ./ ~/studio_work/webdev/production/public/app_base_user/app_base_user_server
rsync -ar --exclude node_modules -exclude="*.git" ./ ~/studio_work/webdev/production/public/app_base_user/app_base_user_server

