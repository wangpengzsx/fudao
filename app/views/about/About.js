import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {observer} from "mobx-react/native";
import {Image} from "react-native";
import {View, Text, Row, Thumbnail, Col, Button} from "native-base";
import {Container, Content, Header} from "../../components/index";

/**
 * 关于福道
 */
@observer
export default class About extends PureComponent {
	render() {
		return (
			<Container>
				<Header {...this.props}/>
				<Content padder white>
					<View style={styles.title}>
						<Image  source={require('../../assets/logo-png.png')} style={styles.logo}/>
						<Text style={styles.titleText}>{config.appName}</Text>
						<Text>{config.versionName}</Text>
					</View>
					<View>
						<Text style={styles.desc}>
							&nbsp;&nbsp;&nbsp;&nbsp;
							&nbsp;&nbsp;&nbsp;&nbsp;
							福道健康环是以个人为中心的健康习惯培养APP。帮助您及时了解您的健康状态，发现和解决您的健康问题，全程记录和预估您的变化过程，配以完善的线下服务体系，为您打造基于您个人的全方位健康生态。
						</Text>
					</View>
					<View>
						<Text style={styles.bold}>关注我们</Text>
					</View>
					<View>
						<Text>官方网站：www.infcn.com.cn</Text>
					</View>
					<View>
						<Text>微信公众号：infcn430374</Text>
					</View>
					<View>
						<Text style={styles.bold}>联系我们</Text>
					</View>
					<View>
						<Text>商务合作：fudao@infcn.com.cn</Text>
					</View>
					<Row style={{marginTop: 30}}>
						<Col style={styles.center}>
							<Button onPress={()=> Actions.privacyStatement()}><Text>隐私声明</Text></Button>
						</Col>
						<Col style={styles.center}>
							<Button onPress={()=> Actions.userAgreement()}><Text>用户协议</Text></Button>
						</Col>
					</Row>
				</Content>
			</Container>
		);
	}
}

const styles = {
	title: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleText: {
		fontSize: 28
	},
	desc: {
		lineHeight: 24
	},
	bold: {
		fontWeight: 'bold',
		marginTop: 10,
		marginBottom: 10
	},
	center: {
		flexDirection: "row",
		justifyContent: 'center',
	},
	logo:{
		height:60,
		width:200,
		resizeMode:'contain',
		marginBottom:20,
	}
};