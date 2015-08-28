import { MARK_ONE, MARK_ALL, SHOW_CHILDREN, ENTITY_SUCCESS } from '../constants/ActionTypes';

import {ENTITY_ASSETS_REQUEST,
		ENTITY_ASSETS_SUCCESS,
		ENTITY_ASSETS_FAILURE,

		ENTITY_GROUPS_REQUEST,
		ENTITY_GROUPS_SUCCESS,
		ENTITY_GROUPS_FAILURE,
		TASK_ASSETS,
		TASK_GROUPS,
		TASK_PROJECTS}
						from '../constants/ActionTypes';

import union from 'lodash/array/union';
import merge from 'lodash/object/merge';
import indexBy from 'lodash/collection/indexBy';
import { combineReducers } from 'redux';

window.indexBy = indexBy
const ASSETS = 'assets'
const GROUPS = 'groups'

const initialStateGROUP = [
	{
		root: "/mnt/x3",
		project: "fantastic",
		category: "groups",
		path: "/mnt/x3/vitality/fantastic/shots/is_010",
		name: "is_010",
		description: "Shot long description",
		fields: {
			name: "is_010",
			comp_status: "NA",
			production_status: "NA",
			priority: "HIGH",
			source_length: 191,
			cut_length: 143,
			in_frame: 25,
			out_frame: 167
		},
		status: "unassigned",
		priority: 10,
		createdBy: "chris",
		createdAt: "2015-08-21T19:21:52.397Z",
		id: 3,
		type: "shots",
		libraryIds: [ ]
	},
	{
		root: "/mnt/x3",
		project: "fantastic",
		category: "groups",
		path: "/mnt/x3/vitality/fantastic/shots/shot_001",
		name: "shot_001",
		description: "Shot long description",
		fields: {
			name: "shot_001",
			comp_status: "NA",
			production_status: "NA",
			priority: "HIGH",
			source_length: 191,
			cut_length: 143,
			in_frame: 25,
			out_frame: 167
		},
		status: "unassigned",
		priority: 10,
		createdBy: "chris",
		createdAt: "2015-08-21T19:21:52.398Z",
		id: 4,
		type: "shots",
		libraryIds: [ ]
	}
];


const initialStateASSET = [
	{
		root: "/mnt/x3",
		project: "fantastic",
		category: "assets",
		path: "/mnt/x3/vitality/fantastic/shots/is_010",
		name: "First",
		description: "Shot long description",
		fields: {
			name: "is_010",
			comp_status: "NA",
			production_status: "NA",
			priority: "HIGH",
			source_length: 191,
			cut_length: 143,
			in_frame: 25,
			out_frame: 167
		},
		status: "unassigned",
		priority: 10,
		createdBy: "chris",
		createdAt: "2015-08-21T19:21:52.397Z",
		id: 7,
		type: "shots",
		libraryIds: [ ]
	},
	{
		root: "/mnt/x3",
		project: "fantastic",
		category: "assets",
		path: "/mnt/x3/vitality/fantastic/shots/shot_001",
		name: "Second",
		description: "Shot long description",
		fields: {
			name: "shot_001",
			comp_status: "NA",
			production_status: "NA",
			priority: "HIGH",
			source_length: 191,
			cut_length: 143,
			in_frame: 25,
			out_frame: 167
		},
		status: "unassigned",
		priority: 10,
		createdBy: "chris",
		createdAt: "2015-08-21T19:21:52.398Z",
		id: 8,
		type: "shots",
		libraryIds: [ ]
	},
];

export function groups(state = { entities:[], subAssets:{} }, action) {
	var stub1 = state
	switch (action.type) {
		case ENTITY_GROUPS_SUCCESS:
			debugger
			if(action.response && action.response.data) {
				var nSubAssets = Object.assign({}, state.subAssets);
				var nEntities =  union(state.entities, action.response.data);
				var nextPageUrl = action.response.nextPageUrl;
				return {
					entities: nEntities,
					subAssets: nSubAssets,
					nextPageUrl
				}
			}
			return state
		default:
			return state;
	}
}

export function assets(state = { entities:[], subAssets:{} }, action) {
	var stub2 = state
	switch (action.type) {
		case ENTITY_ASSETS_SUCCESS:
			debugger
			if(action.response && action.response.data) {
				var nSubAssets = Object.assign({}, state.subAssets);
				var nEntities =  union(state.entities, action.response.data);
				var nextPageUrl = action.response.nextPageUrl;
				return {
					entities: nEntities,
					subAssets: nSubAssets,
					nextPageUrl
				}
			}
			return state
		default:
			return state;
	}
}


export function pagination(state = {
		[TASK_ASSETS] : { nextPageUrl : undefined },
		[TASK_GROUPS] : { nextPageUrl : undefined } }, action) {
	// debugger;
	switch (action.type) {
		case ENTITY_ASSETS_SUCCESS:
			// debugger
			if(action.response && action.response.nextPageUrl) {
				var assets = { nextPageUrl: action.response.nextPageUrl };
				return merge({}, state, {
			        assets: assets,
			        groups: state.groups
			      });
			}
			return state
		case ENTITY_GROUPS_SUCCESS:
			// debugger
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
		case 'SHOW_MENU':
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

function tasks(state = {}, action) {
	return state
}



export const entities = combineReducers({
  assets: tasks,
  groups: tasks
});



