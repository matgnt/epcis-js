module.exports = function (grunt) {
  grunt.initConfig({
    ts: {
      default: {
        options: {
          module: "commonjs"
        },
        watch: ".",
        src: ["**/*.ts", "!node_modules/**/*.ts"]
      }
    }
  });
  grunt.loadNpmTasks("grunt-ts");
  grunt.registerTask("default", ["ts"]);
};