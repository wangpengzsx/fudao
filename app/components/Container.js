import React, {PureComponent} from "react";
import {StyleSheet, View, Image,Platform} from "react-native";

export default  class Container extends PureComponent {

	render() {
		let {children, isTabPanel} = this.props,
			width = theme.deviceWidth+3;
		if(Platform.OS=='ios'){
			var height = theme.deviceHeight;
		}else{
			var height = theme.deviceHeight - 20;
		}

		if (isTabPanel) {
			height -= theme.navTabBarHeight;
		}

		return (

			<Image source={require('../assets/bg/qing/1.jpg')}
				   style={{width,height,alignSelf: "stretch"}}>
				<Image source={require('../assets/bg/container.gif')}
					   style={{width,height,alignSelf: "stretch"}}>
					{children}
				</Image>
			</Image>
		)
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
		width:theme.deviceWidth+5,
		height:theme.deviceHeight
	}
})


