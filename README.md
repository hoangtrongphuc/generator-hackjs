# generator-hackjs  

> A Yeoman generator for a Hackjs application

## Installation

First you need install [yeoman](http://yeoman.io/).

```bash
npm install -g yo
```

Then install the hackjs generator.

```bash
npm install -g yo generator-hackjs
```

## Usage

Create a directory for your new app.

```bash
mkdir my-new-app; cd my-new-app/
```

Generate your app and follow the prompts.

```bash
yo hack
```

Start your brand new app! 💥

```bash
npm start
```

## Available commands

```bash
# short alias for generate new application
yo hack

# generate new application
yo hack:app

# generate new hook
yo hack:hook

# generate new middleware
yo hack:middleware

# generate new model
yo hack:model

# generate new service
yo hack:service
```

## Contributing

To contribute PRs for these generators, you will need to clone the repo
then inside the repo's directory, run `npm link`. This sets up a global
link to your local package for running tests (`npm test`) and generating
new feathers apps/services/hooks/etc.

When finished testing, optionally run `npm uninstall generator-hackjs` to remove
the link.


## Changelog


## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).

