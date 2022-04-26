#!/bin/sh
pwd
# check to see if we need to run yarn
if [ ! -d /app/endless-maze-game/node_modules ] || [ ! -L /app/endless-maze-game/node_modules] ; then
    (cd /app/endless-maze-game ; ln -s ../node_modules .)
fi

ls
echo "change directory"
cd /app/endless-maze-game
pwd
echo "run server and watch"
ng serve --host 0.0.0.0 --watch
