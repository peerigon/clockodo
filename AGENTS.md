# AGENTS.md

This file provides guidance to AI coding assistants when working with code in this repository.

**Important**: You **must** follow [these rules](./node_modules/@peerigon/configs/ai/rules.mdc) and its language-specific rules referenced in that file.

## Development Commands

This project uses npm scripts for all development tasks:

- **Test all**: `npm test` - Runs all tests in parallel (format, lint, types, unit)
- **Unit tests**: `npm run test:unit` - Run Vitest tests once
- **Watch tests**: `npm run vitest` - Run Vitest in watch mode
- **Lint**: `npm run test:lint` - ESLint with zero warnings allowed
- **Type check**: `npm run test:types` - TypeScript compiler check
- **Format check**: `npm run test:format` - Prettier format validation

**Important**: Use the typescript-lsp MCP to get diagnostics and type information
**Important**: Use the vitest-server MCP to run individual tests.
**Important**: Use the eslint MCP to check for linting errors.

## Project Structure

- **Source**: `src/` - All source code and tests
- **Tests**: Co-located with source files using `.test.ts` suffix
- **Configuration**: Uses `@peerigon/configs` for shared TypeScript, ESLint, and Prettier configs

## Code Organization

- Functions are implemented in individual files in `src/`
- Each function has comprehensive unit tests using Vitest
- Uses ES module syntax throughout (`.ts` extensions in imports)
