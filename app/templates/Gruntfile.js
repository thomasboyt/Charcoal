'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // load the default charcoal grunt configuration
  function config(configFileName) {
    return require('./configurations/' + configFileName);
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,

    clean: config('clean'),
    concat: config('concat'),
    connect: config('connect'),
    copy: config('copy'),
    cssmin: config('cssmin'),
    emberTemplates: config('emberTemplates'),
    jshint: config('jshint'),
    less: config('less'),
    mocha: config('mocha'),
    rev: config('rev'),
    transpile: config('transpile'),
    usemin: config('usemin'),
    useminPrepare: config('useminPrepare'),
    watch: config('watch'),

    concurrent: {
      server: [
        'emberTemplates',
        'transpile:app',
        'copy:dev'
      ],
      test: [
        'emberTemplates',
        'transpile',
      ],
      dist: [
        'emberTemplates',
        'transpile:app',
        'copy:dev',
        'copy:dist',
      ]
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'concat:app',
      'connect:app',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'concat',
    'copy:dev',
    'copy:test',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('test-server', [
    'clean:server',
    'concurrent:test',
    'concat',
    'copy:dev',
    'copy:test',
    'connect:test',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'cssmin',
    'concat',
    'uglify',
    'copy:dev',
    'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'test',
    'build',
    'jshint'
  ]);
};
