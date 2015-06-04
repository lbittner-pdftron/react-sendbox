
/* jshint ignore:start */

/** @jsx React.DOM */
'use strict';
// https://github.com/prometheusresearch/react-forms/blob/master/lib/Label.js

var React = require('react/addons');

var ModalHeader = React.createClass({
	render: function () {
		return (<div>
					<p>{this.props.title}</p>
				</div>)
	}
})
module.exports = ModalHeader;