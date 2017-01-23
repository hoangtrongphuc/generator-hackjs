var Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set
    // up
    super(args, opts);
    this.log(yosay('Welcome to Hackjs! \n Minimalist, robust and fast web framework for node'));

  }
  prompting() {
    var keys = {
      GENERATE_PROJECT: 'Generate Hackjs Project',
      GENERATE_CLIENT: 'Generate Hackjs React Client',
      HACK_VERSION: 'Show Hackjs Version'
    };
  
    var clients = this
      .config
      .get('clients');
    var choices = new Array();
    if (!this.config.get('version')) {
      choices.push(keys.GENERATE_PROJECT);
    }
    if (this.config.get('version')) {
      choices.push(keys.GENERATE_CLIENT);
    }
    choices.push(keys.HACK_VERSION);
    return this
      .prompt([
        {
          type: 'list',
          name: 'list',
          message: 'What do you want to do?',
          default: 0,
          choices: choices
        }
      ])
      .then(function (answers) {
        var _this = this;
        var done = this.async();
        var answer = answers.list;
        switch (answer) {
          case keys.GENERATE_PROJECT:
            this
              .config
              .set('version', require('../../package.json').version);
            this
              .composeWith('fireloop:server')
              .on('end', function () {
                _this
                  .composeWith('fireloop:setup')
                  .on('end', function () {
                    return done();
                  });
              });
            break;
          case keys.GENERATE_CLIENT:
            this
              .composeWith('fireloop:ng2')
              .on('end', function () {
                done();
              });
            break;
          case keys.HACK_VERSION:
            var version = require('../../package.json').version;
            this.log(chalk.blue("\nHackjs Version: " + version + "\n"));
            break;
        }
      }.bind(this));
  }

};