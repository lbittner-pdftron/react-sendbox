import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class TaskItem extends Component {
	render() {
		var cl = classNames('task-container', {
			'expended': true
		})
		return (
			<div className={cl}>
				<div className="table-head">
					<input id={'id'} type="checkbox" checked={this.props.isChecked}/>
					<label htmlFor={'id'} className="left">
						<span onClick={this.handleCheckbox}></span>
					</label>
					<div>Task</div>
					<div>Status</div>
					<div>Artist</div>
				</div>
				<div className="task-content">
					<input id={'id'} type="checkbox" checked={this.props.isChecked}/>
					<label htmlFor={'id'} className="left">
						<span onClick={this.handleCheckbox}></span>
					</label>
					<div>Modeling</div>
					<div><div className="mavis-status status0 radius"></div>Status</div>
					<div>Artist Name</div>
				</div>
				<div className="action-control">
					<ul className="control-action">
						<li><a href="#">Edit</a></li><li><a href="#">Link to..</a></li><li><a href="#">Delete</a></li>
					</ul>
				</div>
			</div>
		);
	}
}


export default TaskItem