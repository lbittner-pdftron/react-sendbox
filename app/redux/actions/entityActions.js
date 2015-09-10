import { ENTITY_ASSETS_REQUEST,
		ENTITY_ASSETS_SUCCESS,

		ENTITY_SUBTASK_REQUEST,
		ENTITY_SUBTASK_SUCCESS,
		ENTITY_SUBTASK_FAILURE,

		ENTITY_GROUPS_REQUEST,
		ENTITY_GROUPS_SUCCESS,
		ENTITY_GROUPS_FAILURE,
		ENTITY_ASSETS_FAILURE,
		TASK_ASSETS,
		TASK_GROUPS,
		TASK_PROJECTS,
		SHOW_MENU,
		CHECK_ONE,CHECK_ALL,
		CHECK_ONE_TASK,
		CHECK_ALL_TASK} from '../constants/ActionTypes';
import 'isomorphic-fetch';
const projectID = 1;

export function fetchAssets(project, category) {
	return function(dispatch, getState) {
		var _ref5 = getState().pagination[category] || {};
		var _ref5$nextPageUrl = _ref5.nextPageUrl;
		var nextPageUrl = _ref5$nextPageUrl === undefined ? 'Entities' : _ref5$nextPageUrl;

		var filter = {
						filter: {
							where: {
								category: category,
								project: project
							}
						}
					}

		var fetchAction = {};
		fetchAction['category'] = category;
		fetchAction['project'] = project;
		fetchAction['CALL_API'] = {
			types: [ENTITY_ASSETS_REQUEST, ENTITY_ASSETS_SUCCESS, ENTITY_ASSETS_FAILURE],
			endpoint: nextPageUrl,
			filter:  filter,
			category: category
		}

		return dispatch(fetchAction);
	}
}


export function fetchSubTasks(entityId) {
	return function(dispatch, getState) {
		// dispatch({ type: 'OPEN', entityId: entityId })
		var tasks = getState().assetTasks[entityId];
		if(tasks) {
			return dispatch({
				type: 'EXIST',
				entityId: entityId,
				tasks: tasks
			});
		}
		var url =  'Entities/' + entityId + '/collections';

		var filter = {
						filter: {
							// where: {
							// 	// category: category,
							// 	// project: project
							// }
						}
					}
		// debugger
		var fetchAction = {};
		fetchAction['entityId'] = entityId;

		fetchAction['CALL_API'] = {
			types: [ENTITY_SUBTASK_REQUEST, ENTITY_SUBTASK_SUCCESS, ENTITY_SUBTASK_FAILURE],
			endpoint: url,
			filter:  filter
		}
		return dispatch(fetchAction)
	}
}

export function showMenu(id) {
  return { type: SHOW_MENU, id };
}

export function checkOne(id) {
  return { type: CHECK_ONE, id };
}

export function checkAll(uncheck) {
  	return { type: CHECK_ALL, uncheck };
}

export function checkOneTask(entityId, id) {
	console.log('*****', entityId, id)
  return { type: CHECK_ONE_TASK, entityId, id };
}
export function checkAllTask(entityId) {
  return { type: CHECK_ALL_TASK, entityId };
}


export function checkOne(id) {
	return function(dispatch, getState) {
		var action = {};
		action.id = 7;
		action.category = 'assets'
		action.setting = { expanded:[], selected:[] };
		action.type = 'CHECK_ONEX'
		return dispatch(action);
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

		var action = {};
		action['category'] = category;
		action['CALL_API'] = {
			types: [ENTITY_GROUPS_REQUEST, ENTITY_GROUPS_SUCCESS, ENTITY_GROUPS_FAILURE],
			endpoint: nextPageUrl,
			filter:  filter,
			category: category,
			project: project
		}

		return dispatch(action);
	}
}
