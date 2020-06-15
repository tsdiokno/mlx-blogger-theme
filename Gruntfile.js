module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Remove built directory
    clean: {
      build: ['build/*']
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'include',
          src: ['*.css', '!*.min.css'],
          dest: 'include',
          ext: '.min.css'
        }]
      }
    },

    // Build the site using grunt-includes
    includes: {
      build: {
        cwd: 'site',
        src: 'theme.xml',
        dest: 'build/',
        options: {
          flatten: true,
          includePath: 'include',
          banner: '<!-- Site built using grunt includes! -->\n'
        }
      }
    }
  });

  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Task definitions
  grunt.registerTask('build', ['clean', 'cssmin', 'includes']);
  grunt.registerTask('default', ['build']);
};
