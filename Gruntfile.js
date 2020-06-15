const sass = require('node-sass');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Remove built directory
    clean: {
      build: ['build/*']
    },

    sass: {
        options: {
            implementation: sass,
            sourceMap: true
        },
        dist: {
            files: {
                'include/css/main-scss.css': 'include/sass/main-scss.scss'
            }
        }

    },

    // autoprefixer: {
    //     options: {
    //         browsers: ['last 2 versions', 'ie 8', 'ie 9']
    //     },
    //     multiple_files: {
    //         expand: true,
    //         flatten: true,
    //         src: 'include/css/*.css',
    //         dest: 'include/css-dist'
    //     },
    // },
    //
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({overrideBrowserslist: ['last 2 versions']})
        ]
      },
      dist: {
        src: 'include/css/*.css'
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'include/css',
          src: ['*.css', '!*.min.css'],
          dest: 'include/css-dist',
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
        }
      }
    }
  });

  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-sass');

  // Task definitions
  grunt.registerTask('build', ['clean', 'sass', 'postcss', 'cssmin', 'includes']);
  grunt.registerTask('default', ['build']);
};
