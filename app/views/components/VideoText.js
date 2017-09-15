import React, {PureComponent} from "react";
import {Text} from "native-base";
import {View, Image, TouchableOpacity, TouchableHighlight, Dimensions, Modal,Slider} from "react-native";
import Video from "react-native-video";
/**
 * 播放器
 */


class VideoText extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			btn: true,
			cc: require('../../assets/play.png'),
            sliderValue:0,  //Slide的value
            file_duration:this.props.time, //歌曲长度
            currentTime:0,  //当前时间
            duration:0,  //歌曲时间
		}
	}

	render() {
		let {title,content,video,basis} = this.props;
		return (
					<View style={styles.View}>
						<Image source={require('../../assets/videoBj1.png')} style={styles.bj}>
							<View style={{flexDirection: 'column',justifyContent: 'center',alignItems: 'center',flex:1}}>
								<View style={styles.tran}><Text style={styles.title}>{title}</Text></View>
								<View style={styles.tran}><Text style={styles.content}>{content}</Text></View>
								<View style={styles.btn}>
									<TouchableOpacity onPress={this._btn.bind(this)}>
										<View style={{width: 50, height: 50,justifyContent:'center',alignItems:'center'}}>
											<Image source={this.state.cc} style={{width: 50, height: 50,resizeMode:'contain'}}></Image>
										</View>
									</TouchableOpacity>
								</View>
								<View style={styles.tran}><Text>{this.formatTime(Math.floor(this.state.currentTime))} - {this.formatTime(Math.floor(this.state.file_duration))}</Text></View>
								<Slider
									style={{ width:theme.deviceWidth*0.7,marginLeft: 10, marginRight: 10}}
									value={this.state.sliderValue}
									maximumValue={this.state.file_duration}
									step={1}
									minimumTrackTintColor='#FFDB42'
									onValueChange={(value) => {
                                        this.setState({
                                            currentTime:value
                                        })
                                    }
                                    }
									onSlidingComplete={(value) => {
                                        this.refs.video.seek(value)
                                    }}
								/>


								<View style={[styles.basisBox,styles.tran]}>
									<Text  style={styles.basis}>{basis}</Text>
								</View>
							<Video
								ref='video'
								source={{uri: urls.getImage(video)}} // 视频的URL地址，或者本地地址，都可以.
								rate={1.0}                   // 控制暂停/播放，0 代表暂停paused, 1代表播放normal.
								volume={1.0}                 // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
								muted={false}                // true代表静音，默认为false.
								resizeMode="cover"           // 视频的自适应伸缩铺放行为，
								repeat={false}                // 是否重复播放
								playInBackground={true}     // 当app转到后台运行的时候，播放是否暂停
								playWhenInactive={false}     // [iOS] Video continues to play when control or notification center are shown. 仅适用于IOS
								onLoadStart={this.loadStart} // 当视频开始加载时的回调函数
								onLoad={(data)=>this.onLoad}    // 当视频加载完毕时的回调函数
								onProgress={(e) => this.onProgress(e)}    //  进度控制，每250ms调用一次，以获取视频播放的进度
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
    onProgress (data){
        let val = parseInt(data.currentTime);
        this.setState({
            sliderValue: val,
            currentTime: data.currentTime
        })
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
    //把秒数转换为时间类型
    formatTime(time) {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second : '0' + second
        return min + ':' + second
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
		backgroundColor:'transparent'
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
        width:'70%',
        paddingLeft:10,
        paddingRight:10,
		textAlign: 'center',
		fontSize: theme.DefaultFontSize + 2,
		lineHeight: 28,
	},
	basis: {
		fontSize: theme.DefaultFontSize,
		lineHeight: 28,
	},
	btn: {
		marginTop: 30,
		marginBottom: 30
	},
	tran:{
		backgroundColor:'transparent'
	}
};
VideoText.propsTypes = {
	title: React.PropTypes.string,
	content: React.PropTypes.string,
	video: React.PropTypes.string,
	basis: React.PropTypes.string,
}
export default (VideoText);


