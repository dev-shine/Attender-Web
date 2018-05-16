module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt, { scope: "devDependencies" })

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          sourceMap: "inline",
          style: "compressed"
        },
        files: {
          "public/stylesheets/style.min.css": "src/scss/index.scss"
        }
      }
    },
    watch: {
      style: {
        files: ["src/scss/*.scss", "src/scss/*/*.scss", "src/scss/*/*/*.scss"],
        tasks: ["sass"]
      }
    }
  })
  grunt.registerTask("default", ["sass"])
}
