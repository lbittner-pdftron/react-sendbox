import React, { Component } 						from 'react';
import { bindActionCreators, combineReducers } 		from 'redux';
import { connect } 									from 'react-redux';
import { TASK_ASSETS } 								from '../constants/ActionTypes';
import { fetchAssets, fetchSubTasks, showMenu } 	from '../actions/entityActions';
import MainSection 									from '../components/library/MainSection';

class Library extends Component {

	render() {

		const { entities, menu, expended } = this.props;
		const actions = this.props.actions;
		return (
			<div className='asset-panel'>
				<div className="asset-list-header">
				</div>
				<hr className="line-divider"/>

				<MainSection
					entities={entities}
					menu={menu}
					expended={this.props.expended}
					actions={actions}
				/>

				{/*------- Footer -------*/}
				<div className="list-footer">
					<div className="list-results-count">
						<p className="result-display">Results: 1 of total number</p>
					</div>
				</div>
			</div>
		);
	}

	componentDidMount() {
		window.actions = this.props.actions
		const { actions, category} = this.props;

		actions.fetchAssets('fantastic', category);
	}
}

function select (state) {
	const { assets: { entities }, subAssets, assets: { expended }, menu } = state
	var result  = {
		category: TASK_ASSETS,
		entities,
		subAssets,
		expended: expended,
		menu
	};

	return result;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchAssets, fetchSubTasks, showMenu }, dispatch) };
}




export default connect(select, mapDispatchToProps)(Library);