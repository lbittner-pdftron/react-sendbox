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
		TASK_TASKS,
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

// export function checkOne(id) {
//   return { type: CHECK_ONE, id };
// }

// export function checkAll(uncheck) {
//   	return { type: CHECK_ALL, uncheck };
// }

export function checkOneTask(assetId, taskId) {
	return function(dispatch, getState) {
		var action = {};

		action.id = taskId;
		action.assetId = assetId;
		action.category = TASK_TASKS;
		action.type = 'CHECK_ONEX'
		return dispatch(action);
	}
	// // console.log('*****', entityId, id)
 //  return { type: CHECK_ONE_TASK, entityId, id };
}
export function checkAllTask(assetId, isChecked) {
	return function(dispatch, getState) {
		debugger;
		var ids = getState().assetTasks[assetId].items.map((item) => item.id)

		var action = {};
		action.ids = ids;
		action.assetId = assetId;
		action.isChecked = isChecked;
		action.category = TASK_TASKS;
		action.type = 'CHECK_ALLX'
		return dispatch(action);
	}
  	// return { type: CHECK_ALL_TASK, entityId };
}


export function checkOne(category, assetId) {
	return function(dispatch, getState) {
		var action = {};
		action.id = assetId;
		action.category = category;
		action.type = 'CHECK_ONEX'
		return dispatch(action);
	}
}
export function checkAll(category, isChecked) {
	return function(dispatch, getState) {
		debugger;
		var ids = getState().pagination[category].ids;

		var action = {};
		action.ids = ids;
		action.isChecked = isChecked;
		action.category = category;
		action.type = 'CHECK_ALLX'
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
