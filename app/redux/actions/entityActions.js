import {ENTITY_ASSETS_REQUEST, ENTITY_ASSETS_SUCCESS, ENTITY_SUBTASK_REQUEST,
		ENTITY_GROUPS_REQUEST,
		ENTITY_GROUPS_SUCCESS,
		ENTITY_GROUPS_FAILURE,
		ENTITY_ASSETS_FAILURE,TASK_ASSETS, TASK_GROUPS, TASK_PROJECTS}
						from '../constants/ActionTypes';
import 'isomorphic-fetch';


export function fetchAssets(project, category) {
	return function(dispatch, getState) {
		var _ref5 = getState().pagination[category] || {};
		var _ref5$nextPageUrl = _ref5.nextPageUrl;
		var nextPageUrl = _ref5$nextPageUrl === undefined ? 'Entities' : _ref5$nextPageUrl;

		var filter = {
						filter: {
							limit: 1,
							skip: 0,
							where: {
								category: category,
								project: project
							}
						}
					}

		var fetch = {};
		fetch['category'] = category;
		fetch['CALL_API'] = {
			types: [ENTITY_ASSETS_REQUEST, ENTITY_ASSETS_SUCCESS, ENTITY_ASSETS_FAILURE],
			endpoint: nextPageUrl,
			filter:  filter,
			category: category,
			project: project
		}

		return dispatch(fetch);
	}
}


export function fetchSubTasks(entityId) {
	return function(dispatch, getState) {
		debugger
		return dispatch({type: ENTITY_SUBTASK_REQUEST, id: entityId })
	}
}


export function fetchGroups(project, category) {
	return function(dispatch, getState) {
		var _ref5 = getState().pagination[category] || {};
		var _ref5$nextPageUrl = _ref5.nextPageUrl;
		var nextPageUrl = _ref5$nextPageUrl === undefined ? 'Entities' : _ref5$nextPageUrl;

		var filter = {
						filter: {
							limit: 1,
							skip: 0,
							where: {
								category: category,
								project: project
							}
						}
					}

		var fetch = {};
		fetch['category'] = category;
		fetch['CALL_API'] = {
			types: [ENTITY_GROUPS_REQUEST, ENTITY_GROUPS_SUCCESS, ENTITY_GROUPS_FAILURE],
			endpoint: nextPageUrl,
			filter:  filter,
			category: category,
			project: project
		}

		return dispatch(fetch);
	}
}
