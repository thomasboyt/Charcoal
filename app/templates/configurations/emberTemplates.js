module.exports = {
  options: {
    templateName: function (sourceFile) {
      var prefixRegex = new RegExp("(?:app/templates/)(.*)");
      var filename, match;

      if ((match = sourceFile.match(prefixRegex)) && (filename = match[1])) {
        return filename;
      }
      return sourceFile;
    }
  },
  dev: {
    files: {
      'tmp/app/compiled-templates.js': [
        'app/**/*.hbs',
        'app/**/*.handlebars'
      ]
    }
  }
};