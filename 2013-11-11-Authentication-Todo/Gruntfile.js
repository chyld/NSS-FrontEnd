module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: require('home-dir').directory + '/.jshintrc'
      },
      all: ['routes/**/*.js', 'models/**/*.js', 'sockets/**/*.js', '*.js']
    },

    watch: {
      editing: {
        files: ['routes/**/*.js', 'models/**/*.js', 'sockets/**/*.js', '*.js'],
        tasks: ['jshint']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('default', ['watch']);
};
