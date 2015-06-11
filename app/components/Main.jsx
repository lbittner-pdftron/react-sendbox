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


var ReactModal = require('react-modal');
var appElement = document.getElementById('react-modal');
var ModalHeader = require('./modal/ModalHeader')
var ModalBody   = require('./modal/ModalBody')
var ModalFooter = require('./modal/ModalFooter')
var Form = require('./new_form');

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
            visibility: 'visible',
        }
        var temp = this.state.selectedOption
        var _json = json.filter(function(o){
            return (o.entityTypes.name === temp);
        })[0];

        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <ReactModal style={modal_style} className={'reveal-modal small open'}
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}>
                    <form>
                        <ModalHeader options={json} title={'Entity Create'} onSelect={this.handleSelect}> </ModalHeader>


                        <div className={'modal-content'}>
                            <Form selectedOption={this.state.selectedOption} options={_json}/>
                        </div>

                        <ModalFooter onBtnPress={this.handlerButtons} onClick={this.closeModal} />
                    </form>
                    <a className={"close-reveal-modal"} onClick={this.closeModal} aria-label="Close">×</a>
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

