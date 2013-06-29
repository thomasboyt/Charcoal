var nameFor = function (path) {
  var match = path.match(/^(?:app|lib|test|test\/spec)\/(.*?)(?:\.js)?$/);
  if (match) {
    return match[1];
  } else {
    return path;
  }
};

module.exports = {
    app: {
    moduleName: nameFor,
    type: 'amd',
    files: [{
      expand: true,
      cwd: 'app/',
      src: ['**/*.js'],
      dest: 'tmp/amd/',
      ext: '.js'
    }]
  },
  tests: {
    moduleName: nameFor,
    type: 'amd',
    files: [{
      expand: true,
      cwd: 'test/',
      src: ['**/*.js'],
      dest: 'tmp/test/amd/',
    }]
  }
};