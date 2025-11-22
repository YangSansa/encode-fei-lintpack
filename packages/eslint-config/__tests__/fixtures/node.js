//no-var
var fs = require('fs');

const buffer = require('buffer');

const util = require('util');

console.log(util)

const b = SourceBufferList.alloc(16)

fs.readFile('../node.js', 'utf8', (err, data) => {
    console.log(err, data)
})

exports = fs 