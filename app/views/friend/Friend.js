import React, {PureComponent} from "react";
import {ScrollView, View, ToastAndroid, TouchableWithoutFeedback, Modal, ListView, Image} from "react-native";
import {observer} from "mobx-react/native";
import {Actions} from "react-native-router-flux";
import {Container, Content, Header, List, PullView, Loading} from "../../components/index";
import {Left, Body, Right, ListItem, Button, Icon, Text} from "native-base";
import FriendList from "./components/FriendList";
import friendStore from "../../mobx/friendStore";

/*import {fetchMyFriendList} from "../../actions/friend";
 import {toast} from "../../utils/index";*/

/**
 * 好友列表
 */
@observer
export default class Friend extends PureComponent {
    state = {
        visible: false,
    }

    componentDidMount() {
        friendStore.fetchMyFriendList();
    }

    render() {
        let {visible} = this.state;
        const {isFetching, MyFriendList} = friendStore;
        return (
            <Container>
                <Header {...this.props} right={
                    <Right>
                        <Button transparent onPress={()=>this.show()}><Icon name="add"/></Button>
                    </Right>
                }/>
                <Content gray delay>
                    <Modal
                        animationType={'fade'}
                        transparent={true}
                        visible={visible}
                        onRequestClose={() => this.hide()}
                        style={{backgroundColor: "rgba(0,0,0,.0)"}}
                    >
                        <TouchableWithoutFeedback onPressIn={() => this.hide()} delayPressIn={0}
                                                  style={{backgroundColor: "rgba(0,0,0,.0)"}}>
                            <View style={styles.opacityView}>
                                <View style={{
                                    width: 0,
                                    height: 0,
                                    marginBottom: -12,
                                    borderLeftWidth: 6,
                                    borderLeftColor: 'transparent',
                                    borderRightWidth: 6,
                                    borderRightColor: 'transparent',
                                    borderBottomWidth: 12,
                                    borderBottomColor: '#3b3f48',
                                    position: 'absolute',
                                    top: 48,
                                    right: 20
                                }}>
                                </View>
                                <View style={{
                                    width: 150,
                                    height: 96,
                                    backgroundColor: '#3b3f48',
                                    position: 'absolute',
                                    top: 60,
                                    right: 10,
                                    borderRadius: 3
                                }}>


                                    <ListItem onPress={()=>this.phone()}>
                                        <Left>
                                            <Icon name={'md-create'} style={{color: "#fff"}}/>
                                            <Text style={{color: "#fff"}}>输入手机号</Text>
                                        </Left>
                                    </ListItem>
                                    <ListItem onPress={()=>this.scanner()}>
                                        <Left>
                                            <Icon name={'md-expand'} style={{color: "#fff"}}/>
                                            <Text style={{color: "#fff"}}>扫一扫</Text>
                                        </Left>

                                    </ListItem>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                    </Modal>

                    <PullView isRefreshing={false} onRefresh={this._onRefresh.bind(this)}>
                        <List>
                            <ListItem icon last style={{height: 55,borderBottomWidth:0}} onPress={() => Actions.newFriend()}>
                                <Left>
                                    <View style={styles.iconView}>
                                        <Icon name="person-add" style={styles.icon}/>
                                    </View>
                                </Left>
                                <Body>
                                <Text>新朋友</Text>
                                </Body>
                                <Right>
                                </Right>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem icon last style={{height: 55,borderBottomWidth:0}} onPress={() => Actions.qrcode()}>
                                <Body>
                                <Text>我的二维码</Text>
                                </Body>
                                <Right style={{justifyContent: 'center'}}>
                                    <Image source={require('./components/assets/qrcode.png')}
                                           style={{width: 20, height: 20, marginTop: 3}}/>
                                    <Icon name="ios-arrow-forward"/>
                                </Right>
                            </ListItem>
                        </List>
                        <FriendList list={MyFriendList}/>
                    </PullView>


                </Content>
            </Container>
        )
    }

    phone() {
        Actions.searchUser()
        this.hide();
    }

    scanner() {
        Actions.barcodescanner()
        this.hide();
    }


    _onRefresh() {
        friendStore.fetchMyFriendList();
        ToastAndroid.show('刷新成功', ToastAndroid.SHORT);
    }

    show() {
        this.setState({
            visible: true,
        })
    }

    /**
     * 关闭对话框
     */
    hide() {
        this.setState({
            visible: false
        })
    }

}

const styles = {
    iconView: {
        backgroundColor: '#F99D3A',
        marginLeft: 0,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        fontSize: 24,
        color: '#FFFFFF'
    },
    opacityView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,.0)"
    }
}

const mapStateToProps = state => ({
    loginUser: state.user.loginUser,
    ...state.friend,
});
