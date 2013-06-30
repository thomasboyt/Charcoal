module.exports = {
  dev: {
    files: [
      { expand: true, dest: 'tmp/', cwd: 'public/', src: ['**'] },
      { expand: true, dest: 'tmp/', src: ['styles/**/*.css'] },

      // copy uncompiled app js to /tmp for debugging (source maps)
      { expand: true, dest: 'tmp/app', src: ['app/**/*.js'] },

      { expand: true, dest: 'tmp/', src: ['components/**'] }
    ]
  },
  test: {
    files: [
      { dest: 'tmp/index.html', src: ['test/index.html'] }
    ]
  },
  dist: {
    files: [{
      src: '**',
      dest: 'dist/',
      expand: true,
      cwd: 'public/'
    }]
  }
};