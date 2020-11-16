[![Build status](https://img.shields.io/github/workflow/status/kaskadi/working-data/build?label=build&logo=mocha)](https://github.com/kaskadi/working-data/actions?query=workflow%3Abuild)
[![Static code analysis status](https://img.shields.io/github/workflow/status/kaskadi/working-data/analyze-code?label=codeQL&logo=github)](https://github.com/kaskadi/working-data/actions?query=workflow%3Aanalyze-code)
[![Docs generation status](https://img.shields.io/github/workflow/status/kaskadi/working-data/generate-docs?label=docs&logo=read-the-docs)](https://github.com/kaskadi/working-data/actions?query=workflow%3Agenerate-docs)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/working-data?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/working-data)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/working-data?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/working-data)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/working-data?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/working-data)

<!-- You can add badges inside of this section if you'd like -->

****

# Testing

`mocha`, `chai`, `nyc` & `standard` are available as dev dependencies.

A `build` workflow (see [here](./.github/workflows/build.yml)) is running on `pull request` and will execute your test suite before allowing you to merge your PR. It also has a `coverage` job already prepared that you can comment out as soon as your testing is in place and your `REPORTER_ID` is in the repository secrets. This is the ID on _Code Climate_ used for uploading code coverage reports.

Beside running your unit tests, this workflow also runs a static code analysis to find any vulnerability in your code. If a vulnerability is found, the workflow will directly fail and a notification will appear in the `Security` tab of your repository.

**Note:** a `analyze-code` workflow (see [here](./.github/workflows/analyze-code.yml)) is also in charge of performing a static code analysis on `push`. This ensure that vulnerabilities are catched even when pushing hotfixes.

****

# Documentation

This repository comes with a `generate-docs` workflow that generates documentation automatically for you based on your `action.yml`. See [here](https://github.com/kaskadi/action-generate-docs) and [there](./action.yml) for more information.

If you would like to see the workflow configuration, head [here](./.github/workflows/generate-docs.yml).

You can configure the template used to generate the action documentation [here](./docs/template.md)

****

<!-- automatically generated documentation will be placed in here -->
{{>main}}
<!-- automatically generated documentation will be placed in here -->

<!-- You can customize this template as you'd like! -->