# invoice-system


## Install
requires [`io.js`](https://iojs.org/en/index.html) v2.x and
[`npm`](https://www.npmjs.com/). Instructions to install both using
[`nvm`](https://github.com/creationix/nvm) can be found
[here](https://keymetrics.io/2015/02/03/installing-node-js-and-io-js-with-nvm/).

**tl;dr** once you have `nvm` installed run the following commands

```shell
nvm install iojs-v2.0.2
nvm alias default iojs-v2.0.2
nvm use default
```

Once `io.js` is installed on your computer clone this repo, change directories
to the new cloned repo, and run

```script
npm install
```

After the back-end dependencies have been installed, you can use `bower` to
install the front-end dependencies

```shell
npm run bower install
```

or, if you have it installed globally

```shell
bower install
```

after all the `io.js` dependencies are installed you need to install postgres
on your computer. How that's done depends on your OS. Detailed instructions can
be found [here](https://wiki.postgresql.org/wiki/Detailed_installation_guides).
The configuration information for the postgres user and database can be found in
`config/config.json` (don't worry about creating the tables, the server will do
that automatically).

## Running the server

Once all the dependencies are installed you can run the server locally by running

```shell
gulp
```

or

```shell
npm run gulp
```

the former requires `gulp` to be in your path - run `npm install gulp -g` to
install it globally - while the latter runs the locally installed version of
`gulp`

## Gulp commands

Below are a list of all the gulp commands and what they do.

*if you don't have gulp installed globally you'll need to run the gulp commands
like so: `npm run gulp <gulp_command>`*

command | description
--- | ---
`gulp` (default) | run the server and watch for changes to `stylus` and front-end `js` files
`gulp watch` | watch for changes to `stylus` and front-end `js` files and run their respective commands
`gulp stylus` | compile `stylus` files into `css`
`gulp scripts` | transpile the ES6 front-end JS files into ES5
`gulp test` | run the tests using `jest`
`gulp watch:test` | watch for changes that affect the tests and re-run them

## Production additions

Things that should be added if this were to be a production application:

* minification of stylesheets, and front-end JS to increase load times
* pre-compile JSX files on the server to increase run times on the client
* some form of authentication with the API (OAuth, most likely) so anyone can't
make requests
* use transactions when interfacing with the database to reduce risk of stale,
corrupt, or out of sync data
* consideration to scaling the databases and running it on a different server
altogether
* separate the API and the front-end server into separate processes so if one
goes down, it doesn't cause the whole site to go down
* scale the API and front-end across cores using workers to increase concurrency
* add client side validation so a call to the API doesn't have to be made in vain
* put front-end and API servers behind a load balancer/reverse proxy like nginx
to help with horizontal scaling
