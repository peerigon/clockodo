# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/peerigon/clockodo/compare/v3.2.0...v4.0.0) (2020-01-24)


### Bug Fixes

* Change id type from string to number ([0513722](https://github.com/peerigon/clockodo/commit/0513722))


### BREAKING CHANGES

* Clockodo REST API uses type number for ids.



## [3.2.0](https://github.com/peerigon/clockodo/compare/v3.1.6...v3.2.0) (2019-12-17)



### [3.1.6](https://github.com/peerigon/clockodo/compare/v3.1.5...v3.1.6) (2019-09-23)



### [3.1.5](https://github.com/peerigon/clockodo/compare/v3.1.4...v3.1.5) (2019-08-28)



<a name="3.1.4"></a>
## [3.1.4](https://github.com/peerigon/clockodo/compare/v3.1.3...v3.1.4) (2019-06-28)



<a name="3.1.3"></a>
## [3.1.3](https://github.com/peerigon/clockodo/compare/v3.1.2...v3.1.3) (2019-05-28)


### Bug Fixes

* removes dangerous and unneeded dependencies ([6436399](https://github.com/peerigon/clockodo/commit/6436399))



<a name="3.1.2"></a>
## [3.1.2](https://github.com/peerigon/clockodo/compare/v3.1.1...v3.1.2) (2019-05-28)


### Bug Fixes

* Array in Request Params ([#26](https://github.com/peerigon/clockodo/issues/26)) ([055de86](https://github.com/peerigon/clockodo/commit/055de86))



<a name="3.1.1"></a>
## [3.1.1](https://github.com/peerigon/clockodo/compare/v3.1.0...v3.1.1) (2018-10-24)



<a name="3.1.0"></a>
# [3.1.0](https://github.com/peerigon/clockodo/compare/v3.0.0...v3.1.0) (2018-10-24)


### Features

* Add target hours ([#22](https://github.com/peerigon/clockodo/issues/22)) ([ec25b66](https://github.com/peerigon/clockodo/commit/ec25b66))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/peerigon/clockodo/compare/v1.1.1...v3.0.0) (2018-10-17)


* Conversion to Typescript (#16) ([1bedec1](https://github.com/peerigon/clockodo/commit/1bedec1)), closes [#16](https://github.com/peerigon/clockodo/issues/16)


### Bug Fixes

* fixes outdate files option in package.json ([4a9f98e](https://github.com/peerigon/clockodo/commit/4a9f98e))


### Features

* adding function parameter types ([#21](https://github.com/peerigon/clockodo/issues/21)) ([f3c2499](https://github.com/peerigon/clockodo/commit/f3c2499))
* Adds remaining endpoint methods and alters old method signatures ([#14](https://github.com/peerigon/clockodo/issues/14)) ([fb82c71](https://github.com/peerigon/clockodo/commit/fb82c71)), closes [#12](https://github.com/peerigon/clockodo/issues/12)


### BREAKING CHANGES

* 2.0.0 was missing all of the code in its publication due to an outdated files value.
* Method Signature structure has been completely changed, and Node 6 support is dropped. 

* fix: addresses security vulnerabilities. Also adds jsdoc-to-markdown dev dependency

* fix: jsdoc-to-markdown should just be used globally. removed dependency

* changes method signatures, adds useless jsdoc

* feat: creates config for typescript

* feat: converts files to typescript (and required changes that comes with the transformation)

* fix: fixes tests and the bugs revealed from them

* fix: updates integration test

* fix: adds nock teardown in case it is influencing other test files

* feat: upgrades min supported version to Node 8

* chore: sets automatic generation of types files to false as I see no benefit
* Method signatures have been changed to objects.



<a name="2.0.0"></a>
# [2.0.0](https://github.com/peerigon/clockodo/compare/v1.1.1...v2.0.0) (2018-10-17)


* Conversion to Typescript (#16) ([1bedec1](https://github.com/peerigon/clockodo/commit/1bedec1)), closes [#16](https://github.com/peerigon/clockodo/issues/16)


### Features

* adding function parameter types ([#21](https://github.com/peerigon/clockodo/issues/21)) ([f3c2499](https://github.com/peerigon/clockodo/commit/f3c2499))
* Adds remaining endpoint methods and alters old method signatures ([#14](https://github.com/peerigon/clockodo/issues/14)) ([fb82c71](https://github.com/peerigon/clockodo/commit/fb82c71)), closes [#12](https://github.com/peerigon/clockodo/issues/12)


### BREAKING CHANGES

* Method Signature structure has been completely changed, and Node 6 support is dropped. 

* fix: addresses security vulnerabilities. Also adds jsdoc-to-markdown dev dependency

* fix: jsdoc-to-markdown should just be used globally. removed dependency

* changes method signatures, adds useless jsdoc

* feat: creates config for typescript

* feat: converts files to typescript (and required changes that comes with the transformation)

* fix: fixes tests and the bugs revealed from them

* fix: updates integration test

* fix: adds nock teardown in case it is influencing other test files

* feat: upgrades min supported version to Node 8

* chore: sets automatic generation of types files to false as I see no benefit
* Method signatures have been changed to objects.



<a name="1.1.1"></a>
## [1.1.1](https://github.com/peerigon/clockodo/compare/v1.1.0...v1.1.1) (2018-05-09)



<a name="1.1.0"></a>
# [1.1.0](https://github.com/peerigon/clockodo/compare/v1.0.0...v1.1.0) (2018-04-25)


### Features

* Adds startClock, stopClock, and changeClockDuration ([5db9894](https://github.com/peerigon/clockodo/commit/5db9894))



<a name="1.0.0"></a>
# 1.0.0 (2018-04-18)


### Features

* Add node 6 compatibility ([#5](https://github.com/peerigon/clockodo/issues/5)) ([fe01101](https://github.com/peerigon/clockodo/commit/fe01101))
