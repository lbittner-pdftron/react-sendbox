'use strict';

var normalizer = require('./normalizer');


exports.String = function(text) {
  return normalizer.String(text);
};

exports.integer = function(text) {
  return text ? parseInt(normalizer.integer(text)) : null;
};

exports.number = function(text) {
  return text ? parseFloat(normalizer.number(text)) : null;
};
