# grunt-checkbranch

Checks that we are on a correct git branch before proceeding.

[![Build Status](https://travis-ci.org/dominykas/grunt-checkbranch.svg?branch=master)](https://travis-ci.org/dominykas/grunt-checkbranch)

```shell
npm install grunt-checkbranch --save-dev
```

And in your Gruntfile:

```js
grunt.loadNpmTasks('grunt-checkbranch');
```

## Usage

Include the task as one of your multitasks, optionally passing the desired branch (default: `master`) after a colon, e.g.:

```js
grunt.registerTask("deploy", ["test", "checkbranch:develop", "copy"]
```

Pass a "negated" branch where further tasks are not allowed by prepending an exclamation mark:

```js
grunt.registerTask("deploy", ["test", "checkbranch:!master", "copy"]
```

To skip checks:
```shell
grunt --no-checkbranch
```

To force checks (disables skipping), add the third param with `true`:

```js
grunt.registerTask("deploy", ["test", "checkbranch:develop:true", "copy"]
```

## Contributors ##

* [Dominykas Blyžė](https://www.dominykas.com/)
* [Daniel Lowes](https://github.com/Pleochism)
