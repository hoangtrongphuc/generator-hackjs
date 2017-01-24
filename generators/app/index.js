const Generator = require('yeoman-generator');
const yosay = require('yosay');
const chalk = require('chalk');
const path = require('path');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log(yosay('Welcome to Hackjs! \n Minimalist, robust and fast web framework for node'));
  }
  prompting() {
    let _this = this;
    let keys = {
      GENERATE_PROJECT: 'Generate Hackjs Project',
      GENERATE_CLIENT: 'Generate Hackjs React Client',
      HACK_VERSION: 'Show Hackjs Version'
    };

    let clients = this
      .config
      .get('clients');
    let choices = new Array();
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
        let done = this.async();
        let res = answers.list;
        switch (res) {
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
                _this.props = answer;
                done();
              }.bind(this)) 
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
            this.log(chalk.yellow("Hackjs Version: " + version));
            break;
        }
      }.bind(this));
  }
  writing() {
    this.log(chalk.green(`Create project "${this.props.name}" in folder: ${this.destinationRoot()}`));
    // Copy config
    this
      .fs
      .copyTpl(this.templatePath('hack/package.json'), this.destinationPath(`${this.props.name}/package.json`), {appname: this.props.name});
    // Copy folders and files
    this
      .fs
      .copy([
        this.templatePath('hack/*'),
        this.templatePath('hack/services/*'),
        this.templatePath('hack/middlewares/*'),
        this.templatePath('hack/.*')
      ], this.destinationPath(this.props.name))
  }
  install() {
    this.npmInstall();
  }
};