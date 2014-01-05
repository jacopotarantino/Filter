module.exports = (grunt) ->
  grunt.initConfig
    pkg: this.file.readJSON 'package.json'


    watch:
      js:
        files: [ 'src/coffee/**' ]
        tasks: [
          'coffee:js'
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
          'js/options.js': 'src/coffee/options.coffee'
          'js/background.js': 'src/coffee/background.coffee'


    jade:
      compile:
        files: 
          'html/options.html': 'src/jade/options.jade'

  
  grunt.loadNpmTasks task for task in [
    'grunt-contrib-coffee'
    'grunt-contrib-watch'
    'grunt-contrib-jade'
  ]


  grunt.registerTask 'prod', [
    'coffee'
    'jade'
  ]

  grunt.registerTask 'default', [
    'coffee'
    'jade'
    'watch'
  ]
