/* jshint ignore:start */

/** @jsx React.DOM */
'use strict';
// https://github.com/prometheusresearch/react-forms/blob/master/lib/Label.js

var React = require('react/addons');
var ModalHeader = require('./ModalHeader')
var ModalBody   = require('./ModalBody')
var ModalFooter = require('./ModalFooter')
var json = require('../../dummy/entity.json');


var Modal = React.createClass({
	getInitialState: function() {
		return {
			formState: null,
			selectedOption: null
		}
	},
	handlerButtons: function(btnValue) {
		this.setState({
			formState: btnValue,
			selectedOption: this.state.selectedOption
		})
	},
	handleSelect: function(value) {
		this.setState({
			formState: this.state.formState,
			selectedOption: value
		})
	},
	render: function () {
		var props = { bar: false };
		return (<div>
					<ModalHeader title={'Entity Create'} 
						onSelect={this.handleSelect}
						options={json} />
					<ModalBody {...this.state} 
						options={json} />
					<ModalFooter onBtnPress={this.handlerButtons} />
				</div>)
	}
})
module.exports = Modal;