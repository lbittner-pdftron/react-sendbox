import {ENTITY_ASSET_REQUEST, ENTITY_ASSET_SUCCESS,	ENTITY_ASSET_FAILURE}
						from '../constants/ActionTypes';
import fetch 			from 'isomorphic-fetch';


export function fetchAssets(project, category) {
	return function(dispatch, getState) {
		// return dispatch(fetchPosts(project));

		// debugger;

		var filter = { filter: {
				limit: 1,
				skip: 0,
				where: { category: category, project: project }
			}}

		var fetch = {};
		fetch['category'] = category;
		fetch['CALL_API'] = {
			types: [ENTITY_ASSET_REQUEST, ENTITY_ASSET_SUCCESS, ENTITY_ASSET_FAILURE],
			endpoint: 'Entities',
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