var config = function (grunt) {
  
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      production: ['dist/*']
    },

    // Spritesmith: create a sprite and corresponding css automagically
  
    sprite: {
      logos: {
        src: 'src/assets/images/logos/*.png',
        dest: 'src/assets/images/logos.png',
        destCss: 'src/assets/style/logos.css',
        imgOpts: { quality: 100 }
      }
    },

    // Minify files

    uglify: {

      // Options
      options: {
        report: 'min',
        mangle: true
      },

      // Target: production
      production: {
        files: [
          {
            src: [
              // libs
              'src/bower_components/angular/angular.js',
              'src/bower_components/angular-route/angular-route.js',

              // main module
              'src/app.js',
              
              // global modules         
              'src/global/**/*.js',
              'src/global/**/**/*.js',

              // app modules         
              'src/modules/**/*.js',
              'src/modules/**/**/*.js',
              'src/modules/**/**/**/*.js'
            ],
            dest: 'dist/goodrating.min.js'
          }
        ]
      },
    },

    // Minify CSS
    
    cssmin: {

      // Target: production
      production: {
        src: ['src/bower_components/concise/dist/concise.css', 'src/assets/style/goodrating.css', 'src/assets/style/logos.css'],
        dest: 'dist/assets/style/goodrating.min.css',
      }
    },

    // Copy shit

    copy: {
      production: {
        files: [
          {
            cwd: 'src',
            expand: true, 
            src: ['index-prod.html'], 
            dest: 'dist'
          }
        ]
      },
    }
  });
  
  // Load tasks
   
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Register custom tasks
  
  grunt.registerTask('build-sprite', ['sprite:logos']);
  grunt.registerTask('deploy', ['sprite:logos', 'uglify:production', 'cssmin:production', 'copy:production']);
};

module.exports = config;