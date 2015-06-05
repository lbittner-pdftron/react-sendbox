/* jshint ignore:start */
// jscs:disable
/** @jsx React.DOM */
var React = require('react');
var InputField = require('./lib/fields/input');
var json = require("../dummy/entity.json");
var DebugElement = require('./utils/DebugElement');

var Modal       = require('./modal/Modal')
var Test        = require('./test')

console.log(json);
var field = json[0].fields[0];



var FieldWrapper = React.createClass({
    getInitialState: function() {
        return {value: this.props.value, }
    },
	render: function() {
		var name = this.props.field.name;
		var classes = ['testClass'];
		return (<div>
					<label htmlFor={'id_'+name}>
                        {this.props.field.label}
                    </label>
					<InputField field={this.props.field}
                        update={this.props.update}
                        className={classes} />
                        <p>{this.props.sardor}</p>
				</div>)
	}
})

var FormBody = React.createClass({
    getInitialState: function() {
        return {values:{},  };
    },
    getValues: function() {
        return this.state.values;
    },
    clear: function(){
        console.log('FormBody:clear')
        this.setState({ values:{} }, function(x){
            return this.state.values
        });
    },
    setValues: function(path,text, parsed) {
        var values = this.state.values;
        if(text === '') {
            delete values[path];
        } else {
            values[path] = parsed;
        }
        this.setState({ values:values, });
        //console.log(this.state.values);
    },
    render: function() {
        var formFields = this.props.fields.map(function(field){
            console.log();
            var value = this.state.values[ field.name ]
            return (
                <FieldWrapper field={field} value={value}
                              key={field.name} update={this.setValues} />
            );
        }, this);

        return (<form>{formFields}</form>);
    }
})

var ReactModal = require('react-modal');
var appElement = document.getElementById('react-modal');
var ModalHeader = require('./modal/ModalHeader')
var ModalBody   = require('./modal/ModalBody')
var ModalFooter = require('./modal/ModalFooter')

ReactModal.setAppElement(appElement);
ReactModal.injectCSS();

module.exports = React.createClass({

    getInitialState: function() {
        return {
            modalIsOpen: false,
            formState: null,
            selectedOption: null
        };
    },

    openModal: function() {
        this.setState({
            modalIsOpen: true,
            formState: this.state.formState,
            selectedOption: this.state.selectedOption
        });
    },

    closeModal: function() {
        this.setState({
            modalIsOpen: false,
            formState: this.state.formState,
            selectedOption: this.state.selectedOption
        });
    },

    handlerButtons: function(btnValue) {
        this.setState({
            modalIsOpen: this.state.modalIsOpen,
            formState: btnValue,
            selectedOption: this.state.selectedOption
        })
    },
    handleSelect: function(value) {
        this.setState({
            modalIsOpen: this.state.modalIsOpen,
            formState: this.state.formState,
            selectedOption: value
        })
    },

    render: function() {
        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <ReactModal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}>

                    <button onClick={this.closeModal}>x</button>
                    <ModalHeader title={'Entity Create'}
                        onSelect={this.handleSelect}
                        options={json} />
                    <ModalBody {...this.state}
                        options={json} />
                    <ModalFooter onBtnPress={this.handlerButtons} />

                </ReactModal>
            </div>
        );
  }
});

