import React, { Component } from 'react';
import { bindActionCreators,
		combineReducers } 	from 'redux';
import { connect } 			from 'react-redux';

// local
import { TASK_GROUPS } 		from '../constants/ActionTypes';
import { fetchGroups } 		from '../actions/entityActions';



function loadData(props) {

	props.fetchGroups('fantastic', props.category);
}


class PanelTwo extends Component {
	fetch() {
		console.log('fetch', this.props)
		loadData(this.props);
	}
	componentDidUpdate(prevProps, prevState) {
		console.warn('################ PanelTwo update')
	}
	componentDidMount() {
		console.warn('################ PanelTwo mount')
	}
	render() {
		var stub5 = this.props
		const { category, entities, subAssets } = this.props;

		console.log(entities, subAssets)
		return (
			<div className='project-library library-panel'>
				<p>Type: {category}</p>
				<ul>
					{
						entities.map(function(entity) {
							console.log(entity)
							return <li key={entity.id}>{entity.name} - type: {entity.category}</li>
						})
					}
				</ul>
				{subAssets}
				<button onClick={::this.fetch}>Load More</button>
			</div>
		);
	}

	handleLoadMoreClick() {
  		console.log('handleLoadMoreClick')
    	this.props.loadLibraryEntity('fantastic', this.props.category);
  	}
}


function select (state) {
	var stub4 = TASK_GROUPS
	const { groups: { entities, subAssets } } = state

	var result  = {
		category: TASK_GROUPS,
		entities: entities,
		subAssets: subAssets
	};

	return result;
}

export default connect(select, {fetchGroups})(PanelTwo);