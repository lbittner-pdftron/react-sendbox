/* jshint ignore:start */

/** @jsx React.DOM */
'use strict';
// https://github.com/prometheusresearch/react-forms/blob/master/lib/Label.js

var React = require('react/addons');
var DebugElement = require('../utils/DebugElement');
var Form = require('../form');

var ModalBody = React.createClass({
	getInitialState: function() {
		return {
			fields: {}
		}
	},
	getCurrentFields: function(o) {
		return (o.entityTypes.name === this.props.selectedOption)
	},
	render: function () {
		var modal_body = {
            borderBottom: 'none',
            minHeight: 0,
            marginBottom: 81
        }
		var options = this.props.options;
		var selectedFields = options.filter(this.getCurrentFields)[0];
		var form = (selectedFields)
					? <Form fields={ selectedFields.fields }> </Form>
					: null ;

		return (<div className={'modal-content'} style={modal_body}>
					{form}
					{/*<DebugElement messages={selectedFields} label={'fields'}/>*/}
				</div>)
	}
})
module.exports = ModalBody;