/* jshint ignore:start */
/** @jsx React.DOM */
'use strict';
// https://github.com/prometheusresearch/react-forms/blob/master/lib/Label.js

var React = require('react/addons');

var ModalHeader = React.createClass({
 	getInitialState: function() {
		return {
           	value: this.props.options[0].entityTypes.name
       	}
 	},
 	change: function(event){
        this.setState({value: event.target.value}, function(){
        	this.props.onSelect(this.state.value);
        });
    },
    componentDidMount: function() {
    	this.props.onSelect(this.state.value)
    },
	render: function() {

		var options = this.props.options.map(function(option, i){
			var value = option.entityTypes.name;
			return (<option value={value} key={'id_'+value}>
					{option.entityTypes.label}</option>)
		})

		return (<div>
					<p>{this.props.title}</p>
					<select id="lang" value={this.state.value} onChange={this.change}>
						{options}
					</select>
				</div>)
	}
})
module.exports = ModalHeader;