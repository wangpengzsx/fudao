import React, {PureComponent} from "react";
import {Actions,ActionConst} from "react-native-router-flux";
import { Text, Button} from "native-base";
import {View,TextInput,ToastAndroid} from "react-native";
import {Header,Container,Content} from "../../components/index";
import  CommitButton from "./components/CommitButton"
import  UserInput from "./components/UserInput"
import  {hex_md5} from "./components/md5";
import {checkPwd} from "./components/public";



/**
 * 设置密码
 */
const dismissKeyboard = require('dismissKeyboard');
export default class SetPassword extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            password:'',
            password1:'',
        }
    }
    render() {
        return (
            <Container>
                <Header {...this.props}></Header>
                <Content white>
                    <View style={styles.bag}>
                        <UserInput text="设置密码" placeholder={"6-12位密码"}  secureTextEntry={true}  value={this.state.password}
                                   onChangeText={(value)=>{
                                       this.setState({
                                           password:value
                                       })
                                   }}/>
                        <UserInput text="重复密码" placeholder={"6-12位密码"}  secureTextEntry={true} value={this.state.password1}
                                   onChangeText={(value)=>{
                                       this.setState({
                                           password1:value
                                       })
                                   }}/>
                        <CommitButton  border={false} block={true}  top={20} title="提交" onPress={this._yzPassword.bind(this)}/>
                    </View>

                </Content>
            </Container>
        );
    }
    _yzPassword(){
        let {password,password1} = this.state;
        let {phone} = this.props;
        if(password==""&& password==""){
            tools.showToast("请设置密码");
        }else if(password1!=password){
            tools.showToast("两次输入密码不一致");
            this.setState({
                password1:''
            })
        }else if(!checkPwd(password)){
            tools.showToast("6-12密码！");
        }else{
            //关闭软键盘
            dismissKeyboard();
           /* const {dispatch} = this.props;*/
            request.getJson(urls.apis.USER_REGISTER,{
                phone: phone,
                password: password
            }).then((data)=>{
                /*dispatch(hideLoading());*/
                    if(data.ok) {
                        this.timerOut = setTimeout(function() {
                           Actions['passwordSuccess']({phone:phone,password:password})
                        }, 1000);
                    }else{
                        tools.showToast("注册失败");
                    }
                },(error)=>{

                })
        }


    }

    componentWillUnmount(){
        this.timerOut&&clearTimeout(this.timerOut)
    }
}
const styles={
    bag:{
        padding:10,
    },
}





