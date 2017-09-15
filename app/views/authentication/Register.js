/**
 * Created by Administrator on 2017/3/1.
 */
import React, {PureComponent} from "react";
import {Actions, ActionConst} from "react-native-router-flux";
import {Text, Thumbnail, Col, Button,Item,Label,Input,Form} from "native-base";
import {View, Alert,TextInput,TouchableOpacity,ToastAndroid} from "react-native";
import {Header,Container,Content} from "../../components/index";
import  CommitButton from "./components/CommitButton";
import  UserInput from "./components/UserInput"
import {checkPhone} from "./components/public";
import  GetCode from "./components/GetCode";
import UserStore from "../../mobx/userStore";
/**
 * 注册
 */
const dismissKeyboard = require('dismissKeyboard');
export default class Register extends PureComponent {  // eslint-disable-line
    constructor(props){
        super(props);
        this.state={
            phone:'',
            code:'',
            title:this.props.title,
            text:this.props.text
        }
    }
    render() {
        return (
            <Container>
                <Header title={this.state.title}></Header>
                <Content white>
                    <View style={styles.bag}>
                        <UserInput text="手机号"
                                   onChangeText={(value)=>{
                                       this.setState({
                                           phone:value
                                       })
                                   }}/>
                        <View style={styles.box}>
                            <View style={styles.border}>
                                <Text>验证码</Text>
                            </View>
                            <TextInput style={{flex:1}} underlineColorAndroid='transparent' keyboardType='numeric' value={this.state.code}
                                       onChangeText={(value)=>{
                                           this.setState({
                                               code:value
                                           })
                                       }}
                            ></TextInput>
                            <GetCode  border={true} block={false}  title='获取验证码' ref={(e) => this._getGode = e}
                                      onPress={this._yzm.bind(this)} >
                            </GetCode >
                        </View>
                        <CommitButton title='注册' block={true} border={false} top={20}  onPress={this._zhuce.bind(this)} />
                        <TouchableOpacity onPress={()=> this.protocol()}>
                            <Text  style={styles.tiaokuan}>点击注册代表您已同意《福道健康使用协议和隐私条款》</Text>
                        </TouchableOpacity>
                    </View>

                </Content>
            </Container>
        );
    }
    _yzm(){
        let phone = this.state.phone;
        if(!checkPhone(phone)){
            tools.showToast("请填入正确的手机号");
        }else{
            request.getJson(urls.apis.USER_CHECKPHONEREGISTERED,{
                    phone:phone
                }).then((data)=>{
                    if(data.message!="用户已注册") {
                        this._getGode._click();
                        request.getJson(urls.apis.USER_SENDCODE,{
                            phone:phone ,
                        }).then((data)=>{
                        },(error)=>{
                        })
                    }else{
                        tools.showToast(data.message);
                    }
                },(error)=>{

                })
        }
    }
    _zhuce(){
        let {phone,code} = this.state;
       /* const {dispatch} = this.props;*/
        if(phone==""){
            tools.showToast("手机号不能为空");

        }else if(code==""){
            tools.showToast("验证码不能为空");
        }else{
            //关闭软键盘
            dismissKeyboard();
            /*接口*/
           /* dispatch(showLoading());*/
            request.getJson(urls.apis.USER_CHECKCODE,{
                phone: phone,
                code: code,
                }).then((data)=>{
                   /* dispatch(hideLoading());*/
                    if(data.ok) {
                        this._getGode.clearTimer();
                        Actions['setPassword']({
                            phone:phone,
                        });
                    } else {
                        tools.showToast("验证码错误...");
                        this.setState({
                            code:''
                        })
                    }
                },(error)=>{
                  /*  dispatch(hideLoading());*/
                })
        }
    }
    protocol() {
        Actions.userAgreement()
    }

}

const styles = {
    tiaokuan:{
        fontSize:theme.DefaultFontSize-4,
        textAlign:'center',
        marginTop:6,
        color:'#333'
    },
    box:{
        height:54,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        borderColor:'#D4D4D4',
        borderBottomWidth:1,
    },
    bag:{
        padding:10,
    },
    border:{
        width:80,
        flexDirection:'row',
        justifyContent:'center',
        borderRightWidth:1,
        borderRightColor:"#D4D4D4",

    },
};


