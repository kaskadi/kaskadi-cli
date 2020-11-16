# What is this?

This is just a placeholder for any custom utilities you may need. This folder will be copied into `node_modules` in your layer everytime you run `npm i` (from here or from the root of the repository).

Therefore you can build this utilities folder in the same way as you would build a regular NPM package (with a `package.json` file pointing to a main file exporting utilities for example) and simply use `require('NAME_OF_YOUR_UTILITIES_FOLDER')` in your Lambda functions.