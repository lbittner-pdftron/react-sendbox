import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Tasks from './Tasks';
const ADD = 'ADD';
const EDIT = 'EDIT';
const PUBLISH = 'PUBLISH';
const VIEW = 'VIEW';
var log =  require('debug')('asset');
class AssetItem extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		// log('**',this.props.tasks.selected)
		// return true;
		return this.props.isExpanded !== nextProps.isExpanded ||
			this.props.tasks.isFetching !== nextProps.tasks.isFetching ||
			this.props.tasks.selected !== undefined;
	}
	componentDidUpdate(prevProps, prevState) {
		log('---- update')
	}
	onShowMenu(event) {
		event.stopPropagation();
		event.preventDefault();
		this.props.onShowMenu();
	}
	onMenuSelect(event) {
		event.preventDefault();
		event.stopPropagation();
		// console.log('onMenuSelect',event.target.getAttribute('data-action'));
	}

	renderMenu(isMenuOpen) {
		var menuStyle = { display: 'block' };
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
		log('render')
		const { entity, tasks } = this.props;
		const { isExpanded, isChecked, isSelected, isMenuOpen } = this.props;
		const { onCheckOne, markAll, markOne, onFetchTasks } = this.props;
		const containerCLass = { 'item-selected': isSelected };
		const listStyle = { expanded: isExpanded };

		let TaskList = null;

		if(isExpanded) {
			TaskList = <Tasks {...tasks}
				markAll={::this.props.markAll}
				markOne={::this.props.markOne}/>
		}

		let id = 'chk' + entity.id;
		return (
			<li className={classNames(listStyle)}>
				<div className={classNames('asset-item-container', containerCLass)}>
					<input id={id} type="checkbox" checked={isChecked}
						onChange={() => onCheckOne()}/>
					<label htmlFor={id} className="left">
						<span></span>
					</label>
					<div className="item-expand" onClick={() => onFetchTasks()}>
						<i className="fa fa-chevron-down"></i>
					</div>
					<img className="left" src="/images/asset-thumb-01.jpg" />
					<div className="asset-text-area left">
						<p className="asset-title ellipsis-text">{entity.name}</p>
						<div className="mavis-status status0 radius"></div>
						<p>Status Here</p>
					</div>
					<div className="asset-progress-bar">
						<div className="complete-percentage percent50"> </div>
					</div>
					<div className="item-util-control mavis-action-menu" onClick={::this.onShowMenu}>
						<i className="fa fa-bars"></i>
						{this.renderMenu(isMenuOpen)}
					</div>
				</div>
				{TaskList}
			</li>
		);
	}
}

export default AssetItem;