/*!
 * Copyright(c) Basavaraj K N <rajiff@gmail.com>
 */

const path = require('path');
const extend = require('util')._extend;

const development = require('./env/development');

const defaults = {
    root: path.join(__dirname, '..')
};

module.exports = {
    development: extend(development, defaults)
}[process.env.NODE_ENV || 'development'];