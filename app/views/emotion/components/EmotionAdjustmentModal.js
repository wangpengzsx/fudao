import React, {PureComponent} from "react";
import {View, Image, TouchableHighlight, ScrollView, Platform, TouchableOpacity, ListView} from "react-native";
import {Text, Button, Icon} from "native-base";
import {Modal} from "../../../components/index";
import VideoSolve from "./VideoSolve";

/**
 * 情绪干预， 弹出
 */

export default class EmotionAdjustmentModal extends PureComponent {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });


        this.state = {
            visible: false,
            emotion: null,
            stop: true,
            Threeflag: false,
            backgroundImg: require('../assets/quchupilao.jpg'),
            tubiao: [require('../assets/yinyue_choosed.png'), require('../assets/mingxiang.png'), require('../assets/naobo.png')],
            dataSource: ["1", "dssss", "1", "dssss", "1", "dssss", "1", "dssss", "1", "dssss", "1", "dssss", 'hfjd'],
            item: {
                fenji: '三级',
                title: '释放情绪',
                img: '/emotion/intervene/yanwu.mp3',
                remarks: '潜意识',
                length: 488
            }

        };

    }

    render() {
        let {visible, emotion, Threeflag, backgroundImg, tubiao, dataSource, item} = this.state;

        return (
            <Modal ref={(e) => this._modal = e} visible={visible} transparent>
                <View style={styles.container}>
                    <View style={styles.View}>
                        <Image style={styles.backgroundImg} source={backgroundImg}>
                            <VideoSolve key={1} index={1}
                                        time={item.length}
                                        isEmotion={true}
                                        video={item.img}/>
                            {
                                Threeflag ? (
                                    <View style={styles.threeContain}>
                                        <Button transparent style={styles.adjustmentArrowView} onPress={() => {
                                            this.setState({
                                                Threeflag: false
                                            })
                                        }}>
                                            <Image source={require('../assets/adjustment_arrow_show.png')}
                                                   style={styles.adjustmentArrow}/>
                                        </Button>
                                        {this._renderRow(dataSource)}
                                        <View style={styles.adjustmentSpanView}>
                                            <Button transparent style={styles.adjustmentSpan}
                                                    onPress={this.changeAdjustment.bind(this, 0)}>
                                                <Image source={tubiao[0]}
                                                       style={{width: 15, height: 15}}/>
                                            </Button>
                                            <Button transparent style={styles.adjustmentSpan}
                                                    onPress={this.changeAdjustment.bind(this, 1)}>
                                                <Image source={tubiao[1]}
                                                       style={styles.adjustmentArrow}/>
                                            </Button>
                                            <Button transparent style={styles.adjustmentSpan}
                                                    onPress={this.changeAdjustment.bind(this, 2)}>
                                                <Image source={tubiao[2]}
                                                       style={styles.adjustmentArrow}/>
                                            </Button>

                                        </View>
                                    </View>
                                ) : (
                                    <Button transparent style={styles.adjustmentArrowViewhide} onPress={() => {
                                        this.setState({
                                            Threeflag: true
                                        })
                                    }}>
                                        <Image source={require('../assets/adjustment_arrow_hide.png')}
                                               style={styles.adjustmentArrow}/>
                                    </Button>
                                )
                            }
                        </Image>
                    </View>
                    <View style={styles.header_close}>
                        <View style={{width: 25}}>
                            <Button transparent
                                    onPress={() => this.hide()}
                                    style={styles.closeButton}>
                                <Icon name="close" style={{color: '#FFF', fontSize: 20}}/>
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
        )
    }


    _renderRow(data) {
        let listView = data.map((p, i) => {
            return (
                <View key={i} style={[styles.listView, {}]}>
                    <Button transparent style={styles.listBtn} onPress={this.changeVideo.bind(this, p)}>
                        <Text style={styles.listText}>· {'\t\t' + p}</Text>
                    </Button>
                </View>
            );
        })

        return (
            <ScrollView style={styles.listContainer}>
                {listView}
            </ScrollView>
        )
    }

    changeVideo(data) {
        /*
         * 改变音乐对象item
         * */
        // this.setState({
        //     item
        // })

    }

    changeAdjustment(index) {
        /*
         * 改变方法列表dataSource
         * */
        let tubiao = [];
        switch (index) {
            case 0:
                tubiao = [require('../assets/yinyue_choosed.png'), require('../assets/mingxiang.png'), require('../assets/naobo.png')];
                break;
            case 1:
                tubiao = [require('../assets/yinyue.png'), require('../assets/mingxiang_choosed.png'), require('../assets/naobo.png')];
                break;
            case 2:
                tubiao = [require('../assets/yinyue.png'), require('../assets/mingxiang.png'), require('../assets/naobo_choosed.png')];
                break;
        }
        this.setState({
            tubiao,
            dataSource: ["3333333333333", "dssss", 'hfjd'],
        })
    }


    show(emotion) {
        this.setState({
            visible: true,
            backgroundImg: emotion.img,
        })
    }

    hide() {
        this.setState({
            visible: false,
            emotion: null,
            Threeflag: false,
        })
    }
}

const styles = {
    container: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        flexDirection: 'column',
        flex: 1,
    },
    View: {
        flex: 1,
        flexDirection: 'row',
    },
    backgroundImg: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: null,
        height: null,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        overflow: 'visible'

    },
    closeButton: {
        backgroundColor: '#C8C8C8',
        justifyContent: 'center',
        borderRadius: 12,
        width: 24,
        height: 24,
        paddingLeft: 0,
        paddingRight: 0,
    },
    header_close: {
        position: 'absolute',
        top: 8,
        right: 8,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    adjustmentArrow: {
        width: 20,
        height: 20,
    },
    adjustmentArrowView: {
        height: 20,
        width: theme.deviceWidth * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
    },
    adjustmentArrowViewhide: {
        position: 'absolute',
        bottom: 0,
        height: 20,
        width: theme.deviceWidth * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        margin: 0,
        padding: 0,
    },
    threeContain: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    adjustmentSpanView: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
    adjustmentSpan: {
        flex: 1,
        margin: 0,
        padding: 0,
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        height: 20,
    },
    listContainer: {
        height: 150,
        margin: 30,
        marginTop: 0,
    },
    listView: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.4)',
    },
    listBtn: {
        margin: 0,
        height: 36,
    },
    listText: {
        color: '#fff',
        padding: 8,
        paddingLeft: 0,
    },


};


