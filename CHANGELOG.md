# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.1] - 2021-11-27

### Changed

- use ref in mongoose.Schema
- use virtual fields form mongoose
- sorting on db side

## [1.1.0] - 2021-11-12

### Added

- GET /credentials

### Deprecated

- GET /user - use /credentials instead

### Security

- GET /user & /credentials do NOT return hashed password

## [1.0.0] - 2021-11-12

### Added

- Basic REST API in compliance for given specification
- Swagger api-docs
- fancy homepage
- docker compose with app itself & mongodb
