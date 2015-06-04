/* jshint ignore:start */

/** @jsx React.DOM */
'use strict';
// https://github.com/prometheusresearch/react-forms/blob/master/lib/Label.js

var React = require('react/addons');
var ModalHeader = require('./ModalHeader')
var ModalBody   = require('./ModalBody')
var ModalFooter = require('./ModalFooter')

var Modal = React.createClass({
	getInitialState: function() {
		return {
			formState: null
		}
	},
	handlerButtons: function(btnValue) {
		this.setState({
			formState: btnValue
		})
	},
	render: function () {
		return (<div>
					<ModalHeader title={'Entity Create'} />
					<ModalBody formState={this.state.formState} />
					<ModalFooter onBtnPress={this.handlerButtons} />
				</div>)
	}
})
module.exports = Modal;