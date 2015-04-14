'use strict';

var shell = require("shelljs");

module.exports = function (grunt) {

	grunt.registerTask('checkbranch', 'Check that we are on a correct Git branch before proceeding.', function (expectedBranch, force) {

		if (grunt.option('no-checkbranch') && !force) {
			grunt.log.writeln("Branch check overridden via command line.");
			return;
		}

		expectedBranch = expectedBranch || "master";
		var negate = false;
		if (expectedBranch[0] === "!") {
			negate = true;
			expectedBranch = expectedBranch.slice(1);
		}

		grunt.log.writeln("Expecting to " + (negate ? "not" : "") + " be on '" + expectedBranch + "' branch.");

		var done = this.async();
		shell.exec("git rev-parse --abbrev-ref HEAD", {silent: !grunt.option('verbose')}, function (e, branchOutput) {
			if (e) {
				grunt.fail.fatal("Failed to detect the current branch");
			}

			var branch = branchOutput.trim();
			if (!negate && branch !== expectedBranch) {
				grunt.fail.fatal("Only '" + expectedBranch + "' branch is allowed, and you're on '" + branch + "' branch.");
			}
			else if (negate && branch === expectedBranch) {
				grunt.fail.fatal("Anything except '" + expectedBranch + "' branch is allowed, and you're on '" + branch + "' branch.");
			}

			done();
		});

	});

};
