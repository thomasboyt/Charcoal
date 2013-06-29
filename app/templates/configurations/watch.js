module.exports = {
  emberTemplates: {
    files: [
      'app/**/*.hbs',
      'app/**/*.handlebars'
    ],
    spawn: true,
    tasks: ['emberTemplates']
  },

  // copy ALL the things! it's /tmp, so uncompiled assets being copied
  // doesn't really matter too much.
  assets: {
    files: ['public/**/*'],
    tasks: ['copy:dev']
  },

  less: {
    files: ['styles/**/*.less'],
    tasks: ['less:dev']
  },

  transpile: {
    files: [
      'test/**/*.js',
      'app/**/*.js'
    ],
    tasks: ['transpile', 'concat']
  },

  options: {
    livereload: true
  }
};