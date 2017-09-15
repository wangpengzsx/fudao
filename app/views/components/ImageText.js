import React, {PureComponent} from "react";
import {Modal, View, Image, TouchableHighlight,ScrollView} from "react-native";
import {Text} from "native-base";


/**
 * 图片展示组件
 */
class ImageText extends PureComponent {

	render() {
		let {title,content,img}=this.props;
		return (
			<View  style={styles.container}>
				<View style={{flexDirection: 'column'}}>
					<Text style={styles.title}>{title}</Text>
					<Image source={{uri: urls.getImage(img.split(';')[0])}} resizeMode='cover' style={styles.image}/>
					<View style={{height:theme.deviceHeight * 0.8-240}}>
						<ScrollView showsHorizontalScrollIndicator ={true}>
							<Text style={styles.content}>        {content}</Text>
						</ScrollView>
					</View>
				</View>
			</View>
		)
	}
}

const styles = {
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: theme.DefaultFontSize + 4,
	},
	content: {
		fontSize: theme.DefaultFontSize,
		marginLeft: 30,
		marginRight: 30,
		lineHeight: 28,
	},
	image: {
		margin: 20,
		width: theme.deviceWidth * 0.78,
		height: 180,
	},
	scrollV:{
		height:theme.deviceHeight * 0.8-240,
	}
};

ImageText.propsTypes = {
	fenji:React.PropTypes.string,
	title: React.PropTypes.string,
	content: React.PropTypes.string,
	img: React.PropTypes.string,
};

export default (ImageText);


