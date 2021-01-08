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
cd $PWD