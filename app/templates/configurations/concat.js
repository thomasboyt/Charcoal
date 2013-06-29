module.exports = {
  app: {
    src: ['vendor/loader.js', 'tmp/amd/**/*.js'],
    dest: 'tmp/app/app.js',
    options: {
      footer: 'requireModule("app");'
    }
  },
  tests: {
    src: ['vendor/loader.js', 'tmp/test/amd/**/*.js'],
    dest: 'tmp/test/test.js',
    options: {
      footer: 'requireModule("main");'
    }
  }
}