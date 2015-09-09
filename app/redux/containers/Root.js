import PanelOne 						from './PanelOne';
import PanelTwo 						from './PanelTwo';
import Library 							from './Library';
import GroupsPanel 							from './GroupsPanel';
import configureStore 					from '../store/configureStore';
import { SHOW_MENU } 					from '../constants/ActionTypes';

import React, { Component } 			from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } 					from 'react-redux';

const store = configureStore();

window.store = store;


class ModalWrap extends Component {
	render() {
		return (
			<div>
				<Provider store={store}>
		        	{() => <GroupsPanel/> }
		      	</Provider>
			</div>)
	}
}


export default class Root extends Component {
	componentWillMount() {
		React.render(<ModalWrap />, document.getElementById('main2'));
	}

  	render() {
	    return (
			<div>
		      	<Provider store={store}>
		        	{() => <Library projectId={1}/> }
		      	</Provider>
		    </div>
	    );
  	}




  	documentClick(event) {
		if ( !event.defaultPrevented ) {
			// console.log('documentClick', event)
			store.dispatch({type: SHOW_MENU, id:-1})
		}
		return false;
	}
	componentDidMount() {
		document.addEventListener('click', this.documentClick);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.documentClick);
	}
}

