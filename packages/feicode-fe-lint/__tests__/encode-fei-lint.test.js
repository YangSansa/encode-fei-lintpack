'use strict';

const encodeFeiLint = require('..');
const assert = require('assert').strict;

assert.strictEqual(encodeFeiLint(), 'Hello from encodeFeiLint');
console.info('encodeFeiLint tests passed');
