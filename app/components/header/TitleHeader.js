import React, {Component} from "react";
import {connect} from "react-redux";
import {Header, Left, Right, Body, Form, Item, Title} from "native-base";

class TitleHeader extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<Header>
				<Left style={{flex:1}}/>
				<Body style={{flex:1}}>
				<Title >{this.props.children}</Title>
				</Body>
				<Right style={{flex:1}}/>
			</Header>
		)
	}

	shouldComponentUpdate() {
		return false
	}
}

function bindAction(dispatch) {
	return {};
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, bindAction)(TitleHeader)
