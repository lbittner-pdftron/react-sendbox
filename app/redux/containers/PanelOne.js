import React, { Component } from 'react';
import { bindActionCreators,
		combineReducers } 	from 'redux';
import { connect } 			from 'react-redux';

// local
import { TASK_ASSETS } 		from '../constants/ActionTypes';
import { fetchAssets, fetchSubTasks } 		from '../actions/entityActions';



function loadData(props) {

	props.actions.fetchAssets('fantastic', props.category);
}


class PanelOne extends Component {
	fetch() {
		console.log('fetch', this.props)
		loadData(this.props);
	}
	componentDidUpdate(prevProps, prevState) {
		console.warn('################ PanelOne update')
	}
	componentDidMount() {
		console.warn('################ PanelOne mount')
	}

	fetchChildren(id) {
		this.props.actions.fetchSubTasks(id)
	}
	render() {
		var stub5 = this.props

		const { category, entities, subAssets, expended } = this.props;

		console.log(entities, expended)
		return (
			<div className='project-library library-panel'>
				<p>Type: {category}</p>
				<ul>
					{
						entities.map(function(entity) {
							console.log(entity)
							var expend = expended[entity.id] || false;
							var tt = (expend) ? <p>TRUE</p>:null;
							return <li key={entity.id}>{entity.name} - type: {entity.category}
									<button onClick={() => this.fetchChildren(entity.id)}>Show children</button>
									{tt}
								</li>
						}, this)
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
	var stub4 = TASK_ASSETS
	const { assets: { entities, subAssets }, assets: { expended } } = state

	var result  = {
		category: TASK_ASSETS,
		entities: entities,
		subAssets: subAssets,
		expended: expended
	};

	return result;
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchAssets, fetchSubTasks }, dispatch) };
}



export default connect(select, mapDispatchToProps)(PanelOne);