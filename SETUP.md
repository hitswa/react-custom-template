# Project Setup

## Semantic Versioning

### Conventional commits

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

### Versioning

There are various type of `silly` or `geeky` versioning as following

- build number versioning
- [calendar versioning](https://calver.org/)
- [sematic versioning](https://semver.org/) (<-- what we are using)
- marketing versioning
- milestone versioning
- random versioning

We are using [standard version](https://github.com/conventional-changelog/standard-version) package to implement [conventional changelog configuration spec](https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.2.0/README.md#premajor-boolean) in the project.

install `standard-version` library. This library uses conventional commit messages to extract messages to be added in `CHANGELOG.md` file. However, it is deprecated as per library readme but it is working fine specially if someone wish to implement versioning independently in code, i.e. without any external DevOps tool like GitOps etc.

```bash
npm i --save-dev standard-version
```

now, add scripts in `package.json` file.

```json
"scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:patch": "standard-version --release-as patch",
    "release:major": "standard-version --release-as major"
},
```

now create `.versionrc.json` file to setup changelog log settings. please read [conventional changelog configuration spec](https://github.com/conventional-changelog/conventional-changelog-config-spec/blob/master/versions/2.2.0/README.md#premajor-boolean) documentation to understand and customize these settings as per your need

```json
{
    "types": [
      { "type": "build", "section": "Features", "hidden": false },
      { "type": "chore", "section": "", "hidden": true },
      { "type": "ci", "section": "", "hidden": true }, 
      { "type": "docs", "section": "Document", "hidden": false },
      { "type": "feat", "section": "Features", "hidden": false },
      { "type": "fix", "section": "Fixes", "hidden": false }, 
      { "type": "perf", "section": "Fixes", "hidden": false }, 
      { "type": "refactor", "section": "Fixes", "hidden": false },
      { "type": "revert", "section": "Revert", "hidden": false } 
      { "type": "style", "section": "Style", "hidden": false },
      { "type": "test", "section": "", "hidden": true }
    ],
    "commitUrlFormat": "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}",
    "compareUrlFormat": "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}",
    "issueUrlFormat": "{{host}}/{{owner}}/{{repository}}/issues/{{id}}",
    "userUrlFormat": "{{host}}/{{user}}"
}
```

Now, lets release your first version, this will create `CHANGELOG.md` file in your project root.

```bash
npm run release -- --first-release
```

```bash
# Following are the output of running the command
> template@0.1.0 release
> standard-version --first-release

✖ skip version bump on first release
✔ created CHANGELOG.md
✔ outputting changes to CHANGELOG.md
✔ committing CHANGELOG.md
✔ tagging release v0.1.0
ℹ Run `git push --follow-tags origin main` to publish
```

you can check version tag using `git tag` command

#### References

- [How To Automatically Generate A Helpful Changelog From Your Git Commit Messages](https://mokkapps.de/blog/how-to-automatically-generate-a-helpful-changelog-from-your-git-commit-messages)
