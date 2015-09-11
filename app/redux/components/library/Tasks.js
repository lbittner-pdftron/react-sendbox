import React, { Component, PropTypes } 	from 'react';
import classNames 						from 'classnames';

class TaskItem extends Component {
	render() {
		const { isFetching, markAll, markOne, items, selected, checkAllTask } = this.props;
		const entities = items;

		if(isFetching) {
			return (<div className="task-container">
						<div className="loader">Loading...</div>
					</div>);
		}

		var total = (selected) ? selected.length : -1;
		var uid = guid();
		return (
			<div className="task-container">
				<div className="table-head">
					<input id={uid} type="checkbox" checked={total === entities.length}
						onChange={(event) => markAll(event)}/>
					<label htmlFor={uid} className="left"><span></span></label>
					<div>Name</div>
					<div>Type</div>
					<div>Status</div>
				</div>
				{
					entities.map(entity => {
						let id = 'chk' + entity.id;
						var isChecked = (selected) ? selected.indexOf(entity.id) > -1 : false;

						return (<div className="task-info-item" key={entity.id}>
									<input id={id} type="checkbox" checked={isChecked}
										onChange={() => markOne(entity.id)}/>
									<label htmlFor={id} className="left"><span></span></label>
									<div className="ellipsis-text">{entity.name}</div>
									<div className="ellipsis-text">Entity Type</div>
									<div>
										<div className="mavis-status status0 radius"></div>
										{entity.fields.status}
									</div>
									<i className="global-asset fa fa-globe"></i>
									<i className="task-item-menu fa fa-bars"></i>
								</div>)
					}, this)
				}
				<div className="action-control">
					<ul className="control-action">
						<li>Edit</li>
						<li>Delete</li>
					</ul>
				</div>
			</div>
		);
	}
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
export default TaskItem