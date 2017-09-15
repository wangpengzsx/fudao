import React, {PureComponent} from "react";
import {Actions,ActionConst} from "react-native-router-flux";
import {observer} from "mobx-react/native";
import {Text, Thumbnail, Col, Button,Item,Label,Input,Form} from "native-base";
import {Header,Content, Container} from "../../components/index";
import {View, Alert,TextInput,ToastAndroid} from "react-native";
import  CommitButton from "./components/CommitButton"
import  {hex_md5} from "./components/md5"
import UserStore from "../../mobx/userStore";
/**
 * 设置密码成功
 */
@observer
export default class SetPassword extends PureComponent {
    constructor(props){
        super(props);
        this.state={
            number:'3',
            text:this.props.text,
            phone:this.props.phone,
            password:this.props.password,
        };
        this.interval();
    }
    render() {
        var title=(
            <Text style={styles.titleText}>{this.state.text}</Text>
        );

        return (
            <Content white>
                <View style={styles.container}>
                    <View style={styles.view}>
                        <Text style={styles.titleText}>恭喜你注册成功！</Text>
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
                    self._login(self.state.phone,self.state.password)
                }else{
                    number--;
                    self.setState({
                        number:number,
                    })
                }
            },1000)
    }
    _login(phone,password) {
        clearInterval(this.timer);
        Actions.startInformation({
            phone:this.state.phone,
            password:this.state.password,
        })
      /* UserStore.login(phone, password, () => {
            UserStore.fetchLoginUser();
        });*/
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







