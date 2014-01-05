module.exports = (grunt) ->
  grunt.initConfig
    pkg: this.file.readJSON 'package.json'


    watch:
      js:
        files: [ 'src/coffee/**' ]
        tasks: [
          'coffee:js'
          'uglify:js'
        ]
        options:
          nospawn: true
      jade:
        files: [ 'src/jade/**' ]
        tasks: [
          'jade'
        ]


    coffee:
      js:
        options:
          bare: true

        files:
          'tmp/options.js': 'src/coffee/options.coffee'
          'js/background.js': 'src/coffee/background.coffee'


    uglify:
      js:
        files:
          'js/options.min.js': 'tmp/options.js'


    jade:
      compile:
        files: 
          'html/options.html': 'src/jade/options.jade'

  
  grunt.loadNpmTasks task for task in [
    'grunt-contrib-coffee'
    'grunt-contrib-uglify'
    'grunt-contrib-watch'
    'grunt-contrib-jade'
  ]


  grunt.registerTask 'prod', [
    'coffee'
    'uglify'
    'jade'
  ]

  grunt.registerTask 'default', [
    'coffee'
    'uglify'
    'jade'
    'watch'
  ]
