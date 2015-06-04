/* jshint ignore:start */

/** @jsx React.DOM */
'use strict';
// https://github.com/prometheusresearch/react-forms/blob/master/lib/Label.js

var React = require('react/addons');

var ModalBody = React.createClass({
	render: function () {
		return (<div>{this.props.formState}</div>)
	}
})
module.exports = ModalBody;