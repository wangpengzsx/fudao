import React, {PureComponent} from "react";
import {Actions, ActionConst} from "react-native-router-flux";
import {observer} from "mobx-react/native";
import {Text} from "native-base";
import {Container} from "../../components/index";
import {View, Image,TouchableOpacity} from "react-native";
import CommitBtn from "./components/commitBtn";
import UserStore from "../../mobx/userStore";

/**
 * 启始页
 */
@observer
export default class Start extends PureComponent {

	render() {
		return (
			<Container>
					<Image source={require('./assets/launch_screen.png')} style={styles.img}>
						<View style={styles.viewButton}>
							<TouchableOpacity style={styles.btn} onPress={()=>Actions['register']()}>
								<Text style={styles.text}>注册</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.btn}  onPress={()=>Actions['login']()}>
								<Text style={styles.text}>登录</Text>
							</TouchableOpacity>
						</View>
					</Image>
			</Container>
		)
	}

	componentWillMount() {
		if (UserStore.isLogin) {
			if(UserStore.loginUser.sex){
				Actions.index({
					type: ActionConst.REPLACE
				});
			}
		}
	}

}
const styles = {
	img: {
		width: theme.deviceWidth+4,
		height: theme.deviceHeight,
		alignItems:'center',
	},
	viewButton: {
		marginTop:120,
		width:theme.deviceWidth*0.8,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems:'center'
	},
	btn:{
		width:100,
		height:40,
		backgroundColor:'rgba(255,255,255,0.24)',
		justifyContent:'center',
		alignItems:'center'
	},
	text:{
		color:'#fff',
		fontSize:theme.DefaultFontSize+2
	}
};
