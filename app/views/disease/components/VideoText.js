import React, {PureComponent} from "react";
import {Text} from "native-base";
import {View, Image, TouchableOpacity, TouchableHighlight, Dimensions, Modal} from "react-native";
import Video from "react-native-video";
/**
 * 播放器
 */


class VideoText extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			btn: false,
			cc: require('../../assets/stop.png')
		}
	}

	render() {
		let {title,content,video,basis} = this.props;
		return (
					<View style={styles.View}>
						<Image source={require('../../assets/videoBj1.png')} style={styles.bj}>
							<View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',flex:1}}>
								<Text style={styles.title}>{title}</Text>
								<Text style={styles.content}>{content}</Text>
								<View style={styles.btn}>
									<TouchableOpacity onPress={this._btn.bind(this)}>
										<View style={{width: 50, height: 50,justifyContent:'center',alignItems:'center'}}>
											<Image source={this.state.cc} style={{width: 50, height: 50,resizeMode:'contain'}}></Image>
										</View>
									</TouchableOpacity>
								</View>
								<View style={styles.basisBox}>
									<Text  style={styles.basis}>        {basis}</Text>
								</View>
							<Video
								source={{uri: urls.getImage('/high_quality_population/' + video)}} // 视频的URL地址，或者本地地址，都可以.
								rate={1.0}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
								volume={1.0}                 // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
								muted={false}                // true代表静音，默认为false.
								resizeMode="cover"           // 视频的自适应伸缩铺放行为，
								repeat={false}                // 是否重复播放
								playInBackground={false}     // 当app转到后台运行的时候，播放是否暂停
								playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
								onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
								onLoad={this.setDuration}    // 当视频加载完毕时的回调函数
								onProgress={this.setTime}    //  进度控制，每250ms调用一次，以获取视频播放的进度
								onEnd={this.onEnd}           // 当视频播放完毕后的回调函数
								onError={this.videoError}    // 当视频不能加载，或出错后的回调函数
								style={styles.backgroundVideo}
								paused={this.state.btn}               // true代表暂停，
							/>
							</View>
						</Image>
					</View>
		)
	}


	_btn() {
		let {btn}=this.state;
		if (this.state.btn) {
			this.setState({
				btn:!btn,
				cc: require('../../assets/stop.png')
			})

		} else {
			this.setState({
				btn:!btn,
				cc: require('../../assets/play.png')
			})
		}
	}
}

const styles = {
	View: {
		flex:1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30,

	},
	backgroundVideo: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		zIndex:-1,
	},
	bj: {
		resizeMode: 'contain'
	},
	left: {
		width: 100,
	},
	title: {
		textAlign: 'center',
		fontSize: theme.DefaultFontSize + 6,
		marginTop: 30,
		marginBottom: 30
	},
	content: {
		textAlign: 'center',
		fontSize: theme.DefaultFontSize + 2,
		lineHeight: 28,
	},
	basis: {
		fontSize: theme.DefaultFontSize,
		lineHeight: 28,
	},
	basisBox:{
		width:'70%',
		marginLeft:30,
  		marginRight:30,
	},
	btn: {
		marginTop: 30,
		marginBottom: 30
	}
};
VideoText.propsTypes = {
	title: React.PropTypes.string,
	content: React.PropTypes.string,
	video: React.PropTypes.string,
	basis: React.PropTypes.string,
}
export default (VideoText);


