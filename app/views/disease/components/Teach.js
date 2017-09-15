import React, {PureComponent} from "react";
import {Modal, View, Text, Image, TouchableOpacity, ScrollView} from "react-native";
import {observer} from "mobx-react/native";
import {Container, Content, Header} from "../../../components/index";
import allDiseaseListStore from "../../../mobx/allDiseaseListStore";
import allExpectListStore from "../../../mobx/allExpectListStore";
import questionStore from "../../../mobx/questionStore";
import Swiper from "react-native-swiper"


const imgWidth = theme.deviceWidth - 30;
const imgHeight = 250;


@observer
export default class Teach extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visible: false,
        }
    }

    componentDidMount() {
        // let {pageKey,type} = this.props;
        let {pageKey,type} = questionStore.data
        pageKey === 'disease' ?
            allDiseaseListStore.fetchData(type) : allExpectListStore.fetchData(type)
    }
    renderView(item){
        let {type} = questionStore.data

        switch (type) {
            case '1':
                return (<View>
                    <Text style={styles.text}>经络保健方法：</Text>
                    <Text style={styles.text1}>{item.healthMethod}</Text>
                </View>)
                break
            case '2':
                return (<View style={styles.box}>
                    <Text style={styles.text}>部位：{item.part}</Text>
                    <Text style={styles.text}>体表定位：{item.location}</Text>
                    <Text style={styles.text}>穴位保健效果：{item.healthEffect}</Text>
                    <Text style={styles.text}>穴位保健方法：</Text>
                    <Text style={styles.text1}>{item.healthMethod}</Text>
                    <Text style={styles.text}>简便取穴法：</Text>
                    <Text style={styles.text1}>{item.simpleAcupointSelection}</Text>
                </View>)
                break
            case '3':
                return (<View>
                    <Text style={styles.text}>部位保健方法：</Text>
                    <Text style={styles.text1}>{item.healthMethod}</Text>
                </View>)
                break
            case '4':
                return (<View>
                    <Text style={styles.text}>循环系统保健方法：</Text>
                    <Text style={styles.text1}>{item.healthMethod}</Text>
                </View>)
                break
            default:
                return (<View>
                    <Text style={styles.text}>经络保健方法：</Text>
                    <Text style={styles.text1}>{item.healthMethod}</Text>
                </View>)
        }

    }
    render() {
        // let {visible, pageKey} = this.props;
        let {pageKey,title,type} = questionStore.data
        let {data} = pageKey === 'disease' ? allDiseaseListStore : allExpectListStore

        return (
            <Container>
                <Header {...this.props} title={title}/>
                <ScrollView>
                    <Swiper
                        style={styles.wrapper}
                        showsButtons={false}
                        showsPagination={true}
                        paginationStyle={{bottom: 100}}
                        activeDot={<View style={{
                            backgroundColor: '#00cf92',
                            width: 8,
                            height: 8,
                            borderRadius: 4,
                            marginLeft: 3,
                            marginRight: 3,
                            marginTop: 3,
                            marginBottom: 3,
                        }}/>}

                    >
                        {
                            data.length > 0 ? data.map((item, index) => {
                                return (
                                    <ScrollView key={index} style={styles.container}>
                                        <View style={styles.headerView}>
                                            <Text>{'  -' + item.name}</Text>
                                        </View>
                                        {
                                            item.img ? <Image style={styles.img} source={{uri: urls.getImage(item.img, imgWidth*2, imgHeight*2)}}/> : <View/>
                                        }
                                        {
                                            this.renderView(item)
                                        }

                                    </ScrollView>
                                )
                            }) : <View/>
                        }
                    </Swiper>
                </ScrollView>

            </Container>
        )
    }
}

const styles = {
    container: {
        height: theme.deviceHeight,
        backgroundColor: '#fff',
        padding: 15
    },
    headerView: {
        height: 40,
        justifyContent: 'center',
        marginBottom: 15,
        backgroundColor: '#e4e4e4'
    },
    img: {
        width: imgWidth,
        height: imgHeight
    },
    box: {
        margin: 10,
    },
    text: {
        marginBottom: 5,
    },
    text1: {
        marginBottom: 10,
    },
};

