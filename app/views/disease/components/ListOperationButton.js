import React, {PureComponent} from "react";
import {Icon} from "native-base";
import {View, Image, ToastAndroid, DeviceEventEmitter, TouchableHighlight} from "react-native";

/**
 * 列表操作按钮
 */
export default class ListOperationButton extends PureComponent {

	static propTypes = {
		color: React.PropTypes.string,
		iconName: React.PropTypes.string,
	}

	static defaultProps = {
		color: '#FFFFFF',
		iconName: 'add',
	}

	render() {
		let {color, iconName} = this.props,
			iconBorderStyle = {...styles.iconBorder},
			iconStyle = {...styles.icon};
		iconStyle.color = color;
		iconBorderStyle.borderColor = color;
		return (
			<TouchableHighlight
				underlayColor='#fafafa'
				onPress={this.props.onPress}
			>
				<View style={iconBorderStyle}>
					<Icon name={iconName} style={iconStyle}/>
				</View>
			</TouchableHighlight>
		)
	}
}

const styles = {
	iconBorder: {
		borderWidth: 1,
		paddingLeft: 0,
		paddingRight: 0,
		opacity: 0.8,
	},
	icon: {
		fontSize: 18,
		height: 18,
		paddingLeft: 0,
		paddingRight: 0,
		paddingTop: 0,
		paddingBottom: 0,
		marginLeft: 3,
		marginRight: 3,
		marginTop: 0,
		marginBottom: 0
	}
};