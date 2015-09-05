import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Tasks from './Tasks';

class AssetItem extends Component {
	render() {
		const { entity, isExpended, isSelected, isChecked, isMenuOpen } = this.props;
		const id = 'chk' + entity.id;

		const containerCLass = classNames({
			'asset-item-container': true,
			'item-selected': isSelected
		});


		var TaskList = null;
		if(isExpended) {
			TaskList = <Tasks/>
		}

		return (
			<li className="">
				<div className={containerCLass}>
					<input id={id} type="checkbox" checked={isChecked}/>
					<label htmlFor={id} className="left">
						<span onClick={this.handleCheckbox}></span>
					</label>
					<img className="left" src="/images/asset-thumb-01.jpg" />
					<div className="asset-text-area left">
						<p className="asset-title ellipsis-text">{entity.name}</p>
						<p>Tasks: #</p>
						<div className="mavis-status status0 radius"></div>
						<p>Status Here</p>
					</div>
					<ul className="item-util-control">
						<li className="item-menu">
							<a href="javascript:void(0);" onClick={::this.onShowMenu} className="mavis-action-menu">
								<i className="fa fa-bars"></i>
							</a>
						</li>
						<li className="item-expand">
							<a href="javascript:void(0);" onClick={::this.props.onFetchTasks}>
								<i className="fa fa-chevron-down"></i>
							</a>
							{this.renderMenu(isMenuOpen)}
						</li>
					</ul>
				</div>

				{TaskList}
			</li>
		);
	}

	onShowMenu(event) {
		event.stopPropagation();
		this.props.onShowMenu();
	}

	renderMenu(isMenuOpen) {
		var menuStyle = {
			display: 'block'
		};
		var menu = null;
		if (isMenuOpen) {
			menu = (<ul className="action-menu-list pos-right" style={menuStyle}>
						<li onClick={this.handleActionSelect} data-action="Add_Task">Add Task</li>
						<li onClick={this.handleActionSelect} data-action="Edit">Edit</li>
						<li onClick={this.handleActionSelect} data-action="Publish">Publish</li>
						<li onClick={this.handleActionSelect} data-action="View">View</li>
					</ul>);
		}
		return menu;
	}
}

export default AssetItem;