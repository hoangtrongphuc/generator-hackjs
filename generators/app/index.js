var Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');
var path = require('path');
module.exports = class extends Generator {
  constructor(args, opts) {
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
    choices.push(keys.GENERATE_PROJECT);
    choices.push(keys.GENERATE_CLIENT);
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
              .prompt([
                {
                  type: 'input',
                  name: 'name',
                  message: 'What is the name of your project? ',
                  default: this.appname
                }
              ])
              .then(function (answer) {
                this.log(chalk.green(`Create project "${answer.name}" in folder: ${this.destinationRoot()}`));
                this
                  .fs
                  .copy([
                    this.templatePath('hack/*'),
                    this.templatePath('hack/services/*'),
                    this.templatePath('hack/middlewares/*'),
                    this.templatePath('hack/.*')
                  ], this.destinationPath(answer.name));
                // this.spawnCommand('npm', ['install']);
                this
                  .fs
                  .copyTpl(this.templatePath('hack/package.json'), this.destinationPath(`${answer.name}/package.json`), {appname: answer.name});

              }.bind(this));

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
            this.log(chalk.green("\nHackjs Version: " + version + "\n"));
            break;
        }
      }.bind(this));
  }

};