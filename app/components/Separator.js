import React, {Component} from "react";
import {Left, Right, Body, View, Text} from "native-base";

class Separator extends Component {

	render() {
		let {bgColor, bordered, noTopBorder, noBottomBorder, height, flex, title, fontSize} = this.props;
		let style = {}, textStyle = {};

		if (bgColor) {
			style.backgroundColor = bgColor;
		}

		if (bordered) {
			style.borderTopWidth = theme.borderWidth;
			style.borderTopColor = theme.listBorderColor;
			style.borderBottomWidth = theme.borderWidth;
			style.borderBottomColor = theme.listBorderColor;
		}

		if (noTopBorder) {
			style.borderTopWidth = 0;
		}

		if (noBottomBorder) {
			style.borderBottomWidth = 0;
		}

		if (height) {
			style.height = height;
		}

		if (title) {
			style.paddingLeft = 18;
			style.justifyContent = 'center';
			style.height = 30;
		}

		if (fontSize) {
			textStyle.fontSize = fontSize;
		}

		if (flex) {
			style.height = undefined;
			style.flex = 1;
		}


		return (
			<View style={style}>
				<Text style={textStyle}>{title}</Text>
			</View>
		)
	}

	shouldComponentUpdate() {
		return false
	}
}

Separator.propTypes = {
	bgColor: React.PropTypes.string,
	bordered: React.PropTypes.bool,
	noTopBorder: React.PropTypes.bool,
	noBottomBorder: React.PropTypes.bool,
	height: React.PropTypes.number,
	title: React.PropTypes.string,
	fontSize: React.PropTypes.number,
	flex: React.PropTypes.number,
}

Separator.defaultProps = {
	bgColor: theme.contentBgColor,
	bordered: false,
	noTopBorder: false,
	noBottomBorder: false,
	height: 15,
	title: '',
	fontSize: 12,
	flex: undefined,
}

export default (Separator)