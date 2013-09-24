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

	grunt.registerMultiTask('checkbranch', 'Check that we are on a correct Git branch before proceeding.', function () {

		if (grunt.option('no-check-branch')) {
			grunt.log.writeln("Branch check overridden via command line.");
			return;
		}

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			branch: 'master'
		});

		grunt.log.writeln("Expecting to be on '" + options.branch + "' branch.");

		var branchOutput = shell.exec("git rev-parse --abbrev-ref HEAD", {silent: true});
		if (branchOutput.code !== 0) {
			grunt.fail.fatal("Failed to detect the current branch");
		}

		var branch = branchOutput.output.trim();
		if (branch !== options.branch) {
			grunt.fail.fatal("Only '"+options.branch+"' branch is allowed, and you're in '" + branch + "' branch.");
		}

	});

};
