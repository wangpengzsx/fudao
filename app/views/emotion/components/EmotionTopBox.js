import React, {PureComponent} from "react";
import {ListView, ScrollView, View, Image, ToastAndroid, DeviceEventEmitter} from "react-native";
import {Text, Button} from "native-base";
import {adjustment} from "./EmotionData";

/**
 * 情绪列表
 */
export default class EmotionTopBox extends PureComponent {

    ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });

    state = {
        dataSource1: this.ds.cloneWithRows(adjustment.slice(0, 4)),
        dataSource2: this.ds.cloneWithRows(adjustment.slice(4)),
    }

    render() {
        let {dataSource1, dataSource2} = this.state;
        let {show, onAdjustmentArrowPress} = this.props;
        return (
            <View style={styles.topBox}>
                {this._renderGroup(dataSource1)}
                {show ? (
                    <View>
                        {this._renderGroup(dataSource2)}
                        <Button transparent style={styles.adjustmentArrowView}
                                onPress={() => onAdjustmentArrowPress(false)}>
                            <Image source={require('../assets/adjustment_arrow_hide.png')}
                                   style={styles.adjustmentArrow}/>
                        </Button>
                    </View>
                ) : (
                    <Button transparent style={styles.adjustmentArrowView} onPress={() => onAdjustmentArrowPress(true)}>
                        <Image source={require('../assets/adjustment_arrow_show.png')} style={styles.adjustmentArrow}/>
                    </Button>
                )}
            </View>
        )
    }

    _renderGroup(dataSource) {
        return (
            <View style={styles.container}>
                <ListView
                    contentContainerStyle={styles.listContainer}
                    dataSource={dataSource}
                    renderRow={this._renderRow.bind(this)}
                    horizontal
                    pageSize={5}
                    enableEmptySections
                />
            </View>
        )
    }

    _renderRow(rowData) {
        let {onItemPress} = this.props;
        return (
            <Button transparent block style={styles.item} onPress={() => onItemPress(rowData)}>
                <View style={styles.itemView}>
                    <Image source={rowData.img} style={styles.itemImg}>
                        <View style={styles.itemModal}>
                            <Text style={styles.itemText}>{rowData.title}</Text>
                            {rowData.title2?<Text style={styles.itemText}>{rowData.title2}</Text>:null}
                        </View>
                    </Image>
                </View>

            </Button>
        )
    }

}

const styles = {
    container: {
        width: theme.deviceWidth,
    },
    listContainer: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: theme.deviceWidth,
        /*justifyContent: 'space-between',*/

    },
    item: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.deviceWidth / 4,
        height: theme.deviceWidth / 5 + 2,
        // marginRight:((theme.deviceWidth - 30)-300)/5 ,
        marginTop: 10,
        marginBottom: 10,

    },
    itemView: {
        width: theme.deviceWidth / 5 + 1,
        height: theme.deviceWidth / 5 + 1,
        //以下是阴影属性：
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        //注意：这一句是可以让安卓拥有灰色阴影
        elevation: 20,
    },
    itemImg: {
        width: theme.deviceWidth / 5,
        height: theme.deviceWidth / 5,

        /*marginRight: 5,*/
    },
    itemModal: {
        width: theme.deviceWidth / 5,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'center',
        padding:0,
        margin:0,
    },
    itemText: {
        color: '#fff',
        fontSize: 10,
        lineHeight:14,
        margin:0,
        // fontSize: theme.DefaultFontSize -4,

    },
    topBox: {
        width: theme.deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
    },
    adjustmentArrow: {
        width: 30,
        height: 20,
    },
    adjustmentArrowView: {
        width: theme.deviceWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 20,
    }
};

EmotionTopBox.propTypes = {
    onItemPress: React.PropTypes.func,
    onAdjustmentArrowPress: React.PropTypes.func,
    show: React.PropTypes.bool,
};
EmotionTopBox.defaultProps = {
    onItemPress: () => {
    },
    onAdjustmentArrowPress: () => {
    },
    show: false,
};


