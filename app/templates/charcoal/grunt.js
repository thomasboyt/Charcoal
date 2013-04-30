/*
 * This file defines a bunch of premade tasks for you to use.
 * If you'd like to add your own tasks, you should add them to the `config`
 * object in your `Gruntfile.js` instead of here.
 * */

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var template = require('grunt').template;

module.exports = {
  config: {

    // Watch tasks
    // ------------------
    watch: {
      ember_templates: {
        files: [
          'app/**/*.hbs',
          'app/**/*.handlebars'
        ],
        tasks: ['ember_templates', 'livereload']
      },
      coffee: {
        files: ['app/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      livereload: {
        files: [
          'app/*.html',
          '{tmp,app}/assets/{,*/}*.css',
          '{tmp,app}/{,*/}*.js',
          'assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      },
      neuter: {
        files: [
          'test/**/*.js',
          'app/**/*.js'
        ],
        tasks: ['neuter']
      }
    },

    // Server tasks
    // ------------------
    connect: {
      options: {
        port: 9000,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, 'tmp'),
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },

    // Opens your web browser when you start a server
    // ------------------
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      },
    },

    // Dist
    // ------------------
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            'tmp',
            'dist/*',
            '!dist/.git*'
          ]
        }]
      },
      server: 'tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/{,*/}*.js',
        'test/spec/{,*/}*.js'
      ]
    },

    // Testing
    // ------------------
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%%= connect.options.port %>/index.html']
        }
      }
    },
    jasmine: {
      all: {
        /*src: '',*/
        options: {
          specs: 'test/spec/{,*/}*.js'
        }
      }
    },

    // Asset building
    // ------------------
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/scripts',
          src: '{,*/}*.coffee',
          dest: 'tmp/scripts',
          ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
          dest: 'tmp/spec',
          ext: '.js'
        }]
      }
    },

    // Revisioning
    // ------------------
    rev: {
      dist: {
        files: {
          src: [
            'dist/scripts/{,*/}*.js',
            'dist/styles/{,*/}*.css',
            'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            'dist/styles/fonts/*'
          ]
        }
      }
    },

    // Usemin
    // ------------------
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/styles/{,*/}*.css'],
      options: {
        dirs: ['dist'],
      }
    },

    // Image minification
    // ------------------
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'dist/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/images',
          src: '{,*/}*.svg',
          dest: 'dist/images'
        }]
      }
    },

    // CSS & HTML minification
    // ------------------
    cssmin: {
      dist: {
        files: {
          'dist/styles/main.css': [
            'assets/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app',
          src: '*.html',
          dest: 'dist'
        }]
      }
    },

    // Concurrency
    // ------------------
    concurrent: {
      server: [
        'ember_templates',
        'coffee:dist',
        'neuter:app',
        'copy:server',
      ],
      test: [
        'ember_templates',
        'coffee',
        'neuter',
      ],
      dist: [
        'ember_templates',
        'neuter:app',
        'copy:server',
        'coffee',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },

    // Ember-specific tasks
    // ------------------
    ember_templates: {
      options: {
        templateName: function (sourceFile) {
          // this removes the directory structure, which may be unwanted behavior - hierarchy may be wanted.
          return sourceFile.match(new RegExp("(?!.*/)(.*)"))[0];
        }
      },
      dist: {
        files: {
          'tmp/app/compiled-templates.js': [
            'app/**/*.hbs',
            'app/**/*.handlebars'
          ]
        }
      }
    },

    neuter: {
      app: {
        options: {
          filepathTransform: function(filepath){ return template.process('app/') + filepath; }
        },
        src: 'app/app.js',
        dest: 'tmp/app/app.js'
      },
      test: {
        options: {
          filepathTransform: function(filepath){ return template.process('test/') + filepath; }
        },
        src: 'test/main.js',
        dest: 'tmp/spec/spec.js'
      }
    },

    copy: {
      server: {
        files: [
          { dest: 'tmp/index.html', src: ['app/index.html'] },
          { expand: true, dest: 'tmp/', src: ['assets/**'] },
          { expand: true, dest: 'tmp/', src: ['components/**'] },
        ],
        options: {
          includeSourceURL: true
        }
      },
      test: {
        files: [
          { dest: 'tmp/index.html', src: ['test/index.html'] }
        ],
        options: {
          includeSourceURL: true
        }
      },
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'assets/images/{,*/}*.{webp,gif}',
            'assets/styles/fonts/*'
          ]
        }]
      }
    }

  }
};
