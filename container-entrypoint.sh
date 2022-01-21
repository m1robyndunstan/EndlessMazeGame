#!/bin/sh
# check to see if we need to run yarn
if [ ! -d endless-maze-game/node_modules ] || [ ! -L ebdless-maze-game/node_modules] ; then
    (cd endless-maze-game ; ln -s ../node_modules .)
fi

pwd
echo "change directory"
cd endless-maze-game
pwd
echo "run server and watch"
yarn run watch
