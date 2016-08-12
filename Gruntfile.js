var config = function (grunt) {
  
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    clean: {
      production: ['dist/*']
    },

    // Spritesmith: create a sprite and corresponding css automagically
  
    sprite:{
      logos: {
        src: 'src/assets/images/logos/*.png',
        dest: 'src/assets/images/logos.png',
        destCss: 'src/assets/style/logos.css',
        imgOpts: { quality: 100 }
      }
    }
  });
  
  // Load tasks
   
  grunt.loadNpmTasks('grunt-spritesmith');

  // Register custom tasks
  
  grunt.registerTask('build-sprite', ['sprite:logos'])
};

module.exports = config;