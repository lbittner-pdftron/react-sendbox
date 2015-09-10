import React, { Component, PropTypes } 	from 'react';
import AssetItem 						from './AssetItem';

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
		const { entities, menu } = this.props;
		const { actions: { showMenu, checkOne, checkOneTask, checkAllTask }} = this.props;
		return (
			<div className="asset-list-area">

				<ul className='asset-item-list'>
					{
						entities.map( function(entity, index) {
							var tasks = this.props.assetTasks[entity.id]
							return (<AssetItem
										key={index}
										subTasks={tasks}
										entity={entity}
										onShowMenu={() => showMenu(entity.id)}
										onCheckOne={() => checkOne(entity.id)}
										onFetchTasks={() => this.fetchSubTasks(entity.id)}

										onCheckOneTask={(id) => checkOneTask(entity.id, id)}
										onCheckAllTask={() => checkAllTask(entity.id)}

										isMenuOpen={entity.id === menu}
										isExpended={this.state.expanded[entity.id]  || false}
									/>);
						}, this)
					}
				</ul>
			</div>
		);
	}
}

export default MainSection;
