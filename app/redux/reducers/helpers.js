import { combineReducers } from 'redux';

export function searches(state = {}, action) {

	switch (action.type) {
		case 'SEARCH_TERM':
			// console.log('searches',action)
			return state;
		default:
			return state;
	}
}
