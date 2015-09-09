import React, { Component } 						from 'react';
import { bindActionCreators, combineReducers } 		from 'redux';
import { connect } 									from 'react-redux';
import { TASK_ASSETS } 								from '../constants/ActionTypes';
import { showMenu } 								from '../actions/entityActions';

class GroupsPanel extends Component {
	componentDidMount() {
		console.log(this.props)
	}

	render() {
		const { actions: { showMenu }} = this.props;

		return (
			<div>
				Menu: {this.props.menu}
			</div>
		);
	}

}


function select (state) {
	const { menu } = state
	var result  = {
		menu
	};

	return result;
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ showMenu }, dispatch) };
}




export default connect(select, mapDispatchToProps)(GroupsPanel);
