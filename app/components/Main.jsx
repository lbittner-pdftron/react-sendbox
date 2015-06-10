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
        var modal_style = {
            display: 'block',
            opacity: 1,
            visibility: 'visible',
            top: 100
        }
        var modal_head = {
            padding: '0.6rem 1rem 0'
        }
        var modal_body = {
            borderBottom: 'none',
            minHeight: 'none'
        }
        var footer_style = {
            position: 'absolute',
            bottom: 0,
            borderTop: '1px #DDDDDD solid',
            width: '100%',
        }

        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <ReactModal style={modal_style} className={'reveal-modal small open'}
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}>
                    <a className={"close-reveal-modal"} aria-label="Close">×</a>

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
  // <div>
  //               <button onClick={this.openModal}>Open Modal</button>
  //               <ReactModal style={modal_style} className={'reveal-modal small open'}
  //                 isOpen={this.state.modalIsOpen}
  //                 onRequestClose={this.closeModal}>
  //                   <a className={"close-reveal-modal"} aria-label="Close">×</a>

  //                   <div className="modal-head" style={modal_head}>
  //                       <h2 className="all-up-case">Create New Project</h2>
  //                       <div className="row">
  //                           <div className="small-4 columns">
  //                               <label for="right-label" className="right inline">Type:</label>
  //                           </div>
  //                           <div className="small-8 columns">
  //                               <select className="mavis-dropdown">
  //                                   <option value="Movie">Movie</option>
  //                                   <option value="Commerical">Commerical</option>
  //                                   <option value="Music Video">Music Video</option>
  //                               </select>
  //                           </div>
  //                       </div>
  //                   </div>
  //                   <div className={'modal-content'} style={modal_body}>

  //                       <ModalBody {...this.state}
  //                           options={json} />

  //                   </div>

  //                   <div className="modal-footer" style={footer_style}>
  //                       <div className="row">
  //                           <a href="#" className="button mavis-button radius">Create</a>
  //                           <a href="#" className="button mavis-button radius">Cancel</a>
  //                       </div>
  //                   </div>

  //               </ReactModal>
  //           </div>

