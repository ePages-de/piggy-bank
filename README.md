# Piggy Bank

Demo application for using the REST API of ePages BEYOND.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## How to use

These instructions target a Mac OS X development environment.
If you are a Linux or Windows user, you will need to figure out the details yourself.

### Install and pin node.js version 8

It might be that you have already node.js version 10 installed. In order to properly use this app, you need to install and pin node.js version 8. Don't ask me why, frontend experts told me so ;-)

```sh
$ brew install node@8

$ brew unlink node
Unlinking /usr/local/Cellar/node/10.9.0... 7 symlinks removed

$ brew link --force --overwrite node@8
Linking /usr/local/Cellar/node@8/8.11.4... 4287 symlinks created

If you need to have this software first in your PATH instead consider running:
  echo 'export PATH="/usr/local/opt/node@8/bin:$PATH"' >> ~/.bash_profile
```

### Install yarn

npm is dead, long live yarn! Frontend experts told me so ;-)

```sh
$ brew install yarn

$ yarn -v
1.9.4
```

### Fork this repository on GitHub

[Fork the repository](https://github.com/ePages-de/piggy-bank/fork) and clone it onto your local machine:

```sh
$ git clone https://github.com/that-is-your-account/piggy-bank.git

$ cd piggy-bank
```

### Run the application locally

```sh
$ yarn install
$ yarn serve
yarn run v1.9.4
$ vue-cli-service serve
 INFO  Starting development server...
 98% after emitting CopyPlugin

 DONE  Compiled successfully in 4193ms                                                                                                                                                         12:17:47 PM

  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.2.46:8080/

  Note that the development build is not optimized.
  To create a production build, run yarn build.

$ open http://localhost:8080
```

### Optional: deploy to Heroku

After [creating your own Heroku account](https://signup.heroku.com/), you can click the "Deploy to Heroku" button from your GitHub fork website.

### Optional: add git remote to Heroku

If you want to deploy your latest changes directly to Heroku, you need to set it up just like any another git remote.

```sh
$ brew install heroku

$ heroku auth:login
heroku: Enter your login credentials
Email [that-is-you@email.com]:
Password: ***
Logged in as that-is-you@email.com

$ heroku git:remote --app=this-is-your-heroku-app
set git remote heroku to https://git.heroku.com/this-is-your-heroku-app.git

$ git push heroku master
```

### Useful links

* [BEYOND REST API](https://docs.beyondshop.cloud) documentation
* [vue.js guide](https://vuejs.org/v2/guide/)
* [vue.js API](https://vuejs.org/v2/api/)
* [axios cheat sheet](https://kapeli.com/cheat_sheets/Axios.docset/Contents/Resources/Documents/index)
* [Bootstrap CSS](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
* [boostrap-vue](https://bootstrap-vue.js.org/docs/)
* [Font Awesome & vue.js](https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs)
* [Font Awesome free icons](https://fontawesome.com/icons?d=gallery&m=free)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Vetur plugin](https://vuejs.github.io/vetur/) for VS Code
* [vue-devtools](https://github.com/vuejs/vue-devtools) Chrome Extension
* [Heroku](https://heroku.com)

### TODOs

* better localstorage state management
* rename and move GitHub repo
