# Project Setup

## Conventional commits

[Conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) is a commit message format [specification](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional) which one should follow while commiting code.

We will use [commit lint](https://commitlint.js.org/#/) library and will enforce this via [git hook](https://git-scm.com/docs/githooks) and for this we will use [husky](https://typicode.github.io/husky/)

Install and `husky` and `commitlint` libraries

```bash
npx husky-init && npm install
npm install @commitlint/{cli,config-conventional}
```

now create husky hook which will check the commit message format, which should be in the format of conventional commits. for this create a file `commit-msg` in `.husky` folder.

```bash
#!/bin/sh

. "$(dirname "$0")/_/husky.sh"


npx --no-install commitlint --edit "$1"
```

you can also create this file using `git add .husky/commit-msg` command.

now make this shell script executable (for linux/mac only)

```bash
chmod +x .husky/commit-msg
```

now create `commitlint.config.js` file in root directory which extends the rules from config-conventional

```json
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

```

This setup will ensure that developer will never be able to commit any change without following conventional commit specifications. To was the work you may use `conventional commit` extension in visual studio code. The Extension ID of the extension is `vivaxy.vscode-conventional-commits`.
