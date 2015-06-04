/* jshint ignore:start */

/** @jsx React.DOM */
'use strict';
// https://github.com/prometheusresearch/react-forms/blob/master/lib/Label.js

var React = require('react/addons');

var ModalFooter = React.createClass({
	handleSubmit: function() {
		this.props.onBtnPress('SUBMIT')
	},
	handleCancel: function() {
		this.props.onBtnPress('CANCELL')
	},
	render: function () {
		return (<div>
					<button onClick={this.handleSubmit}>Submit</button>
					<button onClick={this.handleCancel}>Cancel</button>
				</div>)
	}
})
module.exports = ModalFooter;