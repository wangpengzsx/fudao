import React, {PureComponent} from "react";
import {Text, Button} from "native-base";
import {Actions} from "react-native-router-flux";
import {View, Image, ToastAndroid, DeviceEventEmitter, TouchableHighlight,Platform} from "react-native";

/**
 * 我的问题列表组件
 */
export default class RelatedProductsAndServices extends PureComponent {

	static propTypes = {
		data: React.PropTypes.array,
	}

	static defaultProps = {
		data: [],
	}

	render() {
		let {data} = this.props;
		if(Platform.OS=='ios' || Platform.OS=='android'){
			return null;
		}
		return  (
			<View>
				<View style={styles.titleView}>
					<Text style={styles.titleText}>相关产品和服务</Text>
				</View>
				<View style={styles.productsView}>
					<View style={styles.productView0}>
						<View style={styles.imageView}>
							<Image source={require('../assets/img1.jpg')} style={styles.image}/>
						</View>
						<View style={{flex:1}}>
							<Text>隔水炖养生壶全自动加璃家...</Text>
						</View>
					</View>
					<View style={styles.productView1}>
						<View style={styles.imageView}>
							<Image source={require('../assets/img2.jpg')} style={styles.image}/>
						</View>
						<View style={{flex:1}}>
							<Text>隔水炖养生壶全自动加厚玻...</Text>
						</View>
					</View>
				</View>
				<View style={styles.buttonView}>
					<Button block onPress={()=>Actions.shop()}>
						<Text>更多养生产品</Text>
					</Button>
				</View>
			</View>
		)
	}
}

const styles = {
	titleView: {
		paddingLeft: 10, paddingRight: 10, paddingTop: 20
	},
	titleText: {
		fontSize: theme.fontSizeH4
	},
	buttonView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 10,
		paddingBottom: 30
	},
	productsView: {
		flexDirection: 'row', padding: 10
	},
	productView0: {
		flexDirection: 'row', flex: 1
	},
	productView1: {
		flexDirection: 'row', flex: 1, paddingLeft: 10
	},
	imageView: {
		width: 60, alignItems: 'center', justifyContent: 'center'
	},
	image: {
		width: 50, height: 50
	}
};
