
# Project skeleton creation steps

These steps have been executed to create this project skeleton.
You don't need to repeat them, just [follow the README.md](README.md) and you're done!

## Install yarn

```sh
$ brew install yarn

$ yarn -v
1.9.4
```

## Install vue CLI

Following the [online docs](https://cli.vuejs.org/guide/installation.html#installation):

```sh
$ yarn global add @vue/cli
yarn global v1.9.4
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...
success Installed "@vue/cli@3.0.1" with binaries:
      - vue
✨  Done in 22.14s.

$ vue --version
3.0.1
```

## Creating the project skeleton

Options described in the [online docs](https://cli.vuejs.org/guide/creating-a-project.html#creating-a-project)

```sh
$ vue create --no-git --packageManager yarn --default piggy-bank

Vue CLI v3.0.1
✨  Creating project in /Users/jfischer/dev/git/piggy-bank.
⚙  Installing CLI plugins. This might take a while...

yarn install v1.9.4
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...

success Saved lockfile.
✨  Done in 17.30s.
🚀  Invoking generators...
📦  Installing additional dependencies...

yarn install v1.9.4
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 📃  Building fresh packages...

success Saved lockfile.
✨  Done in 3.71s.
⚓  Running completion hooks...

📄  Generating README.md...

🎉  Successfully created project piggy-bank.
👉  Get started with the following commands:

 $ cd piggy-bank
 $ yarn serve
```

## Launch the project

```sh
$ yarn serve

yarn run v1.9.4
$ vue-cli-service serve
 INFO  Starting development server...
 98% after emitting CopyPlugin

 DONE  Compiled successfully in 2650ms

  App running at:
  - Local:   http://localhost:8080/
  - Network: http://172.21.129.0:8080/

  Note that the development build is not optimized.
  To create a production build, run yarn build.
  ```

## Add express

```sh
$ yarn add express
yarn add v1.9.4
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
warning Pattern ["express@^4.16.3"] is trying to unpack in the same destination "/Users/jfischer/Library/Caches/Yarn/v2/npm-express-4.16.3-6af8a502350db3246ecc4becf6b5a34d22f7ed53" as pattern ["express@^4.16.2","express@^4.16.2"]. This could result in non-deterministic behavior, skipping.
[3/4] 🔗  Linking dependencies...
warning "@vue/cli-plugin-babel > babel-loader@8.0.2" has incorrect peer dependency "@babel/core@^7.0.0".
warning "@vue/cli-plugin-babel > babel-loader@8.0.2" has unmet peer dependency "webpack@>=2".
warning "@vue/cli-plugin-eslint > eslint-loader@2.1.0" has unmet peer dependency "webpack@>=2.0.0 <5.0.0".
[4/4] 📃  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ express@4.16.3
info All dependencies
└─ express@4.16.3
✨  Done in 2.99s.
```

## Add git remote to Heroku

```sh
$ heroku auth:login
heroku: Enter your login credentials
Email [j.fischer@epages.com]:
Password: ***
Logged in as j.fischer@epages.com

$ heroku git:remote --app=beyond-piggy-bank
set git remote heroku to https://git.heroku.com/beyond-piggy-bank.git
```

## Pinning to node.js version 8

```sh
$ brew unlink node
Unlinking /usr/local/Cellar/node/10.9.0... 7 symlinks removed

$ brew link --force --overwrite node@8
Linking /usr/local/Cellar/node@8/8.11.4... 4287 symlinks created

If you need to have this software first in your PATH instead consider running:
  echo 'export PATH="/usr/local/opt/node@8/bin:$PATH"' >> ~/.bash_profile
```

### Installing axios

```sh
$ yarn add axios
yarn add v1.9.4
[1/5] 🔍  Validating package.json...
[2/5] 🔍  Resolving packages...
[3/5] 🚚  Fetching packages...
[4/5] 🔗  Linking dependencies...
warning "@vue/cli-plugin-babel > babel-loader@8.0.2" has incorrect peer dependency "@babel/core@^7.0.0".
warning "@vue/cli-plugin-babel > babel-loader@8.0.2" has unmet peer dependency "webpack@>=2".
warning "@vue/cli-plugin-eslint > eslint-loader@2.1.0" has unmet peer dependency "webpack@>=2.0.0 <5.0.0".
[5/5] 📃  Building fresh packages...

success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ axios@0.18.0
info All dependencies
└─ axios@0.18.0
✨  Done in 7.55s.
```

### Installing uri-templates

```sh
$ yarn add uri-templates
yarn add v1.9.4
[1/5] 🔍  Validating package.json...
[2/5] 🔍  Resolving packages...
[3/5] 🚚  Fetching packages...
[4/5] 🔗  Linking dependencies...
warning "@vue/cli-plugin-babel > babel-loader@8.0.2" has incorrect peer dependency "@babel/core@^7.0.0".
warning "@vue/cli-plugin-babel > babel-loader@8.0.2" has unmet peer dependency "webpack@>=2".
warning "@vue/cli-plugin-eslint > eslint-loader@2.1.0" has unmet peer dependency "webpack@>=2.0.0 <5.0.0".
[5/5] 📃  Building fresh packages...
success Saved lockfile.
success Saved 1 new dependency.
info Direct dependencies
└─ uri-templates@0.2.0
info All dependencies
└─ uri-templates@0.2.0
✨  Done in 3.77s.
```
