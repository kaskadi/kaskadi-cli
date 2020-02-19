![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-layer/update?label=dependencies%20updated&logo=npm)
![](https://img.shields.io/github/workflow/status/kaskadi/template-kaskadi-layer/deploy?label=deployed&logo=Amazon%20AWS)

****

❌ **This section can be deleted when done with all the preliminary work** ❌

# :computer: Creating a new Lambda layer from this template :computer:

**Checklist (delete items when done)**
- create a new repository and choose this repository as template
- clone the new repository to a local working copy
- set secrets up ([help](#Set-secrets-up))
- install all dependencies via `npm i`
- update the `serverless.yml` config file for deployment as needed
- when you feel like your Lambda layer is ready for deployment, go [here](./.github/workflows/deploy.yml) and change the `command` field to `deploy -v`

**Attention:** if you wish to use kaskadi's CLI tools, make sure to have `kaskadi-cli` installed globally (`npm i -g kaskadi-cli`)

## Set secrets up

Before pushing for the first time, please setup secrets on this repository.

**Steps:**
- go to your [repositorys secrets setting](../../settings/secrets)
- click on _Add a new secret_ for each secret you want to add

**What secrets need to be set:**
- `AWS_KEY_ID`
- `AWS_KEY_SECRET`
- `SLS_DEPLOY_BUCKET`

`AWS_KEY_ID` & `AWS_KEY_SECRET`: those are the credentials of a role which has enough permission to publish a new Lambda layer.
`SLS_DEPLOY_BUCKET`: this is the bucket where the _Serverless_ build should be uploaded at deployment.

****

**This layer is updating its dependencies every Sunday at 7AM CET**

# What is this layer for?

:point_right: **Describe here what the layer is achieving** :point_left:

# How to install modules?

1. Go into `layer/nodejs`
2. Run `npm i -S <package>` to install any package you need for this layer
