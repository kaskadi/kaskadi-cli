#!/bin/sh
GIT_WORK_TREE={{working-copy}} git checkout -f
PWD="$(pwd)"
cd {{working-copy}}
if [ -f {{working-copy}}/package.json ]
 then
  npm i &>/dev/null
  if [ "$(npm run | { grep "^  build" || true; })" ]
    then
      npm run build &>/dev/null
  fi
fi
PUBLIC_DIR="{{working-copy}}/public"
BUILD_DIR="{{working-copy}}/build"
DIRS=( $PUBLIC_DIR $BUILD_DIR )
for dir in "${DIRS[@]}"
do
  if [ -d $dir ]
    then
      chown -R git:www-data $dir
  fi
done
cd $PWD