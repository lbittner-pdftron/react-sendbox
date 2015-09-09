import React, { Component, PropTypes } 	from 'react';
import classNames 						from 'classnames';

class TaskItem extends Component {
	render() {
		const { isFetching, onCheckboxMaster, onCheckbox, items } = this.props;
		const entities = items;

		if(isFetching) {
			return (<div className="task-container">
						<div className="loader">Loading...</div>
					</div>);
		}

		let total = 0;
		for (var i = entities.length - 1; i >= 0; i--) {
			if(entities[i].$checked) total++;
		}

		return (
			<div className="task-container">
				<div className="table-head">
					<input id={'xxid'} type="checkbox" checked={total === entities.length}/>
					<label htmlFor={'xxid'} className="left">
						<span onClick={() => onCheckboxMaster()}></span>
					</label>
					<div>Task</div>
					<div>Status</div>
					<div>Artist</div>
				</div>
				{
					entities.map(entity => {
						let id = 'chk' + entity.id;
						return (<div className="task-content" key={entity.id}>
									<input id={id} type="checkbox" checked={entity.$checked}/>
									<label htmlFor={id} className="left">
										<span onClick={() => onCheckbox(entity.id)}></span>
									</label>
									<div>{entity.name}</div>
									<div>
										<div className="mavis-status status0 radius"></div>
										{entity.fields.status}
									</div>
									<div>Artist Name</div>
								</div>)
					}, this)
				}
				<div className="action-control">
					<ul className="control-action">
						<li><a href="#">Edit</a></li>
						<li><a href="#">Link to..</a></li>
						<li><a href="#">Delete</a></li>
					</ul>
				</div>
			</div>
		);
	}
}


export default TaskItem