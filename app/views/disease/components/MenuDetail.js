import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {View,TouchableOpacity,TouchableHighlight,Alert,Image ,Modal,Dimensions ,ScrollView} from "react-native";
import {Text, Button} from "native-base";
import {Container, Content,Header} from "../../../components/index";
/**
 * 菜谱
 */


export default class MenuDetail extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            data:null,
        }
    }
    componentWillMount() {
        let {item}=this.props;
        request.getJson(urls.apis.COOKBOOK_GETCOOKBOOK, {
            name: item.name
        }).then((result) => {
            this.setState({
                data: result.obj,
            })
        }, (error) => {
        });
    }
    render() {
        let {data}=this.state;
        if(data){
            return (
                <Container>
                    <Header back title={data.name}></Header>
                    <Content>
                        <View style={styles.box1}>
                            <View style={styles.imgBox}>
                                <Image source={{uri: urls.getImage(data.img)}} style={styles.img}></Image>
                            </View>
                            <ScrollView style={styles.scrollView}>
                                <View style={{marginBottom:20}}>
                                    <View>
                                        <View style={styles.cpBar}>
                                            <Text>主料</Text>
                                        </View>
                                        <View style={styles.cp}>
                                            <Text>{data.main_ingredient}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={styles.cpBar}>
                                            <Text>辅料</Text>
                                        </View>
                                        <View style={styles.cp}>
                                            <Text>{data.auxiliary_ingredient}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View  style={styles.cpBar}>
                                            <Text>操作方法</Text>
                                        </View>
                                        <View style={styles.cp}>
                                            <Text>{data.steps}</Text>
                                        </View>
                                    </View>
                                </View>

                            </ScrollView>
                        </View>
                    </Content>
                </Container>
            );
        }else{
            return (
                <Container></Container>
            );
        }

        }
}

const styles = {
    imgBox:{
        height:200,
        backgroundColor:'#fff',
        justifyContent: 'center',
        alignItems:'center'
    },
    img:{
        width:theme.deviceWidth * 0.8,
        height:150,
        resizeMode:'cover'
},
    button:{
        flex:1,
        justifyContent:'center'
    },
    buttonSelected:{
        backgroundColor:"#fff",
    },
    textBox:{
        height:50,
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10
    },
    box1:{
        borderWidth:1,
        borderColor:'#fff',
        backgroundColor:'#fff',
        borderRadius:5
    },
    cpBar:{
        height:30,
        borderTopWidth:1,
        borderColor:'#E2E2E2',
        backgroundColor:'#F0F0F0',
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,
    },
    cp:{
        borderTopWidth:1,
        borderColor:'#E2E2E2',
        backgroundColor:'#fff',
        justifyContent:'center',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:4,
        paddingBottom:4,
    },
    scrollView:{
        height:theme.deviceHeight-260,
        marginBottom:20
    }

};
