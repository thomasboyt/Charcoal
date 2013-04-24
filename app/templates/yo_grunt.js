var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};
var template = require('grunt').template;

module.exports = {
  config: {
    watch: {
      ember_templates: {
        files: [
          '<%%= yeoman.app %>/**/*.hbs',
          '<%%= yeoman.app %>/**/*.handlebars'
        ],
        tasks: ['ember_templates', 'livereload']
      },
      coffee: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee:dist']
      },
      coffeeTest: {
        files: ['test/spec/{,*/}*.coffee'],
        tasks: ['coffee:test']
      },
      livereload: {
        files: [
          '<%%= yeoman.app %>/*.html',
          '{.tmp,<%%= yeoman.app %>}/assets/{,*/}*.css',
          '{.tmp,<%%= yeoman.app %>}/{,*/}*.js',
          'assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
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
              mountFolder(connect, '.tmp'),
            ];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
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
    open: {
      server: {
        path: 'http://localhost:<%%= connect.options.port %>'
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/scripts/{,*/}*.js',
            '!<%%= yeoman.app %>/scripts/vendor/*',
            'test/spec/{,*/}*.js'
      ]
    },<% if (testFramework === 'mocha') { %>
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%%= connect.options.port %>/index.html']
        }
      }
    },<% } else if (testFramework === 'jasmine') { %>
    jasmine: {
      all: {
        /*src: '',*/
        options: {
          specs: 'test/spec/{,*/}*.js'
        }
      }
    },<% } %>
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
        dest: '.tmp/scripts',
        ext: '.js'
        }]
      },
      test: {
        files: [{
          expand: true,
          cwd: 'test/spec',
          src: '{,*/}*.coffee',
        dest: '.tmp/spec',
        ext: '.js'
        }]
      }
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.html',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: '*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'images/{,*/}*.{webp,gif}',
            'styles/fonts/*'
          ]
        }]
      }
    },
    concurrent: {
      server: [
        'ember_templates',
        'coffee:dist',
        'neuter:server',
        'copy:server',
      ],
      test: [
        'coffee',
      ],
      dist: [
        'ember_templates',
        'coffee',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    },
    ember_templates: {
      options: {
        templateName: function (sourceFile) {
          // this removes the directory structure, which may be unwanted behavior - hierarchy may be wanted.
          return sourceFile.match(new RegExp("(?!.*/)(.*)"))[0];
        }
      },
      dist: {
        files: {
          '.tmp/app/compiled-templates.js': [
            '<%%= yeoman.app %>/**/*.hbs',
            '<%%= yeoman.app %>/**/*.handlebars'
          ]
        }
      }
    },

    neuter: {
      options: {
        filepathTransform: function(filepath){ return template.process('<%%= yeoman.app %>/') + filepath; }
      },
      server: {
        src: '<%%= yeoman.app %>/app.js',
        dest: '.tmp/app/app.js'
      }
    },

    copy: {
      server: {
        files: [
          { dest: '.tmp/index.html', src: ['app/index.html'] },
          { expand: true, dest: '.tmp/', src: ['assets/**'] },
          { expand: true, dest: '.tmp/', src: ['components/**'] },
        ]
      }
    }

  }
};
