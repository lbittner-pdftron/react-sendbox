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
		SHOW_MENU}
						from '../constants/ActionTypes';

import union from 'lodash/array/union';
import merge from 'lodash/object/merge';
import indexBy from 'lodash/collection/indexBy';
import { combineReducers } from 'redux';

window.indexBy = indexBy



export function groups(state = { entities:[], expended: {}, subAssets:{} }, action) {
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
					expended: state.expended
				});
			}
			return state;
		default:
			return state;
	}
}

export function assets(state = { entities:[], expended: {}, subAssets:{} }, action) {
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
					expended: state.expended
				});
			}
			return state;
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

			console.log(state)
			return state;
		default:
			return state;
	}
}



