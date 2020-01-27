#!/bin/bash
getVersion() {
  node -e "console.log(require('./package.json').version)"
}
# create .npmrc file for authenticating user
touch ~/.npmrc
echo "_auth=\"$NPM_TOKEN\"
email=a.lemaire@klimapartner.de
always-auth=true" > ~/.npmrc
# compare current and remote version
CURRENT_VERSION="$(getVersion)"
REMOTE_VERSION="$(npm view kaskadi-cli version)"
if [ "$CURRENT_VERSION" == "$REMOTE_VERSION" ]
then
  npm --no-git-tag-version version patch
  CURRENT_VERSION="$(getVersion)"
fi
git config --global user.name 'Alexis Lemaire'
git config --global user.email 'a.lemaire@klimapartner.de'
git commit -am "Upgraded to $CURRENT_VERSION"
git push
npm publish
rm ~/.npmrc
