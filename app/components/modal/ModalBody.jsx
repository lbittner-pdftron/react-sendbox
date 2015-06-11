/* jshint ignore:start */

/** @jsx React.DOM */
'use strict';
// https://github.com/prometheusresearch/react-forms/blob/master/lib/Label.js

var React = require('react/addons');
var DebugElement = require('../utils/DebugElement');
// var Form = require('../form');
var Form = require('../new_form');

var ModalBody = React.createClass({
	getInitialState: function() {
		return {
			fields: {},
		}
	},
	getCurrentFields: function(o) {
		return (o.entityTypes.name === this.props.selectedOption)
	},
	componentDidMount: function() {
        //console.log('componentDidUpdate')
        window.$mBody = this;
        window.mBody = React.findDOMNode(this.refs.xModal)
        // console.log('--- [body] h: ' + mBody.clientHeight)
    },
	render: function () {
		console.log('[ModalBody] render')
		var options = this.props.options;
		var selectedFields = options.filter(this.getCurrentFields)[0];
		debugger;
		return (<div ref={'xModal'}   className={'modal-content'}>
					<p className="stat">{this.state.height}</p>
					{this.props.children}
				</div>)
	}
})
module.exports = ModalBody;