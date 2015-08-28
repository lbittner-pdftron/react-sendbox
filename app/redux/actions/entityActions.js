import {ENTITY_ASSETS_REQUEST, ENTITY_ASSETS_SUCCESS,
		ENTITY_GROUPS_REQUEST,
		ENTITY_GROUPS_SUCCESS,
		ENTITY_GROUPS_FAILURE,
		ENTITY_ASSETS_FAILURE,TASK_ASSETS, TASK_GROUPS, TASK_PROJECTS}
						from '../constants/ActionTypes';
import fetch 			from 'isomorphic-fetch';


export function fetchAssets(project, category) {
	return function(dispatch, getState) {

		var _ref5 = getState().pagination[TASK_ASSETS] || {};
		var _ref5$nextPageUrl = _ref5.nextPageUrl;
		var nextPageUrl = _ref5$nextPageUrl === undefined ? 'Entities' : _ref5$nextPageUrl;
		// debugger;


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



export function fetchGroups(project, category) {
	return function(dispatch, getState) {

		var _ref5 = getState().pagination[TASK_GROUPS] || {};
		var _ref5$nextPageUrl = _ref5.nextPageUrl;
		var nextPageUrl = _ref5$nextPageUrl === undefined ? 'Entities' : _ref5$nextPageUrl;
		// debugger;


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

export const REQUEST_POSTS = 'REQUEST_POSTS';
function requestPosts(project) {
  return {
    type: REQUEST_POSTS,
    project
  };
}

function fetchPosts(project) {
  return dispatch => {
    dispatch(requestPosts(project));
    return fetch(`http://www.reddit.com/r/${project}.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(project, json)));
  }
}