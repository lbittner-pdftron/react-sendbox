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
	componentDidUpdate: function() {
        window.$mFoot = this;
        window.mFoot = React.findDOMNode(this.refs.xFoot)
        console.log('--- [foot] h: ' + mFoot.clientHeight)
    },
	render: function () {
		var footer_style = {
        }
		return (
			<div ref={'xFoot'} className="modal-footer" style={footer_style}>
                <div className="row">
                    <a href="#" className="button mavis-button radius" onClick={this.handleSubmit}>Create</a>
                    <a href="#" className="button mavis-button radius" onClick={this.props.onClick}>Cancel</a>
                </div>
            </div>)
	}
})
module.exports = ModalFooter;