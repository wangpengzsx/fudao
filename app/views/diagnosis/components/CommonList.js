import React, {PureComponent} from "react";
import {View, Image, ListView, TouchableOpacity, ToastAndroid} from "react-native";
import {Text, Button} from "native-base";
/**
 * 常见问题列表组件
 */
class CommonList extends PureComponent {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });

        this.state = {
            items: props.items,
        }
    }

    render() {
        let {items} = this.state;
        return (
            <View style={styles.background}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>{items.title}常见问题</Text>
                </View>
                <ListView
                    contentContainerStyle={styles.contentContainer}
                    dataSource={this.ds.cloneWithRows(items.list)}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                />
            </View>

        )
    }

    _renderRow(rowData, sectionId, rowId) {
        let {selectedItem, onItemAdd, onItemPress} = this.props;
        return (
            selectedItem[rowData.name] ?
                <View style={styles.row}>
                    <TouchableOpacity underlayColor='transparent' style={styles.touchFle}>
                        <Text style={styles.choosedRowTitle}>{rowData.name}</Text>
                        <Text style={styles.choosed}>+</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => onItemAdd(rowData)} style={styles.touchFle}>
                        <Text style={styles.rowTitle}>{rowData.name}</Text>
                        <Text style={styles.choose}>+</Text>
                    </TouchableOpacity>
                </View>

        )
    }
}

const styles = {
    background: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginRight: 8,
        marginTop: 10,

    },
    titleView: {
        backgroundColor: "#D9D9E5",
        // marginLeft: 7,
    },
    title: {
        color: "#000",
        marginLeft: 5,
        fontSize: 14

    },
    contentContainer: {
        flexDirection: 'row', //设置横向布局
        flexWrap: 'wrap',    //设置换行显示
        justifyContent: 'space-between',
        paddingRight: 4,
        paddingLeft: 4,
        width: (theme.deviceWidth - 28) / 2,
    },
    row: {
        width: (theme.deviceWidth - 84) / 4,
        height: 40,
        margin: 3,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    touchFle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 4,
        paddingTop: 2,
        paddingBottom: 2,
    },

    rowTitle: {
        color: '#fff',
        flex: 1,
    },
    choosedRowTitle: {
        color: '#6A79A2',
        flex: 1,
    },
    choose: {
        fontSize: 20,
        fontWeight: '100',
        paddingBottom: 5,
        color: '#fff',
        justifyContent: 'flex-end',
    },
    choosed: {
        fontSize: 20,
        fontWeight: '100',
        paddingBottom: 5,
        color: '#6A79A2',
        justifyContent: 'flex-end',
    },
    hui: {}
};

CommonList.propsTypes = {
    items: React.PropTypes.object,
    selectedItem: React.PropTypes.object,
    onItemAdd: React.PropTypes.func,
    onItemPress: React.PropTypes.func,
}
CommonList.defaultProps = {
    items: {},
    selectedItem: {},
    onItemAdd: () => {
    },
    onItemPress: () => {
    },
}

export default (CommonList);
