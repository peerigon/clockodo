# [12.1.0](https://github.com/peerigon/clockodo/compare/v12.0.0...v12.1.0) (2022-05-03)


### Features

* Expose access and nonbusinessday models ([e499f95](https://github.com/peerigon/clockodo/commit/e499f95b8cd9471a05f977f9fb482454388b3b33))

# [12.0.0](https://github.com/peerigon/clockodo/compare/v11.0.0...v12.0.0) (2022-04-19)


### Features

* Use v2 routes for customers and projects ([f5d8b43](https://github.com/peerigon/clockodo/commit/f5d8b43c358edac82de057512cc69c2eedb759d0))


### BREAKING CHANGES

* `projects` has been removed from the `Customer` type

# [12.0.0-beta.1](https://github.com/peerigon/clockodo/compare/v11.0.0...v12.0.0-beta.1) (2022-04-12)


### Features

* Use v2 routes for customers and projects ([f5d8b43](https://github.com/peerigon/clockodo/commit/f5d8b43c358edac82de057512cc69c2eedb759d0))


### BREAKING CHANGES

* `projects` has been removed from the `Customer` type

# [11.0.0](https://github.com/peerigon/clockodo/compare/v10.3.1...v11.0.0) (2022-04-07)


* Merge pull request #82 from peerigon/missing-api-endpoints ([1ba235b](https://github.com/peerigon/clockodo/commit/1ba235b80da3d3e70c60cfbcbf73fc5fe240f75f)), closes [#82](https://github.com/peerigon/clockodo/issues/82)


### BREAKING CHANGES

* We removed all task related endpoints and also `getSearchTexts()` since these were deprecated for quite a while now.
* Fixed some incorrect return typings. You might see type errors in your TypeScript project.

## [10.3.1](https://github.com/peerigon/clockodo/compare/v10.3.0...v10.3.1) (2022-04-02)

### Bug Fixes

- Replace deprecated faker functions ([33d3ed6](https://github.com/peerigon/clockodo/commit/33d3ed67d068e41bff439e0e8e96e0fc8000e8be))

# [10.3.0](https://github.com/peerigon/clockodo/compare/v10.2.0...v10.3.0) (2022-04-02)

### Features

- Update faker module ([787b4cd](https://github.com/peerigon/clockodo/commit/787b4cd778d255790bb6b0133756140e7b47ecb7))

# [10.2.0](https://github.com/peerigon/clockodo/compare/v10.1.6...v10.2.0) (2022-03-30)

### Features

- Make locale providable ([e12c8ab](https://github.com/peerigon/clockodo/commit/e12c8abdfab2f25be82103c00b892d1a62902ea1))

## [10.1.6](https://github.com/peerigon/clockodo/compare/v10.1.5...v10.1.6) (2022-03-11)

### Bug Fixes

- Incorrect absence mock ([979266d](https://github.com/peerigon/clockodo/commit/979266d2c26902f3e6dc561f4676f3e0a93b0af5))

## [10.1.5](https://github.com/peerigon/clockodo/compare/v10.1.4...v10.1.5) (2022-03-11)

### Bug Fixes

- Incorrect entry mocks implementation ([3840ab6](https://github.com/peerigon/clockodo/commit/3840ab645ad856a51e6c94573c127dbc4bcf21cc))

## [10.1.4](https://github.com/peerigon/clockodo/compare/v10.1.3...v10.1.4) (2022-03-11)

### Bug Fixes

- Improve mocks ([1b951e8](https://github.com/peerigon/clockodo/commit/1b951e84c3bdb08cea43d2ee312c7be95946b99b))

## [10.1.3](https://github.com/peerigon/clockodo/compare/v10.1.2...v10.1.3) (2022-03-10)

### Bug Fixes

- Export absence mocks ([b07b102](https://github.com/peerigon/clockodo/commit/b07b1028e33a15b8776f01aea857b1babd6416cf))

## [10.1.2](https://github.com/peerigon/clockodo/compare/v10.1.1...v10.1.2) (2022-03-10)

### Bug Fixes

- Incorrect absence typings ([563c0c5](https://github.com/peerigon/clockodo/commit/563c0c5fd3428fd86ffd4feabc7ada0bb66821e8))

## [10.1.1](https://github.com/peerigon/clockodo/compare/v10.1.0...v10.1.1) (2022-03-05)

### Bug Fixes

- Incorrect userReport typings ([5440658](https://github.com/peerigon/clockodo/commit/5440658f10982c74be95d9107e4c6727e46cb814))

# [10.1.0](https://github.com/peerigon/clockodo/compare/v10.0.0...v10.1.0) (2022-01-02)

### Features

- Add functions for parsing csv entries ([21c7176](https://github.com/peerigon/clockodo/commit/21c7176066679a0af5df38742b69869ab2008a50))

# [10.0.0](https://github.com/peerigon/clockodo/compare/v9.7.2...v10.0.0) (2021-12-15)

### Bug Fixes

- Downgrade map-obj to CJS version ([8cd26ae](https://github.com/peerigon/clockodo/commit/8cd26aeb358f0bc7a8886c989598dcbe20b3e668))
- Incorrect typing of "offset" ([a8f5752](https://github.com/peerigon/clockodo/commit/a8f5752e9c1f5495c3ef0d85d576e27bf0bdc980))
- Issues with Turkish locale ([5831bbc](https://github.com/peerigon/clockodo/commit/5831bbc0174e03f20e1225911e08e892f6ef3f03))

### BREAKING CHANGES

- The mapping algorithm to map camelCase to snake_case and vice versa has been changed. There is a slight chance that some keys might be mapped differently (although our tests did not reveal anything like that).

# [10.0.0-beta.3](https://github.com/peerigon/clockodo/compare/v10.0.0-beta.2...v10.0.0-beta.3) (2021-12-09)

### Bug Fixes

- Downgrade map-obj to CJS version ([8cd26ae](https://github.com/peerigon/clockodo/commit/8cd26aeb358f0bc7a8886c989598dcbe20b3e668))

# [10.0.0-beta.2](https://github.com/peerigon/clockodo/compare/v10.0.0-beta.1...v10.0.0-beta.2) (2021-12-08)

### Bug Fixes

- Incorrect typing of "offset" ([a8f5752](https://github.com/peerigon/clockodo/commit/a8f5752e9c1f5495c3ef0d85d576e27bf0bdc980))

# [10.0.0-beta.1](https://github.com/peerigon/clockodo/compare/v9.7.2...v10.0.0-beta.1) (2021-12-08)

### Bug Fixes

- Issues with Turkish locale ([5831bbc](https://github.com/peerigon/clockodo/commit/5831bbc0174e03f20e1225911e08e892f6ef3f03))

### BREAKING CHANGES

- The mapping algorithm to map camelCase to snake_case and vice versa has been changed. There is a slight chance that some keys might be mapped differently (although our tests did not reveal anything like that).

## [9.7.2](https://github.com/peerigon/clockodo/compare/v9.7.1...v9.7.2) (2021-11-30)

### Bug Fixes

- Incorrect typing of countReductionUsed ([6671c9f](https://github.com/peerigon/clockodo/commit/6671c9f417be0815d55c05bd3cababae5dddfdc0))

## [9.7.1](https://github.com/peerigon/clockodo/compare/v9.7.0...v9.7.1) (2021-11-28)

### Bug Fixes

- Improve UserReport typings ([f3c7c56](https://github.com/peerigon/clockodo/commit/f3c7c56103d9202d4d5fa1e3c30e2a4ed51b699d))

# [9.7.0](https://github.com/peerigon/clockodo/compare/v9.6.1...v9.7.0) (2021-11-13)

### Features

- Add getNonbusinessGroups() and getNonbusinessDays() ([ba034ef](https://github.com/peerigon/clockodo/commit/ba034ef00362e1afeecd175a8153e694a66e16ce))

## [9.6.1](https://github.com/peerigon/clockodo/compare/v9.6.0...v9.6.1) (2021-11-12)

### Bug Fixes

- Incorrect TypeScript typings of addAbsence() ([ded0d1d](https://github.com/peerigon/clockodo/commit/ded0d1d1f3ae66614df79de48b6dae1d7e922a39))

# [9.6.0](https://github.com/peerigon/clockodo/compare/v9.5.2...v9.6.0) (2021-11-01)

### Features

- Add getAggregatesUsersMe() ([c6385e1](https://github.com/peerigon/clockodo/commit/c6385e180a250b6b88fc1120a840b7296915834f))
- Improve targethours typings ([3b063ab](https://github.com/peerigon/clockodo/commit/3b063ab520ffae4be3c050eba87e376bb13b29ef))

## [9.5.2](https://github.com/peerigon/clockodo/compare/v9.5.1...v9.5.2) (2021-10-24)

### Bug Fixes

- **TypeScript:** Incorrect absence types ([e0f2136](https://github.com/peerigon/clockodo/commit/e0f21365872e5efaabad3264281c8ed2fc899711))

## [9.5.1](https://github.com/peerigon/clockodo/compare/v9.5.0...v9.5.1) (2021-10-11)

### Bug Fixes

- Incorrect Entry and LumpsumService mocks ([12cc74a](https://github.com/peerigon/clockodo/commit/12cc74a778f8242c5e086a9c9c3eebfbf8ac1df9))

# [9.5.0](https://github.com/peerigon/clockodo/compare/v9.4.0...v9.5.0) (2021-10-09)

### Features

- Improve entry filters ([613fa00](https://github.com/peerigon/clockodo/commit/613fa006b0e5d27c2a30718bb9788a46b780ec7b))

# [9.4.0](https://github.com/peerigon/clockodo/compare/v9.3.0...v9.4.0) (2021-10-09)

### Bug Fixes

- Unrecognized package exports in TypeScript ([1d41301](https://github.com/peerigon/clockodo/commit/1d41301071bc125d5db72119b15b6792d55fd089))

### Features

- Expose a way to set the faker seed ([726f8e5](https://github.com/peerigon/clockodo/commit/726f8e5c5b13cad8403f8d09b3e3cf31019e2021))

# [9.3.0](https://github.com/peerigon/clockodo/compare/v9.2.0...v9.3.0) (2021-10-09)

### Features

- Add entry utility functions ([047deb7](https://github.com/peerigon/clockodo/commit/047deb7c3da02a8aa0177cb3b77697030dfa60b8))
- Add entry utils ([d566218](https://github.com/peerigon/clockodo/commit/d566218ee243c6efa0886a9240c78907d4a1019d))
- Introduce subpackage mocks ([f8a8d5f](https://github.com/peerigon/clockodo/commit/f8a8d5f2ae3fd358845cd10bfdfa910b29e9d325))

# [9.2.0](https://github.com/peerigon/clockodo/compare/v9.1.1...v9.2.0) (2021-10-08)

### Features

- Add customer color property ([#73](https://github.com/peerigon/clockodo/issues/73)) ([0150677](https://github.com/peerigon/clockodo/commit/0150677653c45948172bf729241ca635e1631d3a))

## [9.1.1](https://github.com/peerigon/clockodo/compare/v9.1.0...v9.1.1) (2021-09-17)

### Bug Fixes

- Update user types ([c9c8652](https://github.com/peerigon/clockodo/commit/c9c865265901fa10e772296c8d26a858682ef737))

# [9.1.0](https://github.com/peerigon/clockodo/compare/v9.0.0...v9.1.0) (2021-09-14)

### Features

- Add getProjects() ([a44785f](https://github.com/peerigon/clockodo/commit/a44785f833974ad82d038d7a9a6148a910790e59))

# [9.0.0](https://github.com/peerigon/clockodo/compare/v8.0.7...v9.0.0) (2021-09-13)

### Bug Fixes

- Correct more types ([323bed5](https://github.com/peerigon/clockodo/commit/323bed55e50f6bf62cb793cdf47d904c87f8f2de))
- Correct type attribution ([f895fa9](https://github.com/peerigon/clockodo/commit/f895fa925c63a1dbec6800452e2074930dc69b46))
- Improve types ([9266392](https://github.com/peerigon/clockodo/commit/9266392df6660268837cd656e134f58b2cdf0340))
- Improve types and wording ([3f79891](https://github.com/peerigon/clockodo/commit/3f798911a6d93fb3929638ec09dc237b58b184ff))
- Make header required and use it in integration tests ([a028311](https://github.com/peerigon/clockodo/commit/a02831172a4a9438726c114daa715bab559a74d7))
- Repair Tests ([865aede](https://github.com/peerigon/clockodo/commit/865aede39eb96cb2001d9caa1938b0660fd161f0))
- Repair Unit Tests ([8da6020](https://github.com/peerigon/clockodo/commit/8da60206924a24c6827a59f2f0c50a0055cd8c6e))
- Revert incorrect typing of timeClockedSince ([cc4d797](https://github.com/peerigon/clockodo/commit/cc4d79739a028d5765efae0957fc75dafa7bd895))
- TimeEntry typing of timeClockedSince property ([770f47a](https://github.com/peerigon/clockodo/commit/770f47ad292ae29371e3fa567523cda3354b1b94))

### chore

- Remove internals folder ([994550a](https://github.com/peerigon/clockodo/commit/994550a096056c07c0e86f3ac9f392e78205c301))

### Features

- Add API v2 changes ([0f8bc56](https://github.com/peerigon/clockodo/commit/0f8bc5637911b9ceea4c53a973c7bd7fff5068d0))
- Add proper native ESM support ([2846a94](https://github.com/peerigon/clockodo/commit/2846a9409e8e1974a4a1a7807eecdb9dadaf12f8))
- Do not use class properties as methods anymore ([a0d04c3](https://github.com/peerigon/clockodo/commit/a0d04c34efd131c6fe4d4ca3e5bfd2a6c8934501))
- Introduce enums ([0515034](https://github.com/peerigon/clockodo/commit/0515034de054d1aeceb888ba3c59bef4812ae373))
- Publish beta version ([1446e55](https://github.com/peerigon/clockodo/commit/1446e557c0e934dbefac2b666ee29f7c5cd8933b))
- Publish beta version ([000369a](https://github.com/peerigon/clockodo/commit/000369a40bb3995c1926dfab53a2f3a12e526a3d))
- Publish beta version ([2018711](https://github.com/peerigon/clockodo/commit/201871129cc94772b4920c59bad55912e9675391))
- remove offset property ([bbf047b](https://github.com/peerigon/clockodo/commit/bbf047b08c6a3da7647128f747fe7e85d66c5cbf))
- Remove Promise<> type from returnTypes ([d6f4c15](https://github.com/peerigon/clockodo/commit/d6f4c15d8aff7f0187f99086fb338cc2fa8c1463))
- Switch to MIT license ([dd07fb1](https://github.com/peerigon/clockodo/commit/dd07fb172e63ab093b5bdcf8ba61658e49095b59))
- Use new endpoints in code, remove old ones ([d3495f4](https://github.com/peerigon/clockodo/commit/d3495f4053c864c2736adaad6e01407b55c30177))

### BREAKING CHANGES

- Methods on Clockodo and Api instances won't be bound to the instance anymore.
- The return types are not wrapped in Promise<> types anymore. You may need to update your types.
- Switch to MIT license
- All files inside internals have been moved up to the src directory. This change might break your app in case you've used deep package imports.
- Depending on your build and runtime configuration, this change might break your path resolution.

# [9.0.0-beta.2](https://github.com/peerigon/clockodo/compare/v9.0.0-beta.1...v9.0.0-beta.2) (2021-09-13)

### chore

- Remove internals folder ([994550a](https://github.com/peerigon/clockodo/commit/994550a096056c07c0e86f3ac9f392e78205c301))

### Features

- Do not use class properties as methods anymore ([a0d04c3](https://github.com/peerigon/clockodo/commit/a0d04c34efd131c6fe4d4ca3e5bfd2a6c8934501))
- Remove Promise<> type from returnTypes ([d6f4c15](https://github.com/peerigon/clockodo/commit/d6f4c15d8aff7f0187f99086fb338cc2fa8c1463))
- Switch to MIT license ([dd07fb1](https://github.com/peerigon/clockodo/commit/dd07fb172e63ab093b5bdcf8ba61658e49095b59))

### BREAKING CHANGES

- Methods on Clockodo and Api instances won't be bound to the instance anymore.
- The return types are not wrapped in Promise<> types anymore. You may need to update your types.
- Switch to MIT license
- All files inside internals have been moved up to the src directory. This change might break your app in case you've used deep package imports.

# [9.0.0-beta.1](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.14...v9.0.0-beta.1) (2021-09-13)

### Features

- Add proper native ESM support ([2846a94](https://github.com/peerigon/clockodo/commit/2846a9409e8e1974a4a1a7807eecdb9dadaf12f8))

### BREAKING CHANGES

- Depending on your build and runtime configuration, this change might break your path resolution.

# [8.1.0-beta.14](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.13...v8.1.0-beta.14) (2021-06-02)

### Bug Fixes

- Revert incorrect typing of timeClockedSince ([cc4d797](https://github.com/peerigon/clockodo/commit/cc4d79739a028d5765efae0957fc75dafa7bd895))

# [8.1.0-beta.13](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.12...v8.1.0-beta.13) (2021-06-02)

### Bug Fixes

- TimeEntry typing of timeClockedSince property ([770f47a](https://github.com/peerigon/clockodo/commit/770f47ad292ae29371e3fa567523cda3354b1b94))

# [8.1.0-beta.12](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.11...v8.1.0-beta.12) (2021-05-31)

### Features

- Add API v2 changes ([0f8bc56](https://github.com/peerigon/clockodo/commit/0f8bc5637911b9ceea4c53a973c7bd7fff5068d0))

# [8.1.0-beta.11](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.10...v8.1.0-beta.11) (2021-05-31)

### Features

- remove offset property ([bbf047b](https://github.com/peerigon/clockodo/commit/bbf047b08c6a3da7647128f747fe7e85d66c5cbf))

# [8.1.0-beta.10](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.9...v8.1.0-beta.10) (2021-05-31)

### Features

- Publish beta version ([1446e55](https://github.com/peerigon/clockodo/commit/1446e557c0e934dbefac2b666ee29f7c5cd8933b))

# [8.1.0-beta.9](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.8...v8.1.0-beta.9) (2021-05-25)

### Features

- Publish beta version ([000369a](https://github.com/peerigon/clockodo/commit/000369a40bb3995c1926dfab53a2f3a12e526a3d))

# [8.1.0-beta.8](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.7...v8.1.0-beta.8) (2021-05-25)

### Features

- Publish beta version ([2018711](https://github.com/peerigon/clockodo/commit/201871129cc94772b4920c59bad55912e9675391))

# [8.1.0-beta.7](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.6...v8.1.0-beta.7) (2021-05-19)

### Features

- Introduce enums ([0515034](https://github.com/peerigon/clockodo/commit/0515034de054d1aeceb888ba3c59bef4812ae373))

# [8.1.0-beta.6](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.5...v8.1.0-beta.6) (2021-05-07)

### Bug Fixes

- Make header required and use it in integration tests ([a028311](https://github.com/peerigon/clockodo/commit/a02831172a4a9438726c114daa715bab559a74d7))
- Repair Tests ([865aede](https://github.com/peerigon/clockodo/commit/865aede39eb96cb2001d9caa1938b0660fd161f0))

# [8.1.0-beta.5](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.4...v8.1.0-beta.5) (2021-05-05)

### Bug Fixes

- Correct more types ([323bed5](https://github.com/peerigon/clockodo/commit/323bed55e50f6bf62cb793cdf47d904c87f8f2de))

# [8.1.0-beta.4](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.3...v8.1.0-beta.4) (2021-04-30)

### Bug Fixes

- Correct type attribution ([f895fa9](https://github.com/peerigon/clockodo/commit/f895fa925c63a1dbec6800452e2074930dc69b46))

# [8.1.0-beta.3](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.2...v8.1.0-beta.3) (2021-04-29)

### Bug Fixes

- Improve types ([9266392](https://github.com/peerigon/clockodo/commit/9266392df6660268837cd656e134f58b2cdf0340))

# [8.1.0-beta.2](https://github.com/peerigon/clockodo/compare/v8.1.0-beta.1...v8.1.0-beta.2) (2021-04-27)

### Bug Fixes

- Improve types and wording ([3f79891](https://github.com/peerigon/clockodo/commit/3f798911a6d93fb3929638ec09dc237b58b184ff))

# [8.1.0-beta.1](https://github.com/peerigon/clockodo/compare/v8.0.7...v8.1.0-beta.1) (2021-04-27)

### Bug Fixes

- Repair Unit Tests ([8da6020](https://github.com/peerigon/clockodo/commit/8da60206924a24c6827a59f2f0c50a0055cd8c6e))

### Features

- Use new endpoints in code, remove old ones ([d3495f4](https://github.com/peerigon/clockodo/commit/d3495f4053c864c2736adaad6e01407b55c30177))

## [8.0.7](https://github.com/peerigon/clockodo/compare/v8.0.6...v8.0.7) (2021-04-16)

### Bug Fixes

- **typescript:** Make restricted project properties optional ([936f134](https://github.com/peerigon/clockodo/commit/936f1340391fc6135c879b55c425d4a200983322))
- **typescript:** revenueFactor can be null ([d0f8965](https://github.com/peerigon/clockodo/commit/d0f896507550bdd81e8c9db90adf53d315c7f360))

## [8.0.6](https://github.com/peerigon/clockodo/compare/v8.0.5...v8.0.6) (2021-03-01)

### Bug Fixes

- Wrong URL being used in getSearchTexts() ([#64](https://github.com/peerigon/clockodo/issues/64)) ([32931b7](https://github.com/peerigon/clockodo/commit/32931b7275859dbbbc667e6c3c26612d27bb6a6c))

## [8.0.5](https://github.com/peerigon/clockodo/compare/v8.0.4...v8.0.5) (2021-02-12)

### Bug Fixes

- Wrong package configuration ([f696320](https://github.com/peerigon/clockodo/commit/f6963206fdf7cc620e9b62c7eca7fe9c54fa8fa2))

## [8.0.4](https://github.com/peerigon/clockodo/compare/v8.0.3...v8.0.4) (2021-02-12)

### Bug Fixes

- exports-fields in package.json ([cbb45ab](https://github.com/peerigon/clockodo/commit/cbb45ab895cfc52afd1f0fe6b2c3f89855e9fa49))

## [8.0.3](https://github.com/peerigon/clockodo/compare/v8.0.2...v8.0.3) (2021-02-11)

### Bug Fixes

- Enable CORS for login requests ([8e6859e](https://github.com/peerigon/clockodo/commit/8e6859e4d39f90cfc7dfd49f41f37fd0a5cd744c))

## [8.0.2](https://github.com/peerigon/clockodo/compare/v8.0.1...v8.0.2) (2021-02-10)

### Bug Fixes

- Update dependencies ([da2dfbe](https://github.com/peerigon/clockodo/commit/da2dfbe39d3ec4d271f1be899b40c11bae41b5eb))

## [8.0.1](https://github.com/peerigon/clockodo/compare/v8.0.0...v8.0.1) (2021-02-10)

### Bug Fixes

- Broken plugin import statements ([b0fa5ac](https://github.com/peerigon/clockodo/commit/b0fa5ac3fef8e12825add5a7a2870f2bbed25d40))

# [8.0.0](https://github.com/peerigon/clockodo/compare/v7.0.0...v8.0.0) (2021-02-10)

### Bug Fixes

- Improve types ([102655a](https://github.com/peerigon/clockodo/commit/102655a85690a8b5ce93e1bd5714bb30bc9e1fe5))
- typo ([817d3e5](https://github.com/peerigon/clockodo/commit/817d3e527d55f55f8d0fcc5b2f011420cd2d5bd4))

### Features

- Add cookie authentication support ([9fc6276](https://github.com/peerigon/clockodo/commit/9fc6276c021605b64dad35525cbbde8ec47365a6))
- Add ESM support ([c09e86c](https://github.com/peerigon/clockodo/commit/c09e86c6f4f017b5d54db9c6ca7386d24fc6f8e1))
- Add getLumpSumServices() ([cc344e0](https://github.com/peerigon/clockodo/commit/cc344e05969bcc7f40c103ff17e83690df96e5d2))
- Enable ISO UTC date times for all requests ([6905d6b](https://github.com/peerigon/clockodo/commit/6905d6b251fe27dfd5ef92ad8f46401f96c2b337))
- Refactor public interface ([2c23de4](https://github.com/peerigon/clockodo/commit/2c23de48d8f0532061d785ce64444afff5dd94f0)), closes [#50](https://github.com/peerigon/clockodo/issues/50) [#50](https://github.com/peerigon/clockodo/issues/50)

### BREAKING CHANGES

- clockodo is now available as CommonJS and ECMAScript module. Although very unlikely, this might cause issues depending on your specific setup.
- All timestamps are now returned as ISO UTC. You don't need the user's time zone to interpret the times correctly now.
- Some return types have been updated and corrected. This might result in TypeScript errors.
- The Clockodo constructor arguments have changed a little bit. Check out the documentation for correct usage.

# [7.0.0](https://github.com/peerigon/clockodo/compare/v6.0.2...v7.0.0) (2020-12-03)

### Bug Fixes

- billable not required when calling addEntry() with a lumpsum entry ([f422119](https://github.com/peerigon/clockodo/commit/f422119df88cc976c41103dea11400b4549211fb))
- Incorrect addEntry() params ([1603410](https://github.com/peerigon/clockodo/commit/1603410eb6be6cbb85693ed08874f2541d91b225))
- Make billable required again for addEntry() ([dda2bc8](https://github.com/peerigon/clockodo/commit/dda2bc8a004ba5966fa329952475d4ba96717cfb))
- typo ([6c4810c](https://github.com/peerigon/clockodo/commit/6c4810c7b95d9272876eac2c2c5b1617c885f03e))
- **Types:** Make running-propety in return types optional ([7b83d14](https://github.com/peerigon/clockodo/commit/7b83d1465625a803aeabad5376f575dd2297a799))
- Required params in addLumpSumEntry ([fae42f8](https://github.com/peerigon/clockodo/commit/fae42f84afbaedb13dac56afa380d2d468753cc2))

### chore

- Drop official support for Node 8 ([668decf](https://github.com/peerigon/clockodo/commit/668decf7ceedb6f628338e024e564d9f0d35b992))

### Features

- Improve query and property mapping ([6dadcd0](https://github.com/peerigon/clockodo/commit/6dadcd0e9d9f80900a9f83dacfbd20cd949d08cd)), closes [#52](https://github.com/peerigon/clockodo/issues/52) [#60](https://github.com/peerigon/clockodo/issues/60)
- Merge addLumpEntry with addEntry() ([825b72e](https://github.com/peerigon/clockodo/commit/825b72ea6245108fe0e67586503f6edaebf954f2))

- Update esLint and use lint-staged + prettier ([74abf23](https://github.com/peerigon/clockodo/commit/74abf23a2210590d9e14287962f9bce76f656797))

### BREAKING CHANGES

- The mapping between camelCase and snake_case has been streamlined and improved. You might observe different behavior if you relied on the previous (buggy) implementation.
- Our test pipeline does not execute our tests for Node 8 anymore. There is no breaking change we know of but we don't guarantee that it will work on Node 8.
- The Clockodo class uses arrow functions as methods.
- addLumpEntry() has been removed. You can use addEntry() to create a recurring lump sum entry.
- addEntry() actually requires different params based on what type of entry you want to create. If you want to create a time entry, you need to pass timeUntil. If you want to create a lump sum entry, you need to pass a lumpSum.
- The required params of addLumpSumEntry() where not correct. The actual required params are: "customersId", "lumpSumsAmount", "lumpSumsId", "billable", "timeSince". These need to be passed as first argument. All additional params need to be passed as second argument.

# [7.0.0-beta.8](https://github.com/peerigon/clockodo/compare/v7.0.0-beta.7...v7.0.0-beta.8) (2020-12-01)

### Features

- Improve query and property mapping ([6dadcd0](https://github.com/peerigon/clockodo/commit/6dadcd0e9d9f80900a9f83dacfbd20cd949d08cd)), closes [#52](https://github.com/peerigon/clockodo/issues/52) [#60](https://github.com/peerigon/clockodo/issues/60)

### BREAKING CHANGES

- The mapping between camelCase and snake_case has been streamlined and improved. You might observe different behavior if you relied on the previous (buggy) implementation.

# [7.0.0-beta.7](https://github.com/peerigon/clockodo/compare/v7.0.0-beta.6...v7.0.0-beta.7) (2020-09-16)

### chore

- Drop official support for Node 8 ([668decf](https://github.com/peerigon/clockodo/commit/668decf7ceedb6f628338e024e564d9f0d35b992))

### Features

- Improve query and property mapping ([6dadcd0](https://github.com/peerigon/clockodo/commit/6dadcd0e9d9f80900a9f83dacfbd20cd949d08cd)), closes [#52](https://github.com/peerigon/clockodo/issues/52) [#60](https://github.com/peerigon/clockodo/issues/60)
- Merge addLumpEntry with addEntry() ([825b72e](https://github.com/peerigon/clockodo/commit/825b72ea6245108fe0e67586503f6edaebf954f2))

- Update esLint and use lint-staged + prettier ([74abf23](https://github.com/peerigon/clockodo/commit/74abf23a2210590d9e14287962f9bce76f656797))

### BREAKING CHANGES

- The mapping between camelCase and snake_case has been streamlined and improved. You might observe different behavior if you relied on the previous (buggy) implementation.
- Our test pipeline does not execute our tests for Node 8 anymore. There is no breaking change we know of but we don't guarantee that it will work on Node 8.
- The Clockodo class uses arrow functions as methods.
- addLumpEntry() has been removed. You can use addEntry() to create a recurring lump sum entry.
- addEntry() actually requires different params based on what type of entry you want to create. If you want to create a time entry, you need to pass timeUntil. If you want to create a lump sum entry, you need to pass a lumpSum.
- The required params of addLumpSumEntry() where not correct. The actual required params are: "customersId", "lumpSumsAmount", "lumpSumsId", "billable", "timeSince". These need to be passed as first argument. All additional params need to be passed as second argument.

# [7.0.0-beta.8](https://github.com/peerigon/clockodo/compare/v7.0.0-beta.7...v7.0.0-beta.8) (2020-12-01)

### Features

- Improve query and property mapping ([6dadcd0](https://github.com/peerigon/clockodo/commit/6dadcd0e9d9f80900a9f83dacfbd20cd949d08cd)), closes [#52](https://github.com/peerigon/clockodo/issues/52) [#60](https://github.com/peerigon/clockodo/issues/60)

### BREAKING CHANGES

- The mapping between camelCase and snake_case has been streamlined and improved. You might observe different behavior if you relied on the previous (buggy) implementation.

# [7.0.0-beta.7](https://github.com/peerigon/clockodo/compare/v7.0.0-beta.6...v7.0.0-beta.7) (2020-09-16)

### chore

- Drop official support for Node 8 ([668decf](https://github.com/peerigon/clockodo/commit/668decf7ceedb6f628338e024e564d9f0d35b992))

### BREAKING CHANGES

- Our test pipeline does not execute our tests for Node 8 anymore. There is no breaking change we know of but we don't guarantee that it will work on Node 8.

# [7.0.0-beta.6](https://github.com/peerigon/clockodo/compare/v7.0.0-beta.5...v7.0.0-beta.6) (2020-09-16)

- Update esLint and use lint-staged + prettier ([74abf23](https://github.com/peerigon/clockodo/commit/74abf23a2210590d9e14287962f9bce76f656797))

### BREAKING CHANGES

- The Clockodo class uses arrow functions as methods.

# [7.0.0-beta.5](https://github.com/peerigon/clockodo/compare/v7.0.0-beta.4...v7.0.0-beta.5) (2020-09-14)

### Bug Fixes

- Make billable required again for addEntry() ([dda2bc8](https://github.com/peerigon/clockodo/commit/dda2bc8a004ba5966fa329952475d4ba96717cfb))

# [7.0.0-beta.4](https://github.com/peerigon/clockodo/compare/v7.0.0-beta.3...v7.0.0-beta.4) (2020-09-14)

### Bug Fixes

- billable not required when calling addEntry() with a lumpsum entry ([f422119](https://github.com/peerigon/clockodo/commit/f422119df88cc976c41103dea11400b4549211fb))
- **Types:** Make running-propety in return types optional ([7b83d14](https://github.com/peerigon/clockodo/commit/7b83d1465625a803aeabad5376f575dd2297a799))

# [7.0.0-beta.3](https://github.com/peerigon/clockodo/compare/v7.0.0-beta.2...v7.0.0-beta.3) (2020-09-14)

### Features

- Merge addLumpEntry with addEntry() ([825b72e](https://github.com/peerigon/clockodo/commit/825b72ea6245108fe0e67586503f6edaebf954f2))

### BREAKING CHANGES

- addLumpEntry() has been removed. You can use addEntry() to create a recurring lump sum entry.

# [7.0.0-beta.2](https://github.com/peerigon/clockodo/compare/v7.0.0-beta.1...v7.0.0-beta.2) (2020-09-14)

### Bug Fixes

- Incorrect addEntry() params ([1603410](https://github.com/peerigon/clockodo/commit/1603410eb6be6cbb85693ed08874f2541d91b225))

### BREAKING CHANGES

- addEntry() actually requires different params based on what type of entry you want to create. If you want to create a time entry, you need to pass timeUntil. If you want to create a lump sum entry, you need to pass a lumpSum.

# [7.0.0-beta.1](https://github.com/peerigon/clockodo/compare/v6.0.2...v7.0.0-beta.1) (2020-09-14)

### Bug Fixes

- Required params in addLumpSumEntry ([fae42f8](https://github.com/peerigon/clockodo/commit/fae42f84afbaedb13dac56afa380d2d468753cc2))

### BREAKING CHANGES

- The required params of addLumpSumEntry() where not correct. The actual required params are: "customersId", "lumpSumsAmount", "lumpSumsId", "billable", "timeSince". These need to be passed as first argument. All additional params need to be passed as second argument.

## [6.0.2](https://github.com/peerigon/clockodo/compare/v6.0.1...v6.0.2) (2020-09-14)

### Bug Fixes

- Remove const enums ([dfda203](https://github.com/peerigon/clockodo/commit/dfda203decd3c4a03b7cfa6ccd2276704fcc6ef7))

## [6.0.2-beta.1](https://github.com/peerigon/clockodo/compare/v6.0.1...v6.0.2-beta.1) (2020-09-08)

### Bug Fixes

- Remove const enums ([dfda203](https://github.com/peerigon/clockodo/commit/dfda203decd3c4a03b7cfa6ccd2276704fcc6ef7))

## [6.0.1](https://github.com/peerigon/clockodo/compare/v6.0.0...v6.0.1) (2020-07-13)

### Bug Fixes

- Add plugins to npm package ([65a14ad](https://github.com/peerigon/clockodo/commit/65a14ad8e9d51c9f473dbd8e1f0dae8760e11aa8))

# [6.0.0](https://github.com/peerigon/clockodo/compare/v5.0.0...v6.0.0) (2020-07-10)

### Features

- API improvements ([1549b51](https://github.com/peerigon/clockodo/commit/1549b51f57a274e384b55e90ca134e02702e158a))

### BREAKING CHANGES

- Adjust all keys to match clockodos rest-api

# [5.0.0](https://github.com/peerigon/clockodo/compare/v4.1.0...v5.0.0) (2020-07-10)

### Features

- Reduce bundle size by making caching optional ([b307bec](https://github.com/peerigon/clockodo/commit/b307bec0104daf4e2f0a4978e69cf73b3e812690))

### BREAKING CHANGES

- The `cacheTime` option has been removed and replaced by a plugin interface. See README for more details.

# [4.1.0](https://github.com/peerigon/clockodo/compare/v4.0.1...v4.1.0) (2020-01-31)

### Features

- **api:** introduce optional request caching ([a13ca28](https://github.com/peerigon/clockodo/commit/a13ca28))
- **api:** introduce optional request caching ([71d6d09](https://github.com/peerigon/clockodo/commit/71d6d09))

## [4.0.1](https://github.com/peerigon/clockodo/compare/v4.0.0...v4.0.1) (2020-01-31)

### Bug Fixes

- **readme:** adjust readme ([b8bf135](https://github.com/peerigon/clockodo/commit/b8bf135))

# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [4.0.0](https://github.com/peerigon/clockodo/compare/v3.2.0...v4.0.0) (2020-01-24)

### Bug Fixes

- Change id type from string to number ([0513722](https://github.com/peerigon/clockodo/commit/0513722))

### BREAKING CHANGES

- Clockodo REST API uses type number for ids.

## [3.2.0](https://github.com/peerigon/clockodo/compare/v3.1.6...v3.2.0) (2019-12-17)

### [3.1.6](https://github.com/peerigon/clockodo/compare/v3.1.5...v3.1.6) (2019-09-23)

### [3.1.5](https://github.com/peerigon/clockodo/compare/v3.1.4...v3.1.5) (2019-08-28)

<a name="3.1.4"></a>

## [3.1.4](https://github.com/peerigon/clockodo/compare/v3.1.3...v3.1.4) (2019-06-28)

<a name="3.1.3"></a>

## [3.1.3](https://github.com/peerigon/clockodo/compare/v3.1.2...v3.1.3) (2019-05-28)

### Bug Fixes

- removes dangerous and unneeded dependencies ([6436399](https://github.com/peerigon/clockodo/commit/6436399))

<a name="3.1.2"></a>

## [3.1.2](https://github.com/peerigon/clockodo/compare/v3.1.1...v3.1.2) (2019-05-28)

### Bug Fixes

- Array in Request Params ([#26](https://github.com/peerigon/clockodo/issues/26)) ([055de86](https://github.com/peerigon/clockodo/commit/055de86))

<a name="3.1.1"></a>

## [3.1.1](https://github.com/peerigon/clockodo/compare/v3.1.0...v3.1.1) (2018-10-24)

<a name="3.1.0"></a>

# [3.1.0](https://github.com/peerigon/clockodo/compare/v3.0.0...v3.1.0) (2018-10-24)

### Features

- Add target hours ([#22](https://github.com/peerigon/clockodo/issues/22)) ([ec25b66](https://github.com/peerigon/clockodo/commit/ec25b66))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/peerigon/clockodo/compare/v1.1.1...v3.0.0) (2018-10-17)

- Conversion to Typescript (#16) ([1bedec1](https://github.com/peerigon/clockodo/commit/1bedec1)), closes [#16](https://github.com/peerigon/clockodo/issues/16)

### Bug Fixes

- fixes outdate files option in package.json ([4a9f98e](https://github.com/peerigon/clockodo/commit/4a9f98e))

### Features

- adding function parameter types ([#21](https://github.com/peerigon/clockodo/issues/21)) ([f3c2499](https://github.com/peerigon/clockodo/commit/f3c2499))
- Adds remaining endpoint methods and alters old method signatures ([#14](https://github.com/peerigon/clockodo/issues/14)) ([fb82c71](https://github.com/peerigon/clockodo/commit/fb82c71)), closes [#12](https://github.com/peerigon/clockodo/issues/12)

### BREAKING CHANGES

- 2.0.0 was missing all of the code in its publication due to an outdated files value.
- Method Signature structure has been completely changed, and Node 6 support is dropped.

- fix: addresses security vulnerabilities. Also adds jsdoc-to-markdown dev dependency

- fix: jsdoc-to-markdown should just be used globally. removed dependency

- changes method signatures, adds useless jsdoc

- feat: creates config for typescript

- feat: converts files to typescript (and required changes that comes with the transformation)

- fix: fixes tests and the bugs revealed from them

- fix: updates integration test

- fix: adds nock teardown in case it is influencing other test files

- feat: upgrades min supported version to Node 8

- chore: sets automatic generation of types files to false as I see no benefit
- Method signatures have been changed to objects.

<a name="2.0.0"></a>

# [2.0.0](https://github.com/peerigon/clockodo/compare/v1.1.1...v2.0.0) (2018-10-17)

- Conversion to Typescript (#16) ([1bedec1](https://github.com/peerigon/clockodo/commit/1bedec1)), closes [#16](https://github.com/peerigon/clockodo/issues/16)

### Features

- adding function parameter types ([#21](https://github.com/peerigon/clockodo/issues/21)) ([f3c2499](https://github.com/peerigon/clockodo/commit/f3c2499))
- Adds remaining endpoint methods and alters old method signatures ([#14](https://github.com/peerigon/clockodo/issues/14)) ([fb82c71](https://github.com/peerigon/clockodo/commit/fb82c71)), closes [#12](https://github.com/peerigon/clockodo/issues/12)

### BREAKING CHANGES

- Method Signature structure has been completely changed, and Node 6 support is dropped.

- fix: addresses security vulnerabilities. Also adds jsdoc-to-markdown dev dependency

- fix: jsdoc-to-markdown should just be used globally. removed dependency

- changes method signatures, adds useless jsdoc

- feat: creates config for typescript

- feat: converts files to typescript (and required changes that comes with the transformation)

- fix: fixes tests and the bugs revealed from them

- fix: updates integration test

- fix: adds nock teardown in case it is influencing other test files

- feat: upgrades min supported version to Node 8

- chore: sets automatic generation of types files to false as I see no benefit
- Method signatures have been changed to objects.

<a name="1.1.1"></a>

## [1.1.1](https://github.com/peerigon/clockodo/compare/v1.1.0...v1.1.1) (2018-05-09)

<a name="1.1.0"></a>

# [1.1.0](https://github.com/peerigon/clockodo/compare/v1.0.0...v1.1.0) (2018-04-25)

### Features

- Adds startClock, stopClock, and changeClockDuration ([5db9894](https://github.com/peerigon/clockodo/commit/5db9894))

<a name="1.0.0"></a>

# 1.0.0 (2018-04-18)

### Features

- Add node 6 compatibility ([#5](https://github.com/peerigon/clockodo/issues/5)) ([fe01101](https://github.com/peerigon/clockodo/commit/fe01101))
