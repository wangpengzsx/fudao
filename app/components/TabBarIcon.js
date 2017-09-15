import React, {PureComponent} from "react";
import {StyleSheet, View} from "react-native";
import {Icon, Text} from "native-base";
import {theme} from "../utils/";

class TabBarIcon extends PureComponent {
	render() {
		let {selected, title, iconName, selectedIconName} = this.props,
			colorStyle = {color: theme.navTabBarTextColor};

		if (selected) {
			iconName = selectedIconName;
			colorStyle = {color: theme.navTabBarActiveTextColor};
		}
		return (
			<View style={ {alignItems: 'center', justifyContent: 'center'}}>
				<Icon name={iconName} size={25} style={colorStyle}/>
				<Text style={colorStyle}>{title}</Text>
			</View>
		)
	}
}

export default (TabBarIcon)