module.exports = function (grunt) {
  grunt.initConfig({
    ts: {
      default: {
        options: {
          module: "commonjs"
        },
        watch: ".",
        src: ["**/*.ts", "!node_modules/**/*.ts"],
        dest: ["build/"]
      }
    },
    copy: {
      main: {src: 'testdata/*', dest: 'build/'}
    }
  });
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.registerTask("default", ["ts", "copy"]);
};