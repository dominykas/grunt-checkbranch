var buster = require('buster');
var expect = buster.referee.expect;
var shell = require('shelljs');

var GRUNT_SUCCESS = "Done.";
var GRUNT_FATAL = "Fatal error:";

var execGrunt = function (gruntCmd) {
	shell.pushd('tmp');
	var execCmd = "grunt --verbose " + gruntCmd;
	console.warn("Executing for tests: " + execCmd);
	var output = shell.exec(execCmd);
	shell.popd();
	console.warn("Done executing for tests: " + execCmd);
	return output;
};

buster.testCase("grunt-checkbranch", {

	"setUp": function () {
		shell.mkdir("-p", "tmp");
		shell.pushd('tmp');
		shell.exec("git init");
		shell.cp("../test/fixture-gruntfile.js", "Gruntfile.js");
		shell.exec("git add -A");
		shell.exec("git commit -m 'initial commit'");
		shell.popd();
	},

	"tearDown": function () {
		shell.rm("-rf", "tmp");
	},

	"should not proceed when branch is not develop": function () {
		var output = execGrunt("checkbranch:develop");
		expect(output.stdout).toMatch(GRUNT_FATAL);
		expect(output.stdout).toMatch("you're on 'master' branch");
		expect(output.code).toEqual(1, "Incorrect grunt output code");
	},

	"should proceed when branch is develop": function () {
		shell.pushd('tmp');
		shell.exec("git checkout -b develop");
		shell.popd();

		var output = execGrunt("checkbranch:develop");
		expect(output.stdout).toMatch(GRUNT_SUCCESS);
		expect(output.code).toEqual(0, "Incorrect grunt output code");
	},

	"should proceed when directory differs from negated match": function () {
		shell.pushd('tmp');
		shell.exec("git checkout -b develop2");
		shell.popd();

		var output = execGrunt("checkbranch:!develop");
		expect(output.stdout).toMatch(GRUNT_SUCCESS);
		expect(output.code).toEqual(0, "Incorrect grunt output code");
	},

	"should not proceed when directory equals negated match": function () {
		shell.pushd('tmp');
		shell.exec("git checkout -b develop");
		shell.popd();

		var output = execGrunt("checkbranch:!develop");
		expect(output.stdout).toMatch(GRUNT_FATAL);
		expect(output.code).toEqual(1, "Incorrect grunt output code");
	},

	"should default to 'master'": function () {
		var output = execGrunt("checkbranch");
		expect(output.stdout).toMatch(GRUNT_SUCCESS);
		expect(output.code).toEqual(0, "Incorrect grunt output code");
	},

	"should bypass via command line": function () {
		var output = execGrunt("checkbranch:develop --no-checkbranch");
		expect(output.stdout).toMatch(GRUNT_SUCCESS);
		expect(output.stdout).toMatch("overridden");
		expect(output.code).toEqual(0, "Incorrect grunt output code");
	},

	"should not bypass via command line when forced": function () {
		var output = execGrunt("checkbranch:develop:true --no-checkbranch");
		expect(output.stdout).toMatch(GRUNT_FATAL);
		expect(output.stdout).toMatch("you're on 'master' branch");
		expect(output.code).toEqual(1, "Incorrect grunt output code");
	},

	"should fail when git fails": function () {
		shell.rm("-rf", "tmp/.git");
		shell.exec("git init tmp"); // removed old git, initialized new, but no commit - therefore no HEAD

		var output = execGrunt("checkbranch");
		expect(output.stdout).toMatch(GRUNT_FATAL);
		expect(output.stdout).toMatch("Failed to detect");
		expect(output.code).toEqual(1, "Incorrect grunt output code");
	}

});