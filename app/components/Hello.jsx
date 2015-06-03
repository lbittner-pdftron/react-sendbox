/** @jsx React.DOM */
'use strict'
var React = require('react')
var InputField = require('./lib/fields/input')
var json = require("../dummy/entity.json");


console.log(json)
var field = json[0].fields[0];

var FromField = React.createClass({
	render: function() {
		var name = this.props.field.name;
		var classes = ['testClass'];
		return (<div>
					<label htmlFor={'id_'+name}>{this.props.field.label}</label>
					<InputField field={this.props.field} className={classes} />
				</div>)
	}
})
// <div>
// <label for="id_subject">Subject:</label> 
// <input maxlength="100" type="text" name="subject" id="id_subject">
// </div>


module.exports = React.createClass({
    displayName: 'HelloReact',
    getInitialState: function(){
    	return {change:false};
    },
    swap: function() {
    	this.setState({change:true})
    },
    render: function(){
    	
        			
        return <div><p>{'this.state.change ' + this.state.change}</p>
        			
        			<FromField field={field}/>  
        			<button onClick={this.swap}>Submit</button>     			
        		</div>
    }
})