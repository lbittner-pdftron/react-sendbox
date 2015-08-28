import React, { Component } 					from 'react';
import { bindActionCreators, combineReducers } 	from 'redux';
import { connect } 								from 'react-redux';

import { TASK_GROUPS } 			from '../constants/ActionTypes';
import { fetchAssets } 			from '../actions/entityActions';

class PanelOne extends Component {
	componentWillMount() {
  	}

  	componentDidMount() {
  		console.log('PanelOne.mount', this.props)
  	}

	render() {
		var stub5 = this.props
		debugger

		const { category, entities, subAssets } = this.props;


		console.log(entities, subAssets)
		return (
			<div className='project-library library-panel'>
				<p>Type: {category}</p>
				{entities}
				{subAssets}
				<button onClick={::this.handleLoadMoreClick}>Load More</button>
			</div>
		);

	}


	handleLoadMoreClick() {
  		console.log('handleLoadMoreClick')
    	this.props.loadLibraryEntity('fantastic', this.props.category);
  	}
}

// <MainSection entities={entities}
				// 	menu={menu}
				// 	category={category}
				// 	actions={this.props} />

function select (state) {
	var stub4 = TASK_GROUPS
	debugger
	const { groups: { entities, subAssets } } = state

	var result  = {
		category: TASK_GROUPS,
		entities: entities,
		subAssets: subAssets
	};

	return result;
}

export default connect(select, {})(PanelOne);