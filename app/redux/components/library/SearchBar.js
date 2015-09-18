import React, { Component } 		from 'react';
import { bindActionCreators } 		from 'redux';
import { connect } 					from 'react-redux';
import { searchTerm } 				from '../../actions/searchActions';

const SEARCH_INPUT = 'SEARCH_INPUT';

class SearchBar extends Component {
	componentDidMount() {
		// // console.log('SearchBar', this.props)
	}
	onBlurHandler(event) {
		// // console.log('onBlurHandler',event)

	}
	onFocusHandler(event) {
		// // console.log('onFocusHandler',event)
	}
	getInputValue() {
		return React.findDOMNode(this.refs[SEARCH_INPUT]).value.trim();
	}
	onSubmitHandler(event) {
		event.preventDefault();
		var text = this.getInputValue();
		// console.log(text)
	}
	onChangeHandler(event) {
		// // console.log('onChangeHandler',event)
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
								menu.map(function(item, i) {
									return (<li key={i} onClick={this.onFilterSelect}>
												<a href="">{item.label}</a>
											</li>);
								}, this)
							}
						</ul>
					</div>
					<div className="small-8 left">
						<form onSubmit={::this.onSubmitHandler}>
							<input style={fontAwesome} type="text" placeholder="&#xF002; Search by" ref={SEARCH_INPUT}
								onBlur={::this.onBlurHandler}
								onFocus={::this.onFocusHandler}
								onChange={::this.onChangeHandler}
								/>
						</form>
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