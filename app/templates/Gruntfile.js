'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  function config(configFileName) {
    return require('./configurations/' + configFileName);
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env: process.env,

    // these configs are loaded from files in ./configurations
    // feel free to add your own for any task you want to add
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

  // server (aka dev) - run a development server that recompiles when files are
  // changed
  grunt.registerTask('server', [
    'clean:server',
    'concurrent:server',
    'concat:app',
    'connect:app',
    'watch'
  ]);
  grunt.registerTask('dev', ['server']);

  // server:dist - run a static server with your minified/dist'd output
  grunt.registerTask('server:dist', ['build', 'connect:dist:keepalive']);

  // test - run phantomjs tests on the command line
  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'concat',
    'copy:dev',
    'copy:test',
    'connect:test',
    'mocha'
  ]);

  // test:browser - run phantomjs tests in a browser window. recompiles tests &
  // app when files are changed
  grunt.registerTask('test:browser', [
    'clean:server',
    'concurrent:test',
    'concat',
    'copy:dev',
    'copy:test',
    'connect:test',
    'watch'
  ]);

  // build (aka dist) - compile a minified version of your app for distribution
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
  grunt.registerTask('dist', ['build']);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
