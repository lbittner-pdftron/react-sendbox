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
		var footer_style = {
            position: 'absolute',
            bottom: 0,
            borderTop: '1px #DDDDDD solid',
            width: '100%',
        }
		return (
			<div className="modal-footer" style={footer_style}>
                <div className="row">
                    <a href="#" className="button mavis-button radius" onClick={this.handleSubmit}>Create</a>
                    <a href="#" className="button mavis-button radius" onClick={this.handleCancel}>Cancel</a>
                </div>
            </div>)
	}
})
module.exports = ModalFooter;