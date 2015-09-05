import React, { Component, PropTypes } from 'react';
import AssetItem from './AssetItem';

class MainSection extends Component {
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	      expended: this.props.expended || {}
	    };
  	}


	fetchSubTasks(id) {
		const { expended }  = this.state;
		const { actions } = this.props;

		let isExtended = expended[id] || false;
		if(!isExtended) {
			actions.fetchSubTasks(id)
		}

		expended[id] = !expended[id];

		this.setState({
			expended: expended
		})
	}

	render() {
		const { entities, menu } = this.props;
		const { actions: { showMenu }} = this.props;
		return (
			<div className="asset-list-area">
				<ul className='asset-item-list'>
					{
						entities.map( function(entity, index) {
							return (<AssetItem
										key={index}
										entity={entity}
										onShowMenu={() => showMenu(entity.id)}
										isMenuOpen={entity.id === menu}
										onFetchTasks={() => this.fetchSubTasks(entity.id)}
										isExpended={this.state.expended[entity.id]  || false}
									/>);
						}, this)
					}
				</ul>
			</div>
		);
	}
}

export default MainSection;