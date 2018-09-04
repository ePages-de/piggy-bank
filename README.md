# beyond-vuejs-starter

Starter application for using the REST API of ePages BEYOND.

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
$ vue create --no-git --packageManager yarn --default beyond-vuejs-starter

Vue CLI v3.0.1
✨  Creating project in /Users/jfischer/dev/git/beyond-vuejs-starter.
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

🎉  Successfully created project beyond-vuejs-starter.
👉  Get started with the following commands:

 $ cd beyond-vuejs-starter
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
  