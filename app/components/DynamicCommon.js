import React, {Component} from "react";
import {Text} from "native-base";
import {connect} from "react-redux";
import {View,Image,TouchableHighlight} from "react-native";
import DynamicImage from './DynamicImage';
import {theme} from "../utils/";
import {Actions} from "react-native-router-flux";
import {skipToDetail} from '../actions/dynamic.js'
import {urls} from "../utils/index";

/**
 * 需添加参数info
 *info包含name，content，urls，photo
 */
class DynamicCommon extends Component {
	constructor(props){
		super(props);
	}

	render() {
    return (
      <View  style={styles.dynamicCommon}>
        <View>
          <Image source={{uri: urls.getImage(this.props.info.img,700,500)}}  style={styles.dynamicTouxiang}/>
        </View>
        <TouchableHighlight style={styles.dynamicDetail} underlayColor='#fafafa' onPress={this._skipToDetail.bind(this)}>
				<View>
						<Text style={styles.dynamicName}>{this.props.info.nick}</Text>
						<Text style={styles.dynamicContent}>{this.props.info.content}</Text>
						<DynamicImage urls={this.props.info.path}/>
				</View>
        </TouchableHighlight>
      </View>
    )
	}

	_skipToDetail(){
		const {dispatch} = this.props;
		dispatch(skipToDetail(this.props.info,this.props.newnew));
	}

}

const styles={
	dynamicCommon:{
		  flexDirection:'row',
	},
	dynamicDetail:{
		flex:1,
	},
	dynamicTouxiang:{
		width:40,
		height:40,
		marginRight:12,
	},
	dynamicName:{
		color:'#5E7192',
		fontSize:theme.DefaultFontSize,
	},
	dynamicContent:{
		marginTop:6,
		color:'#282828',
		fontSize:theme.DefaultFontSize,
	},
}

const mapStateToProps = state => ({
  userId:state.user.loginUser.appid,
});
export default connect(mapStateToProps)(DynamicCommon);
