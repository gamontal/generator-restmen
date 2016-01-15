'use strict'
const normalizeUrl = require('normalize-url')
const yeoman = require('yeoman-generator')
const _s = require('underscore.string')

module.exports = yeoman.Base.extend({
  init () {
    const cb = this.async()
    const self = this

    this.prompt([{
      name: 'apiName',
      message: 'What do you want to name your API?',
      default: this.appname.replace(/\s/g, '-'),
      filter: x => _s.slugify(x)
    }, {
      name: 'databaseUrl',
      message: 'What is the URI for your MongoDB database?',
      store: true,
      validate: x => x.length > 0 ? true : 'You have to provide a MongoDB database URI',
      filter: x => normalizeUrl(x)
    }, {
      name: 'portNumber',
      message: 'What port will you use to connect to the server?',
      store: true,
      default: '3000'
    }], props => {
      const tpl = {
        apiName: props.apiName,
        databaseUrl: props.databaseUrl,
        portNumber: props.portNumber
      }

      const mv = (from, to) => {
        self.fs.move(self.destinationPath(from), self.destinationPath(to))
      }

      self.fs.copyTpl([`${self.templatePath()}/**`], self.destinationPath(), tpl)

      mv('gitignore', '.gitignore')
      mv('_package.json', 'package.json')

      cb()
    })
  },
  git () {
    this.spawnCommandSync('git', ['init'])
  },
  install () {
    this.installDependencies({bower: false})
  }
})
