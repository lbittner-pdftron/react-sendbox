var React = require('react/addons');
var parser = require('../utils/parser');
var normalizer = require('../utils/normalizer');
var classNames = require('classnames')

var Form = React.createClass({
	filterFunc: function(o) {
		return (o.entityTypes.name === this.props.selectedOption);
	},
	render: function () {
		console.log('[Form] selected: ' + this.props.selectedOption + '     ', this.props.options);
		console.log(' ');
		if(!this.props.selectedOption) return null;
		var option = this.props.options;

		return (
			<div className="row" >
				{
					option.fields.map(function(field) {
						return (<Form.Row key={field.name}>
					               	<Form.Label {...field}/>
					               	<Form.Input {...field}/>
					            </Form.Row>);
					})
				}
	      	</div>);
	}
});

Form.Row = React.createClass({
	render: function() {
		var classes = classNames('row', {
			'has-error': true
		});
		return (<div className={classes}>{this.props.children}</div>);
	}
});

Form.Label = React.createClass({
	render: function() {
		return (<div className={'small-4 columns'} >
					<label htmlFor={this.props.name} className={'right inline'}>{this.props.label}</label>
				</div>);
	}
});

Form.Input = React.createClass({
	render: function() {
		return (<div className={'small-8 columns'} >
            		<input name={this.props.name} type="text" />
               	</div>);
	}
});
module.exports = Form;