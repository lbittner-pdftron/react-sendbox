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


const API_ROOT = 'http://localhost:3000/api/';

function getNextPageUrl(response) {
	// debugger;
	const link = response.headers.get('link');
	if (!link) {
		return null;
	}

	const nextLink = link;
	if (!nextLink) {
		return null;
	}

	return nextLink;
}
function callApi(endpoint, queryString) {
	if (endpoint.indexOf(API_ROOT) === -1 && queryString) {
		endpoint = API_ROOT + endpoint + '?' + queryString
	}

	// if(queryString) {
	// 	endpoint = API_ROOT + endpoint + '?' + queryString
	// 	// endpoint = endpoint + '?' + queryString
	// }
	return fetch(endpoint , {headers: {'Authorization': 'sardor'}})
				.then(response => response.json()
					.then(json => ({ json, response})))
				.then(({ json, response }) => {
					if (!response.ok) {
						return Promise.reject(json);
					}
					const nextPageUrl = getNextPageUrl(response) || undefined;

					// return json;
					return Object.assign({}, { data: json }, { nextPageUrl } );
				});
}



const logger = store => next => action => {
	// debugger
	const callAPI = action['CALL_API'];
 	if (typeof callAPI === 'undefined') {

 		return next(action);
 	}
 	let { endpoint } = callAPI;
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

 	// debugger

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
