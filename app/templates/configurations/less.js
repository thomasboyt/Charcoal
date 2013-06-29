module.exports = {
  dev: {
    files: [{
      expand: true,
      cwd: "assets/styles",
      src: ["**/*.less"],
      dest: "tmp/assets/styles",
      ext: ".css"
    }]
  },
  dist: {
    files: [{
      expand: true,
      cwd: "assets/styles",
      src: ["**/*.less"],
      dest: "dist/assets/styles",
      ext: ".css"
    }],
    options: {
      yuicompress: true
    }
  }
};