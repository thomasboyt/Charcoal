var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = {
  options: {
    port: 9000,
    // change this to '0.0.0.0' to access the server from outside
    hostname: 'localhost'
  },
  app: {
    options: {
      middleware: function (connect) {
        return [
          require('connect-livereload')(),
          mountFolder(connect, 'tmp')
        ];
      }
    }
  },
  test: {
    options: {
      middleware: function (connect) {
        return [
          require('connect-livereload')(),
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
};