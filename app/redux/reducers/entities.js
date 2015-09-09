import { MARK_ONE, MARK_ALL, SHOW_CHILDREN, ENTITY_SUCCESS } from '../constants/ActionTypes';

import {ENTITY_ASSETS_REQUEST,
		ENTITY_ASSETS_SUCCESS,
		ENTITY_ASSETS_FAILURE,

		ENTITY_SUBTASK_REQUEST,
		ENTITY_SUBTASK_SUCCESS,
		ENTITY_SUBTASK_FAILURE,

		ENTITY_GROUPS_REQUEST,
		ENTITY_GROUPS_SUCCESS,
		ENTITY_GROUPS_FAILURE,
		TASK_ASSETS,
		TASK_GROUPS,
		TASK_PROJECTS,
		CHECK_ONE,CHECK_ALL,
		CHECK_ONE_TASK,
		CHECK_ALL_TASK,
		SHOW_MENU} from '../constants/ActionTypes';

import union from 'lodash/array/union';
import merge from 'lodash/object/merge';
import { combineReducers } from 'redux';




export function groups(state = { entities:[], expanded: {}, subAssets:{} }, action) {
	var stub1 = state
	switch (action.type) {
		case ENTITY_GROUPS_SUCCESS:
			if(action.response && action.response.data) {
				var nSubAssets = Object.assign({}, state.subAssets);
				var nEntities =  union(state.entities, action.response.data);
				var nextPageUrl = action.response.nextPageUrl;
				return  Object.assign({}, state, {
					entities: nEntities,
					subAssets: nSubAssets,
					nextPageUrl,
					expanded: state.expanded
				});
			}
			return state;
		default:
			return state;
	}
}

export function assets(state = { entities:[], expanded: {}, subAssets:{} }, action) {
	var stub2 = state
	switch (action.type) {
		case ENTITY_ASSETS_SUCCESS:
			if(action.response && action.response.data) {
				var nSubAssets = Object.assign({}, state.subAssets);
				var nEntities =  union(state.entities, action.response.data);
				var nextPageUrl = action.response.nextPageUrl;
				return  Object.assign({}, state, {
					entities: nEntities,
					subAssets: nSubAssets,
					nextPageUrl,
					expanded: state.expanded
				});
			}
			return state;
		case CHECK_ONE:
		case CHECK_ALL:
			return Object.assign({}, state, {
					entities: checkboxes(state.entities, action),
					subAssets: state.subAssets,
					nextPageUrl: state.nextPageUrl,
					expanded: state.expanded
				});;
		default:
			return state;
	}
}

function checkboxes(state = [], action) {
	switch (action.type) {
		case CHECK_ONE:
		case CHECK_ONE_TASK:
			return state.map(entity =>
				entity.id === action.id ? Object.assign({}, entity, { $checked: !entity.$checked }) : entity
			);
		case CHECK_ALL:
		case CHECK_ALL_TASK:
			const areAllMarked = state.every(entity => entity.$checked);
		    return state.map(entity => Object.assign({}, entity, {
		      	$checked: !areAllMarked
		    }));
		default:
			return state;
	}
}

function tasks(state = {isFetching:false, didInvalidate:false, items:[]}, action) {
	switch (action.type) {
		case ENTITY_SUBTASK_FAILURE:
			return Object.assign({}, state, {
				didInvalidate: true
			});
		case ENTITY_SUBTASK_REQUEST:
			return Object.assign({}, state, {
				isFetching: true,
				didInvalidate: false
			});
		case ENTITY_SUBTASK_SUCCESS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: action.response.data,
				// lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}
export function subAssets(state = {}, action) {
	switch (action.type) {
		case ENTITY_SUBTASK_REQUEST:
		case ENTITY_SUBTASK_SUCCESS:
			// debugger;
			return Object.assign({}, state, {[action.entityId]: tasks(state[action.entityId], action)});
		case CHECK_ONE_TASK:
		case CHECK_ALL_TASK:
			var it = state[action.entityId]; // {}
			it.items = checkboxes(it.items, action)
			return Object.assign({},
				state,
				it
			);
		default:
			return state;
	}
}

export function pagination(state = {
		[TASK_ASSETS] : { nextPageUrl : undefined },
		[TASK_GROUPS] : { nextPageUrl : undefined } }, action) {
	switch (action.type) {
		case ENTITY_ASSETS_SUCCESS:
			if(action.response && action.response.nextPageUrl) {
				var assets = { nextPageUrl: action.response.nextPageUrl };
				return merge({}, state, {
			        assets: assets,
			        groups: state.groups
			      });
			}
			return state
		case ENTITY_GROUPS_SUCCESS:
			if(action.response && action.response.nextPageUrl) {
				var groups = { nextPageUrl: action.response.nextPageUrl }
				return merge({}, state, {
					assets: state.assets,
			        groups: groups
			      });
			}
			return state
		default:
			return state;
	}
}


export function menu(state = -1, action) {
	var stub3 = state
	switch (action.type) {
		case SHOW_MENU:
			if(state === action.id) {
				state = -1;
			}
			else {
				state = action.id
			}
			return state;
		default:
			return state;
	}
}

export function searches(state = {}, action) {

	switch (action.type) {
		case 'SEARCH_TERM':
			console.log('searches',action)
			return state;
		default:
			return state;
	}
}




