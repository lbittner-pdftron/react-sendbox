import React, { Component } from 'react';
import { bindActionCreators,
		combineReducers } 	from 'redux';
import { connect } 			from 'react-redux';

// local
import { TASK_ASSETS } 		from '../constants/ActionTypes';
import { fetchAssets, fetchSubTasks, showMenu } 		from '../actions/entityActions';
import MainSection from '../components/library/MainSection';


function loadData(props) {
	props.actions.fetchAssets('fantastic', props.category);
}


class PanelOne extends Component {
	fetch() {
		console.log('fetch', this.props)
		loadData(this.props);

	}
	componentDidUpdate(prevProps, prevState) {
		// console.warn('################ PanelOne update')
	}
	componentDidMount() {
		loadData(this.props);
		// console.warn('################ PanelOne mount')
	}

	fetchChildren(id) {
		var isExtended = this.props.expended[id] || false;
		if(!isExtended) {
			this.props.actions.fetchSubTasks(id)
		}
		this.props.expended[id] = !this.props.expended[id];
		this.setState({
			expended: this.props.expended
		})
	}
	renderMenu(isMenuOpen) {
		var menuStyle = {
			display: 'block'
		};
		var menu = null;
		if (isMenuOpen) {
			menu = (
				<div> menu
					<ul className="action-menu-list pos-right" style={menuStyle}>
						<li data-action="Add_Task">Add Task</li>
						<li data-action="Edit">Edit</li>
						<li data-action="Publish">Publish</li>
						<li data-action="View">View</li>
					</ul>
				</div>);
		}
		return menu;
	}

	render() {
		var stub5 = this.props
		const { category, entities, subAssets, expended, actions: { showMenu }, menu } = this.props;

		return (
			<div className='asset-panel'>
				<MainSection entities={entities}
							tasks={subAssets}
							expended={expended}
							menu={menu}
							actions={this.props.actions}/>
			</div>
		);
		return (
			<div className='project-library library-panel'>
				<p>Type: {category}</p>
				<ul>
					{
						entities.map(function(entity) {
							// console.log(entity)
							var isExtended = this.props.expended[entity.id] || false;

							var isSub = subAssets[entity.id] || null;
							var tt2 = null
							if(isSub && isExtended) {
								tt2 = isSub.items.map(function(it){
									return <li key={it.id}>{it.name}</li>
								})
							}

							return <li key={entity.id}>{entity.name} - type: {entity.category}
									<button onClick={() => this.fetchChildren(entity.id)}>expend</button>
									<button onClick={() => showMenu(entity.id)}>menu</button>
									<ul>
										{tt2}
									</ul>
									{this.renderMenu(entity.id === menu)}
								</li>
						}, this)
					}
				</ul>

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
	const { assets: { entities }, subAssets, assets: { expended }, menu } = state

	var result  = {
		category: TASK_ASSETS,
		entities: entities,
		subAssets: subAssets,
		expended: expended,
		menu
	};

	return result;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ fetchAssets, fetchSubTasks, showMenu }, dispatch) };
}



export default connect(select, mapDispatchToProps)(PanelOne);