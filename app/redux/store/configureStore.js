import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware 		from 'redux-thunk';
import { Schema, arrayOf, normalize } 	from 'normalizr';
import 'isomorphic-fetch';
import Qs from 'Qs'
import * as reducers 					from '../reducers/entities';


window.Schema = Schema;
window.arrayOf = arrayOf;
window.normalize = normalize;
// const logger = store => next => action => {
// 	console.group(action.type);
// 	console.info('dispatching', action);
// 	let result = next(action);
// 	console.log('next state', store.getState());
// 	console.groupEnd(action.type);
// 	return result;
// };

function callApi(endpoint, queryString) {
	if(queryString) {
		endpoint += '?' + queryString
	}
	return fetch(endpoint , {headers: {'Authorization': 'sardor'}})
				.then(response => response.json()
					.then(json => ({ json, response})))
				.then(({ json, response }) => {
					if (!response.ok) {
						return Promise.reject(json);
					}
					return json;
				});
}

const logger = store => next => action => {
	debugger
	const callAPI = action['CALL_API'];
 	if (typeof callAPI === 'undefined') {

 		return next(action);
 	}
 	const { types, category, filter } = callAPI;
 	var queryString = ' '

 	if(typeof filter !== 'string') {
 		queryString = Qs.stringify(filter)
 	}

 	const [requestType, successType, failureType] = types;
 	function actionWith(data) {
 		const finalAction = Object.assign({}, action, data);
 		delete finalAction['CALL_API'];
 		return finalAction;
 	}

 	next(actionWith({ type: requestType }));

 	debugger
 	var endpoint = 'http://localhost:3000/api/Entities';
	return callApi(endpoint, queryString ).then(
 		response => next(actionWith({ response, type: successType })),
 		error => next(actionWith({  type: failureType, error: error.message || 'Something bad happened' }))
 		);
};


const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(
	thunkMiddleware,
	logger
)(createStore);

/**
 * Creates a preconfigured store for this example.
 */
export default function configureStore(initialState) {
	return createStoreWithMiddleware(reducer, initialState);
}
