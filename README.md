# grunt-checkbranch

> Check that we are on a correct Git branch before proceeding.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-checkbranch --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-checkbranch');
```

## The "checkbranch" task

### Overview
Include the task as one of your multitasks, optionally passing the desired branch (default: `master`) after a colon, e.g.:
```js
grunt.registerTask("default", ["test", "checkbranch:develop", "deploy"]
```

In the example above, the `deploy` task will only be executed, if your project is currently on the `develop` branch - otherwise the run will result in a fatal error.

You may override this behavior by passing `--no-checkbranch` via command line. You can disable `--no-checkbranch` (i.e. force the check) by setting a second param for the task, e.g. `checkbranch:master:true`.

You may also negate the test, i.e. exclude a specific branch by prepending an exclamation mark, e.g. `"checkbranch:!develop"`.

## Release History

### 0.3.1 (2014-05-26)
* npm update
* Travis

### 0.3.0 (2014-02-24)
* Added support for negating a branch, i.e. "run everywhere except X" (thx @Pleochism)

### 0.2.2 (2013-09-29)
* Added tests
* Second bool param to force the check.

### 0.2.1 (2013-09-24)
* Initial release (after a few removed, buggy ones)
