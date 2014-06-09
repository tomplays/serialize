/* jshint node:true */
'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    jasmine: {
      test: {
        src: 'dist/serialize.min.js',
        options: {
          specs: 'test/spec.js',
          keepRunner: true
        }
      }
    },
  })

  grunt.loadNpmTasks('grunt-contrib-jasmine')

  grunt.registerTask('default', ['jasmine'])
}
