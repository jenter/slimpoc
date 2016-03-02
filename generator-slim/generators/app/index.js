'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

/**
 * automatically add link => http://yeoman.io/authoring/
 * Create files....
 * slim.info.yml
 *
 *
 * https://github.com/yeoman/generator-generator
 * https://devdactic.com/creating-custom-yeoman-generator/
 */

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Intro.
    this.log(yosay(
      'This is the \'Thin\' Drupal theme generator, just a couple steps and you are on your way!'
    ));

    // Prompts.
    var prompts = [
      {
        type: 'input',
        name: 'human_name',
        message: 'What is the Human-friendly name of your theme?',
        default: 'Slim'
      }, {
        type: 'input',
        name: 'machine_name',
        message: 'What is the machine name of your theme?',
        default: 'slim'
      },
      {
        type: 'input',
        name: 'theme_descr',
        message: 'What is a quick description for your theme?',
        default: ''
      }
    ];
    this.prompt(prompts, function (props) {
      this.humanName = props.human_name;
      this.themeName = props.machine_name;
      this.themeDescr = props.theme_descr;
      console.log(this);
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_slim.info.yml'),
      this.destinationPath(this.themeName + '.info.yml'),
      {
        humanName: this.humanName,
        themeName: this.themeName,
        themeDescr: this.themeDescr
      }
    ),
      this.fs.copy(
        this.templatePath('cp/**/*'),
        this.destinationPath('./')
      )
  },

  install: function () {
    // this.installDependencies();
  }
});
