import React, { Component, PropTypes } 	from 'react';
import AssetItem 						from './AssetItem';
import { TASK_ASSETS,TASK_TASKS, ASSET_PANEL }		from '../../constants/ActionTypes';

class MainSection extends Component {
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	      expanded: this.props.expanded || {}
	    };
  	}

  	unexpandAll() {
  		this.setState({
  			expanded: {}
  		});
  	}

	fetchSubTasks(id) {
		const { expanded }  = this.state;
		const { actions } = this.props;

		let isExtended = expanded[id] || false;
		if(!isExtended) {
			actions.fetchSubTasks(id)
		}

		expanded[id] = !expanded[id];
		this.setState({
			expanded: expanded
		})
	}

	render() {
		const { entities, menu, setting } = this.props;
		const { actions: { showMenu, checkOne, checkAll, checkOneTask, checkAllTask }} = this.props;
		return (
			<div className="asset-list-area">

				<ul className='asset-item-list'>
					{
						entities.map( function(entity, index) {
							var tasks = this.props.assetTasks[entity.id];
							let taskList = {};
							if (tasks) {
								taskList = Object.assign(tasks, this.props.libraryPanel.tasks[entity.id])
							}
							var isChecked = setting.selected.indexOf(entity.id) > -1;

							return (<AssetItem key={index}
										isChecked={isChecked}
										tasks={taskList}
										entity={entity}
										onShowMenu={() => showMenu(entity.id)}
										onCheckOne={() => checkOne(TASK_ASSETS, entity.id)}
										onFetchTasks={() => this.fetchSubTasks(entity.id)}
										markOne={(id) => checkOneTask(entity.id, id) }
										markAll={(event) => checkAllTask(entity.id, event.target.checked)}
										isMenuOpen={entity.id === menu}
										isExpanded={this.state.expanded[entity.id]  || false}
									/>);
						}, this)
					}
				</ul>
			</div>
		);
	}
}



export default MainSection;
