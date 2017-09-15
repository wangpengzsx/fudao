/**
 * Created by Administrator on 2017/3/2.
 */
import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
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
export default class RebuildPassword extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            password:'',
            password1:'',
            phone:this.props.phone
        }
    }
    render() {
        return (
            <Container>
                <Header {...this.props}></Header>
                <Content white>
                    <View style={styles.bag}>
                        <UserInput text="新密码" placeholder={"6-12位密码"}  value={this.state.password} secureTextEntry={true}
                                   onChangeText={(value)=>{
                                       this.setState({
                                           password:value
                                       })
                                   }}/>
                        <UserInput text="重复密码" placeholder={"6-12位密码"}  value={this.state.password1} secureTextEntry={true}
                                   onChangeText={(value)=>{
                                       this.setState({
                                           password1:value
                                       })
                                   }}/>
                        <CommitButton  border={false} block={true} top={20} title="提交" onPress={this._yzPassword.bind(this)}/>
                    </View>

                </Content>
            </Container>
        );
    }
    _yzPassword(){
        let {phone,password,password1}= this.state;
        if(password==""&& password==""){
            tools.showToast("请设置密码");
        }else if(password1!=password){
            tools.showToast("两次输入密码不一致");
            this.setState({
                password1:''
            })
        }else if(!checkPwd(password)){
            tools.showToast("请填入6-12由字母或数字或下划线组成的密码！");
        }else{
            //关闭软键盘
            dismissKeyboard();
           /* dispatch(showLoading());*/
            request.getJson(urls.apis.USER_RESETPASSWORD,{
                phone: phone,
                password:password
            }).then((data)=>{
           /* dispatch(hideLoading());*/
            if(data.ok) {
                    Actions['rebuildSuccess']({phone:phone,password:password})
                }else{
                    tools.showToast("修改失败...");
                }
            },(error)=>{
              /*  dispatch(hideLoading());*/
            })
        }


    }
}
const styles={
    bag:{
        padding:10,
    }
}


/*const mapStateToProps = state => ({});*/




