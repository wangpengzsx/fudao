
//noinspection JSAnnotator
'use strict';
import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {Container, Title, Content, Left, Right, Body, Form, Input, Item,Thumbnail,Button,Text} from "native-base";
import {View,TextInput} from "react-native";
import  CommitButton from "./CommitButton";




/**
 *用户输入框
 */
class UrseInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            text:this.props.text,
        }
    }
    render() {
        var secureTextEntry=false
        var key='default';
        if(this.state.text=="手机号"||this.state.text=="验证码"||this.state.text=="用户名"){
          key='numeric'
        }

        return (
            <View style={styles.box}>
                <View style={styles.border}>
                    <Text>{this.props.text}</Text>
                </View>
                <TextInput style={{flex:1}} underlineColorAndroid='transparent' placeholder={this.props.placeholder} keyboardType={key} secureTextEntry={this.props.secureTextEntry} value={this.props.value}
                           onChangeText={this.props.onChangeText}
                ></TextInput>
            </View>




        )
    }

}
const styles = {
    box:{
        height:46,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor:'#D4D4D4',
        borderBottomWidth:1,

    },
    border:{
        width:80,
        flexDirection:'row',
        justifyContent:'center',
        borderRightWidth:1,
        borderRightColor:"#D4D4D4",

    },

};
export default UrseInput
