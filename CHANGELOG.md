# [7.0.0-beta.1](https://github.com/peerigon/clockodo/compare/v6.0.2...v7.0.0-beta.1) (2020-09-14)


### Bug Fixes

* Required params in addLumpSumEntry ([fae42f8](https://github.com/peerigon/clockodo/commit/fae42f84afbaedb13dac56afa380d2d468753cc2))


### BREAKING CHANGES

* The required params of addLumpSumEntry() where not correct. The actual required params are: "customersId", "lumpSumsAmount", "lumpSumsId", "billable", "timeSince". These need to be passed as first argument. All additional params need to be passed as second argument.

## [6.0.2](https://github.com/peerigon/clockodo/compare/v6.0.1...v6.0.2) (2020-09-14)


### Bug Fixes

* Remove const enums ([dfda203](https://github.com/peerigon/clockodo/commit/dfda203decd3c4a03b7cfa6ccd2276704fcc6ef7))

## [6.0.2-beta.1](https://github.com/peerigon/clockodo/compare/v6.0.1...v6.0.2-beta.1) (2020-09-08)


### Bug Fixes

* Remove const enums ([dfda203](https://github.com/peerigon/clockodo/commit/dfda203decd3c4a03b7cfa6ccd2276704fcc6ef7))

## [6.0.1](https://github.com/peerigon/clockodo/compare/v6.0.0...v6.0.1) (2020-07-13)


### Bug Fixes

* Add plugins to npm package ([65a14ad](https://github.com/peerigon/clockodo/commit/65a14ad8e9d51c9f473dbd8e1f0dae8760e11aa8))

# [6.0.0](https://github.com/peerigon/clockodo/compare/v5.0.0...v6.0.0) (2020-07-10)


### Features

* API improvements ([1549b51](https://github.com/peerigon/clockodo/commit/1549b51f57a274e384b55e90ca134e02702e158a))


### BREAKING CHANGES

* Adjust all keys to match clockodos rest-api

# [5.0.0](https://github.com/peerigon/clockodo/compare/v4.1.0...v5.0.0) (2020-07-10)


### Features

* Reduce bundle size by making caching optional ([b307bec](https://github.com/peerigon/clockodo/commit/b307bec0104daf4e2f0a4978e69cf73b3e812690))


### BREAKING CHANGES

* The `cacheTime` option has been removed and replaced by a plugin interface. See README for more details.

# [4.1.0](https://github.com/peerigon/clockodo/compare/v4.0.1...v4.1.0) (2020-01-31)


### Features

* **api:** introduce optional request caching ([a13ca28](https://github.com/peerigon/clockodo/commit/a13ca28))
* **api:** introduce optional request caching ([71d6d09](https://github.com/peerigon/clockodo/commit/71d6d09))

## [4.0.1](https://github.com/peerigon/clockodo/compare/v4.0.0...v4.0.1) (2020-01-31)


### Bug Fixes

* **readme:** adjust readme ([b8bf135](https://github.com/peerigon/clockodo/commit/b8bf135))

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
