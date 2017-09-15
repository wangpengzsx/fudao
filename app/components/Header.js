import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {Header, Left, Right, Body, Button, Icon, Title} from "native-base";

export default class Header_ extends PureComponent {

	render() {
		let {back, menu, left, center, right, title} = this.props;

		if (!left) {
			if (menu)
				left = (
					<Left>
						<Button transparent onPress={() => Actions.sideBar()}>
							<Icon name="menu"/>
						</Button>
					</Left>
				);
			else
				left = (
					<Left>
						<Button transparent onPress={() => Actions.pop()}>
							<Icon name="arrow-back"/>
						</Button>
					</Left>
				);

		}

		if (!center) {
			if (title)
				center = (
					<Body>
					<Title >{title}</Title>
					</Body>
				)
		}

		if (!right) {
			right = <Right/>;
		}

		return (
			<Header style={{backgroundColor:'transparent'}}>
				{left}
				{center}
				{right}
			</Header>
		)

	}
}


Header_.propTypes = {
	back: React.PropTypes.bool,// 返回按钮
	menu: React.PropTypes.bool, // 有菜单按钮
	title: React.PropTypes.string, // 标题
	left: React.PropTypes.any, // left
	body: React.PropTypes.any, // body
	right: React.PropTypes.any, // right
}

Header_.defaultProps = {
	back: false,
	menu: false,
	title: '',
	left: null,
	body: null,
	right: null
}
