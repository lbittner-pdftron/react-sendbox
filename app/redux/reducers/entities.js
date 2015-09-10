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
		TASK_TASKS,
		TASK_GROUPS,
		TASK_PROJECTS,
		CHECK_ONE,CHECK_ALL,
		CHECK_ONE_TASK,
		CHECK_ALL_TASK,
		SHOW_MENU} from '../constants/ActionTypes';

import union from 'lodash/array/union';
import merge from 'lodash/object/merge';
import _ 	from 'lodash';
import { combineReducers } from 'redux';




export function groups(state = { entities:[], expanded: {}, assetTasks:{} }, action) {
	var stub1 = state
	switch (action.type) {
		case ENTITY_GROUPS_SUCCESS:
			if(action.response && action.response.data) {
				var nassetTasks = Object.assign({}, state.assetTasks);
				var nEntities =  union(state.entities, action.response.data);
				var nextPageUrl = action.response.nextPageUrl;
				return  Object.assign({}, state, {
					entities: nEntities,
					assetTasks: nassetTasks,
					nextPageUrl,
					expanded: state.expanded
				});
			}
			return state;
		default:
			return state;
	}
}

export function assets(state = { entities:{}, expanded: {}, assetTasks:{} }, action) {

	var stub2 = state
	switch (action.type) {
		case ENTITY_ASSETS_SUCCESS:
			if(action.response && action.response.entities) {

				var nassetTasks = Object.assign({}, state.assetTasks);
				// var nEntities =  union(state.entities, action.response.data);
				var nextPageUrl = action.response.nextPageUrl;
				var nEntities = merge({}, state.entities, action.response.entities.data);
				console.log(nEntities)
				debugger;
				return  Object.assign({}, state, {
					entities: nEntities,
					assetTasks: nassetTasks,
					expanded: state.expanded
				});
			}
			return state;
		case CHECK_ONE:
		case CHECK_ALL:
			return Object.assign({}, state, {
					entities: checkboxes(state.entities, action),
					assetTasks: state.assetTasks,
					expanded: state.expanded
				});;
		default:
			return state;
	}
}
// function updateMe( state = { expanded:[], selected:{} }, action ) {
// 	switch(action.type) {
// 		case 'CHECK_ONEX':
// 			state.selected[action.id] = !state.selected[action.id] || false;
// 			return Object.assign({}, state, {
// 				expanded:state.expanded,
// 				selected:state.selected
// 			})
// 		case 'CHECK_ALLX':
// 			var newArr = {}
// 				for (var i = 0; i < action.ids.length; i++) {
// 					newArr[action.ids[i]] = action.isAll
// 				};
// 				let result = Object.assign({}, state, {
// 					expanded: state.expanded,
// 					selected: newArr,
// 				});

// 				console.log('updateMe', result)
// 				return result
// 		default:
// 			return state
// 	}
// }
function updateMe( state = { expanded:[], selected:[] }, action ) {
	switch(action.type) {
		case 'CHECK_ONEX':
			var index = state.selected.indexOf(action.id);
			if (index > -1) state.selected.splice(index, 1);
			else state.selected.push(action.id);

			return Object.assign({}, state, {
				expanded: state.expanded,
				selected: state.selected
			});

		case 'CHECK_ALLX':
			return Object.assign({}, state, {
				expanded: state.expanded,
				selected: (action.isChecked) ? union(action.ids) : []
			});
		default:
			return state;
	}
}
export function setting(state = {}, action) {


	switch(action.type) {
		case 'CHECK_ALLX':
		case 'CHECK_ONEX':
			debugger
			const key = action.category;
			return Object.assign({}, state, {
		        [key]: updateMe(state[key], action)
		      });
		default:
			return state


	}
}

export function libraryPanel(state = { assets: { expanded:[], selected:[] }, tasks: {} }, action) {
	switch(action.type) {
		case 'CHECK_ALLX':
		case 'CHECK_ONEX':
			debugger
			if(action.category === 'assets') {
				const key = action.category;
				return Object.assign({}, state, {
			        assets: updateMe(state.assets, action),
			        tasks: state.tasks
			      });
			}
			else if(action.category === 'tasks') {
				const key = action.assetId;
				if(state.tasks[action.assetId])
					state.tasks[action.assetId] = { expanded:[], selected:[] }
				return Object.assign({}, state, {
			        assets: state.assets,
			        tasks: updateMe(state.tasks[action.assetId], action),
		      	});
			}
		default:
			return state
	}
}




// export const setting = combineReducers({
// 	assetList: assetPanel({
// 		mapActionToKey: action => action.category,
// 	    types: [
// 	      'STARRED_REQUEST'
// 	    ]
//   	}),
//   	// groupList: assetPanel({
//    //  	mapActionToKey: action => action.fullName,
// 	  //   types: [
// 	  //     	'STARGAZERS_REQUEST',
// 	  //   ]
//   	// })
// });
function checkboxes(state = [], action) {
	switch (action.type) {
		case CHECK_ONE:
		case CHECK_ONE_TASK:
			return state.map(entity =>
				entity.id === action.id ? Object.assign({}, entity, { $checked: !entity.$checked }) : entity
			);
		case CHECK_ALL:
		case CHECK_ALL_TASK:
			const areAllMarked = (action.uncheck) ? action.uncheck : state.every(entity => entity.$checked);
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
			var ids = action.response.result
			var items = ids.map(id => action.response.entities.data[id]);

			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				items: items,
				// lastUpdated: action.receivedAt
			});
		default:
			return state;
	}
}
export function assetTasks(state = {}, action) {
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
			return state;
		default:
			return state;
	}
}

export function pagination(state = {
		[TASK_ASSETS] : { nextPageUrl : undefined, ids: [] },
		[TASK_GROUPS] : { nextPageUrl : undefined, ids: [] } }, action) {
	switch (action.type) {
		case ENTITY_ASSETS_SUCCESS:
			if(action.response) {
				var ids = union(state[TASK_ASSETS].ids, action.response.result);
				var assets = { nextPageUrl: action.response.nextPageUrl, ids };
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




