import React, {PureComponent} from "react";
import {TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";
import {Grid, Icon, Text} from "native-base";

/**
 * my grid menu
 */
export default class MyGrid extends PureComponent {

	render() {
		return (
			<Grid style={styles.grid}>
				{this.renderItem({
					icon: 'heart',
					iconColor: '#FE9429',
					text: '收藏',
					route: 'collection',
				})}
				{this.renderItem({
					icon: 'people',
					iconColor: '#2CCA73',
					text: '好友',
					route: 'friend',
				})}
				{this.renderItem({
					icon: 'ios-settings',
					iconColor: '#FB565A',
					text: '设置',
					route: 'settings',
				})}
			</Grid>
		)
	}


	renderItem(item) {
		let iconStyle = {fontSize: 32, color: item.iconColor};
		return (
			<TouchableOpacity
				key={item.text}
				style={styles.col}
				onPress={()=> Actions[item.route]()}
			>
				<Icon name={item.icon} style={iconStyle}/>
				<Text>{item.text}</Text>
			</TouchableOpacity>
		)
	}

	shouldComponentUpdate() {
		return false
	}
}

const styles = {
	grid: {
		backgroundColor: '#fff',
		height: 80
	},
	col: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	}
}