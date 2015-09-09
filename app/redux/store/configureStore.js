import { createStore, applyMiddleware, combineReducers }
										from 'redux';
import thunkMiddleware 					from 'redux-thunk';
import { Schema, arrayOf, normalize } 	from 'normalizr';
import 'isomorphic-fetch';
import qs 								from 'qs'
import * as reducers 					from '../reducers/entities';


window.Schema = Schema;
window.arrayOf = arrayOf;
window.normalize = normalize;



const API_ROOT = 'http://localhost:3000/api/';

function getNextPageUrl(response) {
	const link = response.headers.get('link');

	if (!link) {
		return null;
	}

	return link;
}
function callApi(endpoint, queryString) {
	if (endpoint.indexOf(API_ROOT) === -1 && queryString) {
		endpoint = API_ROOT + endpoint + '?' + queryString
	}
	else if (endpoint.indexOf(API_ROOT) === -1 && !queryString) {
		endpoint = API_ROOT + endpoint
	}

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



const api = store => next => action => {
	const callAPI = action['CALL_API'];
 	if (typeof callAPI === 'undefined') {

 		return next(action);
 	}
 	let { endpoint } = callAPI;
 	const { types, category, filter } = callAPI;
 	var queryString = ' '

 	if(typeof filter !== 'string') {
 		queryString = qs.stringify(filter)
 	}

 	const [requestType, successType, failureType] = types;
 	function actionWith(data) {
 		const finalAction = Object.assign({}, action, data);
 		delete finalAction['CALL_API'];
 		console.log('finalAction',action,finalAction)
 		return finalAction;
 	}

 	next(actionWith({ type: requestType }));

	return callApi(endpoint, queryString ).then(
 		response => next(actionWith({ response, type: successType, meta: { delay: 500 } })),
 		error => next(actionWith({  type: failureType, error: error.message || 'Something bad happened' }))
 		);
};
/**
 * Schedules actions with { meta: { delay: N } } to be delayed by N milliseconds.
 * Makes `dispatch` return a function to cancel the interval in this case.
 */
const timeoutScheduler = store => next => action => {

  if (!action.meta || !action.meta.delay) {
    return next(action);
  }
  if(action.type !== "ENTITY_SUBTASK_SUCCESS") {
  	return next(action);
  }

  let intervalId = setTimeout(
    () => next(action),
    action.meta.delay
  );

  return function cancel() {
    clearInterval(intervalId);
  };
};

const reducer = combineReducers(reducers);
const createStoreWithMiddleware = applyMiddleware(

	thunkMiddleware,
	api,
	timeoutScheduler
)(createStore);

/**
 * Creates a preconfigured store for this example.
 */
export default function configureStore(initialState) {
	return createStoreWithMiddleware(reducer, initialState);
}
