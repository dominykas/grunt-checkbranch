'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		"jshint": {
			"all": [
				'Gruntfile.js',
				'tasks/*.js',
				'test/*.js'
			],
			"options": {
				"jshintrc": '.jshintrc'
			}
		},

		// Before generating any new files, remove any previously-created files.
		"clean": {
			"tests": ['tmp']
		},

		// Unit tests.
		"buster": {
			"dist": {
				"test": {
					"reporter": "specification"
				}
			}
		},
		"bump": {
			"options": {
				commitMessage: 'release %VERSION%',
				commitFiles: [ "-a" ],
				tagName: '%VERSION%',
				tagMessage: 'version %VERSION%',
				pushTo: 'origin'
			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-checkpending');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-buster');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'buster']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'test']);

	grunt.registerTask("release", function () {
		var bump = grunt.option("bump");
		if (bump !== "patch" && bump !== "minor" && bump !== "major") {
			grunt.fail.fatal("Please pass --bump");
		}
		grunt.task.run(["checkbranch:master", "checkpending", "default", "bump:" + bump]);
	});

};
