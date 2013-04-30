'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // load the default grunt configuration
  var config = require('./charcoal/grunt').config;

  // if you'd like to modify the default grunt config, do it here
  // for example:
  // config.less = { ... }

  grunt.initConfig(config);

  grunt.renameTask('regarde', 'watch');

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'livereload-start',
      'connect:livereload',
      'open',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'copy:server',
    'copy:test',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('test-server', [
    'clean:server',
    'concurrent:test',
    'copy:server',
    'copy:test',
    'connect:test',
    'open',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'cssmin',
    'concat',
    'uglify',
    'copy:server',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
