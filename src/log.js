const bunyan = require('bunyan');

const log = bunyan.createLogger({ name: 'super-enigma' });

module.exports = log;
