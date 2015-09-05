import PanelOne 		from './PanelOne';
import PanelTwo 		from './PanelTwo';
import Library 			from './Library';
import configureStore 	from '../store/configureStore';



import React, { Component } 			from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } 					from 'react-redux';

const store = configureStore();


window.store = store;
export default class Root extends Component {
  render() {
    return (
		<div>
	      <Provider store={store}>
	        {() => <Library projectId={1}/> }
	      </Provider>
	    </div>
    );
  }
}

