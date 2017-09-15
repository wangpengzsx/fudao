//noinspection JSAnnotator
import React, {PureComponent} from "react";
import {Text, Button} from "native-base";
import {View, Image, DeviceEventEmitter, TouchableHighlight} from "react-native";
import {Actions} from "react-native-router-flux";

/**
 * 我的情绪
 */
export default  class MyEnter extends PureComponent {
	constructor(props) {
		super(props);
	}


	render() {
		let itemStyle = Object.assign({}, styles.button, styles.mgl);
		return (
			<View>
				<View style={styles.View}>
					<Button style={styles.button} transparent onPress={()=>Actions.diagnosis()}>
						<Image source={require('../../../assets/disease/zicha.png')} style={styles.image}/>
					</Button>
				</View>
				<View style={styles.View}>
					<Button style={itemStyle} transparent onPress={()=>Actions.disease({title: '自疗'})}>
						<Image source={require('../../../assets/disease/ziliao.png')} style={styles.image}/>
					</Button>
					<Button style={itemStyle} transparent onPress={()=>Actions.health({title: '自养'})}>
						<Image source={require('../../../assets/disease/ziyang.png')} style={styles.image}/>
					</Button>
					<Button style={itemStyle} transparent onPress={()=>Actions.expect({title: '自修'})}>
						<Image source={require('../../../assets/disease/zixiu.png')} style={styles.image}/>
					</Button>
				</View>
			</View>

		)
	}

}

const styles = {
	zi:{
		color:'#f0c728'
	},
	View: {
		flexDirection: 'row',
		marginTop: 1

	},
	button: {
		flexDirection: 'row',
		height: 50,
		justifyContent: 'center',
		flex: 1,
		alignSelf: 'stretch',
		backgroundColor: 'rgba(255, 255, 255, 0.3)',


	},
	mgl: {
		marginLeft: 1
	},
	mgl10: {
		marginLeft: 6
	},
	text: {
		color: '#fff'
	},
	badge: {
		backgroundColor: '#AED9E5',
		paddingTop: 6,
		paddingBottom: 6,
		paddingLeft: 6,
		paddingRight: 6,
		borderRadius: 48,
	},
	image: {
		width: 60,
		height: 40,
	},
	color2: {
		backgroundColor: '#E5B2A8',
	},
	color3: {
		backgroundColor: '#D5E1AF',
	},
	color4: {
		backgroundColor: '#CABBD3',
	},
};
function bindAction(dispatch) {
	return {};
}
