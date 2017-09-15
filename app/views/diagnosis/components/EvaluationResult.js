import React, {PureComponent} from "react";
import {Modal, View, Image, ListView, WebView, Dimensions} from "react-native";
import {Icon, Button, ListItem, Text} from "native-base";
import GiftedListView from "../../../components/GiftedListView"


/**
 * 自查 > 测评结果展示
 */
class EvaluationResult extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            ...props,
            visible: false,
            type:1,
            show:false
        }
    }

    /**
     * 分组
     */


    render() {
        let {visible} = this.state;
        // let data = JSON.parse(text);
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onRequestClose={() => this.hide()}
                onLayout={({nativeEvent: e}) => this.layout(e)}
            >
                <View style={styles.opacityView}/>
                <View style={styles.content}>

                    <View style={{flex: 1}}>
                        <View style={styles.title}>
                            <View style={{flex:9}}>
                                <Text style={styles.titleText}>测评题目</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.titleText}>得分</Text>
                            </View>
                        </View>
                        {
                            this.state.show?(
                                <View style={{marginTop:20}}>
                                     <Text style={{textAlign:'center'}}>暂无答案</Text>
                                </View>
                            ):null
                        }
                        <GiftedListView
                            rowView={this._renderRowView.bind(this)}
                            onFetch={this._onFetch.bind(this)}
                            paginationAllLoadedView={()=>null}
                        />
                    </View>
                    <View style={styles.header}>

                        <View style={{width: 25}}>
                            <Button
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

    _renderRowView(rowData) {
        return (
            <View style={[styles.oneLine,{backgroundColor:rowData.score<5?'#FFEEEE':'#fff'}]}>
                <View style={{flex:15}}>
                    <Text style={styles.titleText}>{parseInt(rowData.id)-43}、{rowData.title}</Text>
                </View>
                <View  style={{flex:1}}>
                    <Text style={styles.titleText}>{rowData.score}</Text>
                </View>
            </View>
        )
    }

    _onFetch(page, callback) {
        request.getJson(urls.apis.DIAGNOSIS_GETQUESTIONNAIRESCORES, {
            type:this.state.type
        }).then((res) => {
            if(res.obj.length==0){
                    this.setState({
                        show:true
                    })
                }else{
                    this.setState({
                        show:false
                    })
                }
                callback(res.obj, {
                    allLoaded: true
                })


        })

    }

    layout(data) {
        // alert(JSON.stringify(data));
    }

    /**
     * 打开对话框
     * @param data
     */
    show(data) {
        let state = {
            visible: true,
            type: data
        };
        this.setState(state);

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
    opacityView: {
        flex: 1,
        backgroundColor: '#6c6c6c',
        opacity: 0.5,
    },
    content: {
        position: "absolute",
        backgroundColor: '#FFFFFF',
        top: 30,
        bottom: 30,
        left: 20,
        right: 20,
        borderRadius: 3,
        opacity: 1,
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        // paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        // paddingRight: 6,
        flexDirection: 'row',
        justifyContent: 'center',

    },
    headerText: {
        fontSize: theme.fontSizeH4
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
    title: {
        backgroundColor: '#eee',
        flexDirection: 'row',
        // justifyContent: 'space-between',
        padding: 10,
    },
    oneLine: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        padding: 10,
        paddingRight:15,
        borderBottomWidth:0.5,
        borderBottomColor:"#C9C9C9"
    },
    titleText: {
        fontSize: 14,
        color: "#525252",
    }
};


export default  (EvaluationResult);



