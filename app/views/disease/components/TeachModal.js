import React, {PureComponent} from "react";
import {Modal, View,Text,Image,TouchableOpacity,ScrollView} from "react-native";
import {observer} from "mobx-react/native";
import {Button} from "native-base";
import {Container, Content} from "../../../components/index";
import allDiseaseListStore from "../../../mobx/allDiseaseListStore";
import allExpectListStore from "../../../mobx/allExpectListStore";
import questionStore from "../../../mobx/questionStore";
import Swiper from "react-native-swiper"

@observer
export default class TeachModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
        }
    }

    componentDidMount(){
        let {pageKey} = this.props;
        pageKey === 'disease' ?
        allDiseaseListStore.fetchData() : allExpectListStore.fetchData()
    }

    render() {
        let {visible,pageKey} = this.props;
        let {data} = pageKey === 'disease' ? allDiseaseListStore : allExpectListStore

        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onRequestClose={() => {}}
            >
                <View style={styles.opacityView}/>
                <View style={styles.content}>
                    <Swiper
                        style={styles.wrapper}
                        showsButtons={false}
                        showsPagination={true}
                        height={theme.deviceHeight}
                        paginationStyle={{bottom: 120}}
                        activeDot={<View style={{backgroundColor: '#00cf92', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}

                    >
                        {
                            data.length > 0 ? data.map((item, index)=> {
                                return (
                                    <View key={index}>
                                        <Image style={styles.img} source={{uri:urls.getImage(item.img)}}/>
                                        <ScrollView>
                                            <View style={styles.box}>
                                                <Text style={styles.text}>穴位名称：{item.name}</Text>
                                                <Text style={styles.text}>部位：{item.part}</Text>
                                                <Text style={styles.text}>相关器官：{item.location}</Text>
                                                <Text style={styles.text}>穴位保健效果：{item.healthEffect}</Text>
                                                <Text style={styles.text}>穴位保健方法：{item.healthMethod}</Text>
                                                <Text style={styles.text}>简便取穴法：{item.simpleAcupointSelection}</Text>
                                            </View>
                                        </ScrollView>

                                    </View>
                                )
                            }) : <View/>
                        }
                    </Swiper>

                    <Button onPress={() => questionStore.teachModalShow= false} style={styles.button}>
                        <Text>知道了</Text>
                    </Button>
                </View>
            </Modal>
        )
    }
}

const styles = {
    opacityView: {
        flex: 1,
        backgroundColor: '#6c6c6c',
        opacity: 0.8,
    },
    content: {
        position: "absolute",
        backgroundColor: '#FFFFFF',
        left: 0,
        right: 0,
    },
    box: {
        alignItems: 'center',
        margin: 10,
    },
    img: {
        width: theme.deviceWidth,
        height: 200,
    },
    text: {
        marginTop: 10,
    },
    button: {
        width: 100,
        position: 'absolute',
        left:theme.deviceWidth/2 -50,
        bottom: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
};

