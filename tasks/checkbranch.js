/*
 * grunt-checkbranch
 * https://github.com/dymonaz/grunt-checkbranch
 *
 * Copyright (c) 2013 Dominykas Blyžė
 * Licensed under the MIT license.
 */

'use strict';

var shell = require("shelljs");

module.exports = function (grunt) {

	grunt.registerTask('checkbranch', 'Check that we are on a correct Git branch before proceeding.', function (expectedBranch) {

		if (grunt.option('no-checkbranch')) {
			grunt.log.writeln("Branch check overridden via command line.");
			return;
		}

		grunt.log.writeln("Expecting to be on '" + expectedBranch + "' branch.");

		var branchOutput = shell.exec("git rev-parse --abbrev-ref HEAD", {silent: true});
		if (branchOutput.code !== 0) {
			grunt.fail.fatal("Failed to detect the current branch");
		}

		var branch = branchOutput.output.trim();
		if (branch !== options.branch) {
			grunt.fail.fatal("Only '"+expectedBranch+"' branch is allowed, and you're in '" + branch + "' branch.");
		}

	});

};
