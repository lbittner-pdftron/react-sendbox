import React, { Component } 		from 'react';
import { bindActionCreators } 		from 'redux';
import { connect } 					from 'react-redux';
import { searchTerm } 				from '../../actions/searchActions';

class SearchBar extends Component {
	componentDidMount() {
		console.log('SearchBar', this.props)
	}
	onBlurHandler(event) {
		console.log('onBlurHandler',event)

	}
	onFocusHandler(event) {
		console.log('onFocusHandler',event)
	}
	onChangeHandler(event) {
		console.log('onChangeHandler',event)
		this.props.actions.searchTerm('sometext')
	}
	render() {
		// log('[render]', this.state.filterOpen);
		var menuStyle = {
			// display: (this.state.filterOpen) ? 'block': 'none',
			marginTop: 35,
			left: 15
		};

		var menu = [
			{label: 'All', id: 'all'},
			{label: 'Asset Type', id: 'type'},
			{label: 'Name', id: 'name'},
		];
		var fontAwesome = {
			fontFamily: 'FontAwesome'
		};
		return (
				<div>
					<div className="small-4 search-select left">
						<a href="" className="dropdown-button left" onClick={this.openFilterMenu} >
							{/*<i className="fa fa-search fa-lg left"></i>*/}
							{this.label}
							<i className="fa fa-sort-desc fa-lg right"></i>
						</a>
						<ul style={menuStyle} id="asset-filter" className="f-dropdown">
							{
								menu.map(function(item) {
									return (<li onClick={this.onFilterSelect}>
												<a href="">{item.label}</a>
											</li>);
								}, this)
							}
						</ul>
					</div>
					<div className="small-8 left">
						<input type="text" placeholder="&#xF002; Search by" style={fontAwesome}
							onBlur={::this.onBlurHandler}
							onFocus={::this.onFocusHandler}
							onChange={::this.onChangeHandler}/>
					</div>
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
  return { actions: bindActionCreators({ searchTerm }, dispatch) };
}
export default connect(select, mapDispatchToProps)(SearchBar);