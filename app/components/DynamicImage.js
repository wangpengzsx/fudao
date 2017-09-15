import React, {Component} from "react";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";

import {View,TouchableHighlight,Image,} from "react-native";
import {request, urls} from "../utils/";

/**
* 动态
*/
class DynamicImage extends Component {
  constructor(props) {
    super(props);
  }



  render(){
    if(this.props.urls) {
      var arr_pic = this.props.urls.split(',');
      let pic = arr_pic.map((p, i) => {
        // if(p=="还未处理"){
        //   return ( null );
        // }
        return (
          <TouchableHighlight key={i} onPress={()=> Actions['picture']({image:this.props.urls,i:i})} style={styles.imageTouch}>
          <Image source={{uri: urls.getImage(p,600,600)}} style={styles.msgImage}  resizeMode= 'stretch' />
          </TouchableHighlight>
        )
      })
      return (
        <View style={styles.allImage}>
        {pic}
        </View>
      )
    }
    return ( null );

  }
}

const styles ={
  imageTouch:{
    marginRight:7,
    height: 120,
    width:78,
    height:78,
  },
  allImage:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  msgImage: {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    width:null,
    height:null,
  },
}


function bindAction(dispatch) {
  return {
  };
}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, bindAction)(DynamicImage);
