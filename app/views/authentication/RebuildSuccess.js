import React, {PureComponent} from "react";
import {Actions,ActionConst} from "react-native-router-flux";
import {observer} from "mobx-react/native";
import {Container,Content} from "../../components/index";
import {Text, Thumbnail, Col, Button,Item,Label,Input,Form} from "native-base";
import {View, Alert,TextInput,ToastAndroid} from "react-native";
import  CommitButton from "./components/CommitButton";
import  {hex_md5} from "./components/md5";
import UserStore from "../../mobx/userStore";
/**
 * 设置密码
 */
@observer
export default class RebuildSuccess extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            number:'3',
            text:this.props.text,
            phone:this.props.phone,
            password:this.props.password,
        }
        this.interval();
    }
    render() {
        var title=(
            <Text style={styles.titleText}>{this.state.text}</Text>
        );
        return (
            <Content white >
                <View style={styles.container}>
                    <View style={styles.view}>
                        <Text style={styles.titleText}>密码设置成功！</Text>
                        <Text style={{textAlign:'center',marginTop:120}}>{this.state.number}s后自动登录...</Text>
                        <CommitButton title="登录" block={true} border={false} top={20}  onPress={this._login.bind(this,this.state.phone,this.state.password)} />
                    </View>
                </View>

            </Content>
        );
    }
    interval(){
        let self=this;
        let {number} = self.state;
        self.timer=setInterval(function(){
            if(number==0){
                self._login(self.state.phone,self.state.password);
            }else{
                number--;
                self.setState({
                    number:number,
                })
            }
        },1000)
    }
    _login(phone,password){
        clearInterval(this.timer);
        UserStore.login(phone, password, () => {
            UserStore.fetchLoginUser();
            // 跳到首页
        });
    }
}
const styles = {
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },

    view:{
        width:300,
        height:300,
    },
    titleText:{
        textAlign:'center',
        fontSize: theme.DefaultFontSize+8
    },
};








