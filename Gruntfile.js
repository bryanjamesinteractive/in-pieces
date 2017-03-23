module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: { // Begin Sass Plugin
        dev: {
            options: {
                sourcemap: 'none'
            },
            files: [{
                expand: true,
                cwd: 'scss',
                src: ['**/*.scss'],
                dest: 'css',
                ext: '.css'
            }]
        }
    },
    postcss: { // Begin Post CSS Plugin
      options: {
          map: false,
          processors: [
              require('autoprefixer')({
                  browsers: ['last 2 versions', 'ie >= 9']
              })
          ]
      }
    },
    cssmin: { // Begin CSS Minify Plugin
        target: {
            files: [{
                expand: true,
                cwd: 'css',
                src: ['*.css', '!*.min.css'],
                dest: 'css',
                ext: '.min.css'
            }]
        }
    },
    watch: {
      css: {
          files: '**/*.scss',
          tasks: ['sass', 'postcss', 'cssmin'],
          options: {
              livereload: true,
          },
      }
    }
    
  });
  // Load ALL grunt tasks
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default',['watch']);
  grunt.registerTask('dev',['sass', 'watch']);
  
}