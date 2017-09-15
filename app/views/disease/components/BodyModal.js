import React, {PureComponent} from "react";
import {Modal, View, ScrollView,Text} from "react-native";
import {WebView} from "../../../components/index";
import {Button} from "native-base";
import {Container, Content} from "../../../components/index";
import allDiseaseListStore from "../../../mobx/allDiseaseListStore";
import allExpectListStore from "../../../mobx/allExpectListStore";
import questionStore from "../../../mobx/questionStore";

export default class BodyModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    componentDidMount(){
        allDiseaseListStore.fetchData()
    }

    onPressEvent(){
        questionStore.jlModalShow = false
        questionStore.teachModalShow = true

    }
    render() {
        let {visible,pageKey} = this.props;
        let diseaseType = pageKey === 'disease' ? encodeURI(allDiseaseListStore.selectedItem.type) :encodeURI(allExpectListStore.selectedItem.type)
        let disease = pageKey === 'disease' ? encodeURI(allDiseaseListStore.selectedItem.name) :encodeURI(allExpectListStore.selectedItem.name)
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onRequestClose={() => {}}
            >
                <View style={styles.opacityView}/>
                <View style={styles.content}>
                    <ScrollView style={styles.child}>
                        <WebView uri={urls.pages.MY_QUESTION_PERSON + '?disease='+ disease + '&diseaseType=' + diseaseType} style={styles.webViewStyle}/>

                        <View style={styles.closeBox}>
                            <View style={{width: theme.deviceWidth -60}}>
                                <Text style={{lineHeight: 20,fontSize: 15}}>
                                    &nbsp;&nbsp;&nbsp;&nbsp;通过对自由基显影技术的改进与应用，在生物体内发现与经络吻合的清晰的线性路线，是目前全世界获得最清晰的经络显影照片
                                </Text>
                            </View>
                            <View style={styles.buttonView}>
                                <Button block onPress={() => questionStore.jlModalShow= false} style={{marginRight:20,backgroundColor: '#ccc'}}>
                                    <Text>知道了</Text>
                                </Button>
                                <Button block onPress={this.onPressEvent.bind(this)}>
                                    <Text>教我自疗</Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        )
    }
}

const styles = {
    opacityView: {
        flex: 1,
        backgroundColor: '#6c6c6c',
        opacity: 0.5,
    },
    content: {
        position: "absolute",
        backgroundColor: '#FFFFFF',
        top: 50,
        bottom: 0,
        left: 0,
        right: 0,
    },
    webViewStyle: {
        width: theme.deviceWidth,
        height: theme.deviceHeight -80
    },
    closeBox:{
        height: 150,
        width: theme.deviceWidth,
        position: 'absolute',
        left:0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 30
    },
};

