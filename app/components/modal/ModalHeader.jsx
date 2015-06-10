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
		var modal_head = {
            padding: '0.6rem 1rem 0'
        }
		var options = this.props.options.map(function(option, i){
			var value = option.entityTypes.name;
			return (<option value={value} key={'id_'+value}>
					{option.entityTypes.label}</option>)
		})

		return (
				<div className="modal-head" style={modal_head}>
                    <h2 className="all-up-case">{this.props.title}</h2>
                    <div className="row">
                        <div className="small-4 columns">
                            <label for="right-label" className="right inline">Type:</label>
                        </div>
                        <div className="small-8 columns">
                            <select className="mavis-dropdown" id="lang" value={this.state.value}
                            		onChange={this.change}>
								{options}
							</select>
                        </div>
                    </div>
                </div>)
	}
})
module.exports = ModalHeader;