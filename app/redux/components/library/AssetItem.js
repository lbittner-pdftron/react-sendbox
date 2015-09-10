import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Tasks from './Tasks';
const ADD = 'ADD';
const EDIT = 'EDIT';
const PUBLISH = 'PUBLISH';
const VIEW = 'VIEW';

class AssetItem extends Component {
	onShowMenu(event) {
		event.stopPropagation();
		event.preventDefault();
		this.props.onShowMenu();
	}
	onMenuSelect(event) {
		event.preventDefault();
		event.stopPropagation();
		console.log('onMenuSelect',event.target.getAttribute('data-action'));
	}

	renderMenu(isMenuOpen) {
		var menuStyle = {
			display: 'block'
		};
		var menu = null;
		if (isMenuOpen) {
			menu = (<ul className="action-menu-list pos-right" style={menuStyle}>
						<li onClick={::this.onMenuSelect} data-action={ADD}>Add Task</li>
						<li onClick={::this.onMenuSelect} data-action={EDIT}>Edit</li>
						<li onClick={::this.onMenuSelect} data-action={PUBLISH}>Publish</li>
						<li onClick={::this.onMenuSelect} data-action={VIEW}>View</li>
					</ul>);
		}
		return menu;
	}

	render() {
		const { entity, subTasks } = this.props;
		const { isExpended, isChecked, isSelected, isMenuOpen } = this.props;
		const { onCheckOne, onCheckAllTask, onCheckOneTask, onFetchTasks } = this.props;
		const containerCLass = { 'item-selected': isSelected };
		const listStyle = { expanded: isExpended };

		let TaskList = null;

		if(isExpended) {
			TaskList = <Tasks {...subTasks}
				onCheckboxMaster={() => onCheckAllTask()}
				onCheckbox={::this.props.onCheckOneTask}/>
		}

		let id = 'chk' + entity.id;
		return (
			<li className={classNames(listStyle)}>
				<div className={classNames('asset-item-container', containerCLass)}>
					<input id={id} type="checkbox" checked={isChecked} />
					<label htmlFor={id} className="left">
						<span onClick={() => onCheckOne()}></span>
					</label>
					<img className="left" src="/images/asset-thumb-01.jpg" />
					<div className="asset-text-area left">
						<p className="asset-title ellipsis-text">{entity.name}</p>
						<p>Tasks: #</p>
						<div className="mavis-status status0 radius"></div>
						<p>Status Here</p>
					</div>
					<ul className="item-util-control">
						<li className="item-menu" onClick={::this.onShowMenu} >
							<a href="javascript:void(0);" className="mavis-action-menu">
								<i className="fa fa-bars"></i>
							</a>
						</li>
						<li className="item-expand" onClick={() => onFetchTasks()}>
							<a href="javascript:void(0);" >
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
}

export default AssetItem;