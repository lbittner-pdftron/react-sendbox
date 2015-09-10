import React, { Component } 						from 'react';
import { bindActionCreators, combineReducers } 		from 'redux';
import { connect } 									from 'react-redux';
import { TASK_ASSETS, ASSET_PANEL }					from '../constants/ActionTypes';
import { fetchAssets, fetchSubTasks,
		showMenu, checkOne, checkAll,
		checkOneTask, checkAllTask } 				from '../actions/entityActions';
import MainSection 									from '../components/library/MainSection';
import SearchBar 									from '../components/library/SearchBar';


class Library extends Component {
	componentDidMount() {
		window.actions = this.props.actions
		const { actions, category} = this.props;
		actions.fetchAssets('fantastic', category);
	}
	onCreateNewEntity() {
		app.currentPage.trigger('onCreateNewAsset');
	}
	render() {
		const { actions: { checkAll }} = this.props;
		var total = 1//this.props.setting.selected.length;
		// for (var i = this.props.entities.length - 1; i >= 0; i--) {
		// 	if(this.props.entities[i].$checked) total++;
		// }

		return (
			<div className='asset-panel'>
				<div className="asset-list-header">

					{/*------(+ New button)---------*/}
					<div className="row">
						<div className="small-12 column">
							<h5 className="all-up-case asset-panel-title">Asset
								<div className="button mavis-button radius custom-padding-size">
									<a onClick={::this.onCreateNewEntity}>
										<span className="add-new">+&nbsp;
											<span className="new-word all-up-case">New</span>
										</span>
									</a>
								</div>
							</h5>
						{/*------<a href="">
							<i className="fa fa-cog fa-lg mavis-action-menu icon-dropdown"></i>
						</a>
						<p className="library-name">{this.props.title}</p>---------*/}
						</div>
					</div>

					{/*------(Search Bar)---------*/}
					<div className="row search-bar">
						<div className="small-12 column">
							<SearchBar />
						</div>
					</div>

					{/*------List Header-------*/}
					<div className="row">
						<div className="small-12 column">
							<div className="asset-header">
								<div>
									<input id="sAll" type="checkbox"
										checked={total===this.props.entities.length}
										onChange={(event) => checkAll(TASK_ASSETS, event.target.checked)}/>
									<label htmlFor="sAll" className="left">
										<span></span>
									</label>
								</div>
								<div>
									<p>
										<a href="" className="selected-item">{total}</a> Item selected
										<a href="javascript:void(0)" className="clear-assets"
											onClick={() => checkAll(TASK_ASSETS, false)}>Clear</a>
									</p>
								</div>
								<div className="assets-action-items right">
									<a href="" onClick={this.handleActionClick}>
										<i className="fa fa-bars"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr className="line-divider"/>

				<MainSection {...this.props}/>

				{/*------- Footer -------*/}
				<div className="list-footer">
					<div className="list-results-count">
						<p className="result-display">Results: {this.props.entities.length} of total number</p>
					</div>
				</div>
			</div>
		);
	}

}

function select (state) {
	var pagination = state.pagination[TASK_ASSETS];

	const { assetTasks, menu } = state;
	const { assets: { entities, expanded } } = state;

	const array = pagination.ids.map(id => entities[id]);


	// const setting = state.setting[TASK_ASSETS] || { expanded:[], selected:[] };
	const libraryPanel = state.libraryPanel;
	// console.log(setting.selected)
	var result  = {
		category: TASK_ASSETS,
		entities: array,
		assetTasks,
		expanded,
		menu,
		// setting,
		libraryPanel
	};

	return result;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(
  	{ fetchAssets, fetchSubTasks, showMenu, checkOne, checkAll, checkOneTask, checkAllTask }, dispatch) };
}




export default connect(select, mapDispatchToProps)(Library);
