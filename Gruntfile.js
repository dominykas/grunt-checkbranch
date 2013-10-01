/*
 * grunt-checkbranch
 * https://github.com/dymonaz/grunt-checkbranch
 *
 * Copyright (c) 2013 Dominykas Blyžė
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'test/*.js',
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Before generating any new files, remove any previously-created files.
		clean: {
			tests: ['tmp'],
		},

		// Unit tests.
		buster: {
			dist: {

			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-release');
	grunt.loadNpmTasks('grunt-buster');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'buster']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

};
