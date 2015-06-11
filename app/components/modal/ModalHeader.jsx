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
    componentDidUpdate: function() {
        window.mHead = React.findDOMNode(this.refs.xHeader)
        console.log('--- [head] h: ' + mHead.clientHeight)
    },
	render: function() {
		var modal_head = {
            //padding: '0.6rem 1rem 0'
        }
		var options = this.props.options.map(function(option, i){
			var value = option.entityTypes.name;
			return (<option value={value} key={'id_'+value}>
					{option.entityTypes.label}</option>)
		})

		return (<div ref={'xHeader'} className="modal-head" style={modal_head}>
                    <h2 data-hook="title" className="all-up-case">{this.props.title}</h2>
                    <div className="row">
                        <div className="small-4 columns">
                            <label data-hook="label" for="right-label" className="right inline">Type:</label>
                        </div>
                        <div className="small-8 columns">
                            <select className="mavis-dropdown" id="lang" value={this.state.value} onChange={this.change}>
								{options}
							</select>
                            <span data-hook="message-container" className="message message-below message-error" >
                                <p data-hook="message-text" ></p>
                            </span>
                        </div>
                    </div>
                </div>)
	}
})
module.exports = ModalHeader;

// <div class="modal-head" >
//          <h2 data-hook="title" class="all-up-case" >Create </h2>
//          <div class="row" >
//             <div class="small-4 columns" >
//                 <label data-hook="label" for="right-label" class="right inline" >Type:</label>
//             </div>
//             <div class="small-8 columns" >
//                <select class="mavis-dropdown" name="project_types" >
//                   <option value="movie_projects" >Movie Projects</option>
//                   <option value="tv_commercial_project" >TV Commercial</option>
//                </select>
//                <span data-hook="message-container" class="message message-below message-error" >
//                   <p data-hook="message-text" ></p>
//                </span>
//             </div>
//          </div>
//       </div>