import path from 'path'
import test from 'ava'
import helpers from 'yeoman-test'
import assert from 'yeoman-assert'
import pify from 'pify'

let generator

test.beforeEach(async () => {
  await pify(helpers.testDirectory)(path.join(__dirname, 'temp'))
  generator = helpers.createGenerator('restmen:app', ['../app'], null, {skipInstall: true})
})

test.serial('generates expected files', async () => {
  helpers.mockPrompt(generator, {
    projectName: 'test',
    databaseUrl: 'mongodb://localhost:27017/testdb"',
    portNumber: '3000'
  })

  await pify(generator.run.bind(generator))()

  assert.file([
    'controllers',
    'models',
    '.git',
    '.gitignore',
    'server.js',
    'config.js',
    'package.json'
  ])
})
