import React, {PureComponent} from "react";
import {View, Image, TouchableHighlight,ScrollView,Platform,TouchableOpacity} from "react-native";
import {Text,Button,Icon} from "native-base";
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view";
import {Modal} from "../../../components/index";
import ImageSolve from "./ImageSolve";
import VideoSolve from "./VideoSolve";
import TextSolve from "./TextSolve";

/**
 * 情绪干预， 弹出
 */

export default class EmotionSolveModal extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			emotion: null,
			stop:true,
			Threeflag:true,
		};
	}

	render() {
		let {visible, emotion,Threeflag}=this.state;
		let threeText=(null);
		if(emotion){
			if(Threeflag){
				threeText=(
					<TouchableOpacity onPress={()=>this.setState({Threeflag:!Threeflag})} style={{width:theme.deviceWidth*0.9-95,paddingRight:10,justifyContent:'center',alignItems:'center'}}>
						<View style={{justifyContent:'center',alignItems:'center'}}>
							<Text style={{fontWeight:"bold",marginBottom:5,fontSize: theme.DefaultFontSize+4,color:'#fff'}}>{emotion.threeCharacterClassic.substring(0,8) }</Text>
							<Text style={{fontWeight:"bold",fontSize: theme.DefaultFontSize+4,color:'#fff'}}>{emotion.threeCharacterClassic.substring(8,16)}</Text>
						</View>
					</TouchableOpacity>

				)
			}else{
				threeText=(
					<TouchableOpacity onPress={()=>this.setState({Threeflag:!Threeflag})} style={{width:theme.deviceWidth*0.9-100,paddingRight:10,justifyContent:'center',alignItems:'center'}}>
						<View>
							<Text style={{marginBottom:5,fontSize: theme.DefaultFontSize-2,color:'#fff',lineHeight:24}}>{'\t\t'+emotion.influence}</Text>
						</View>
					</TouchableOpacity>
				)
			}
		}

		return (
			<Modal ref={(e)=>this._modal = e} visible={visible} transparent>
				{emotion && <View style={styles.container}>
					<View style={styles.header_close}>
						<View style={{width:25}}>
							<Button transparent
									onPress={() => this.hide()}
									style={styles.closeButton}>
								<Icon name="close" style={{color:'#FFF', fontSize: 20}}/>
							</Button>
						</View>
					</View>
					<View style={styles.View}>
						<View style={styles.emotionBox}>
							<Image source={emotion.img} style={{width:50,height:60}}/>
							<Text style={{color:'#fff'}}>{emotion.title}</Text>
						</View>
						{threeText}
					</View>
					<View style={styles.imgViewBox}>
						<ScrollableTabView
							tabBarPosition='top'
							renderTabBar={() => (
								<DefaultTabBar
									activeTextColor={theme.navTabBarActiveTextColor}
									underlineStyle={{backgroundColor: theme.navTabBarActiveTextColor}}/>
							)}
							onChangeTab={(obj) => {this._indexChange(obj)}}
						>
							{emotion.methods.map((item, index) => this.renderSolve(item, index))}
						</ScrollableTabView>
					</View>
				</View>}
			</Modal>
		)
	}
	_indexChange(obj){
		for(var i=0;i<3;i++){
			if(this.refs["video"+i])
				this.refs["video"+i].close();
		}
	}
	renderSolve(item, index) {
		if(this.state.emotion.methods.length==1){
			if (item.type == 1) {
				return (
					<ImageSolve key={index}  tabLabel={item.title}  title={''} content={item.content}
								img={item.img}/>
				)
			} else if (item.type == 2) {
				return (
					<TextSolve key={index} tabLabel={item.title}  title={''} content={item.content}/>
				)
			} else if (item.type == 3) {
				var str = "video"+index;
				return (
					<VideoSolve key={index}  tabLabel={item.title} index={index}  title={item.title} content={item.content} time={item.length}
								video={item.img} ref= {str}/>
				)
			}
		}else{
			if (item.type == 1) {
				return (
					<ImageSolve key={index} tabLabel={"第"+item.fenji} title={item.title} content={item.content}
								img={item.img}/>
				)
			} else if (item.type == 2) {
				return (
					<TextSolve key={index} tabLabel={"第"+item.fenji} title={item.title} content={item.content}/>
				)
			} else if (item.type == 3) {
				var str = "video"+index;
                // alert(JSON.stringify(item))
                return (
					<VideoSolve key={index}  index={index} tabLabel={"第"+item.fenji} title={item.title} content={item.content} time={item.length}
								video={item.img} ref= {str}/>
				)
			}
		}

	}


	show(emotion) {
		this.setState({
			visible: true,
			emotion
		})
	}

	hide() {
		this.setState({
			visible: false,
			emotion: null,
            Threeflag:true,
		})
	}
}

const styles = {
	container: {
		backgroundColor: 'rgba(255,255,255,0.3)',
	},
	View: {
		width: theme.deviceWidth * 0.9,
		height: 160,
		flexDirection: 'row',
		backgroundColor: '#69769C'
	},
	imgViewBox: {
		width: theme.deviceWidth * 0.9,
		height: theme.deviceHeight - 220,
		backgroundColor: '#fff',
	},
	emotionBox: {
		width: 90,
		justifyContent: 'center',
		alignItems: 'center'
	},
	tabView: {
		flex: 1,
		flexGrow: 1,
	},
	title: {
		textAlign: 'center',
		fontSize: theme.DefaultFontSize + 6,
		marginBottom: 60,
	},
	content: {
		textAlign: 'center',
		fontSize: theme.DefaultFontSize + 2,
		marginLeft: 30,
		marginRight: 30,
		lineHeight: 28,
	},
	image: {
		marginTop: 20,
		width: 250,
		height: 200,
		justifyContent: 'center',
	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	closeButton: {
		backgroundColor: '#C8C8C8',
		justifyContent: 'center',
		borderRadius: 12,
		width: 24,
		height: 24,
		paddingLeft: 0,
		paddingRight: 0,
	},
	header_close: {
		position:'absolute',
		top:8,
		right:8,
		// paddingLeft: 10,
		// paddingTop: 8,
		// // paddingBottom: 10,
		// paddingRight: 6,
		flexDirection: 'row',
		justifyContent:'flex-end',
		zIndex:99
	},
};


