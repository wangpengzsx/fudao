import React, {PureComponent} from "react";
import {Modal, View, Image, ListView} from "react-native";
import {Icon, Button, ListItem, Text} from "native-base";


/**
 * 我的能量场 > 资料填写
 */
class DetailsModal extends PureComponent {

    constructor(props) {
        super(props);


        this.state = {
            ...props,
            visible: false,
            text:''
        }
    }

    /**
     * 分组
     */


    render() {
        let {visible,text} = this.state;
        //let data=JSON.parse(text);
        let m=(null);

        let textHtml=text.substring(1)
        if(text.charAt(0)=='1'){
            if(textHtml.indexOf('#')>0){
                m = (
                    <View>
                        <Text style={styles.zongText}>
                            <Text style={styles.textstyle}>{textHtml.split('#')[0].substring(0,4)}</Text>
                            <Text>{textHtml.split('#')[0].substring(4,textHtml.split('#')[0].length)}</Text>
                        </Text>
                        <Text style={styles.zongText}>
                            <Text style={styles.textstyle}>{textHtml.split('#')[1].substring(0,4)}</Text>
                            <Text>{textHtml.split('#')[1].substring(4,textHtml.split('#')[0].length)}</Text>
                        </Text>
                    </View>

                );
            }else{
                m=(
                    <View>
                        <Text style={styles.zongText}>
                            <Text style={styles.textstyle}>{textHtml.substring(0,4)}</Text>
                            <Text>{textHtml.substring(4,textHtml.split('#')[0].length)}</Text>
                        </Text>
                    </View>

                )
            }
        }
        if(text.charAt(0)=='2'){
            if(textHtml.indexOf('#')>0){
                m = (
                    <View>
                        <Text style={styles.zongText}>
                            <Text style={styles.textstyle}>{textHtml.split('#')[0].substring(0,1)}</Text>
                            <Text>{textHtml.split('#')[0].substring(1,textHtml.split('#')[0].length)}</Text>
                        </Text>
                        <Text style={styles.zongText}>
                            <Text style={styles.textstyle}>{textHtml.split('#')[1].substring(0,1)}</Text>
                            <Text>{textHtml.split('#')[1].substring(1,textHtml.split('#')[0].length)}</Text>
                        </Text>
                    </View>

                );
            }else{
                m=(
                    <View>
                        <Text style={styles.zongText}>
                            <Text style={styles.textstyle}>{textHtml.substring(0,1)}</Text>
                            <Text>{textHtml.substring(1,textHtml.split('#')[0].length)}</Text>
                        </Text>
                    </View>

                )
            }
        }


        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onRequestClose={() => this.hide()}
            >
                <View style={styles.opacityView}/>
                <View style={styles.content}>
                    <View style={styles.header}>

                        <View style={{width:25}}>
                            <Button
                                onPress={() => this.hide()}
                                style={styles.closeButton}>
                                <Icon name="close" style={{color:'#FFF', fontSize: 20}}/>
                            </Button>
                        </View>
                    </View>
                    <View style={{width:300,height:500,padding:30}}>
                        {m}
                    </View>

                </View>


            </Modal>
        )
    }


    /**
     * 打开对话框
     * @param data
     */
    show(data) {
        let state = {
            visible: true,
            text: data
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
    text:{
        textAlign: 'center',
        fontSize: theme.DefaultFontSize + 2,
        marginLeft: 30,
        marginRight: 30,
        lineHeight: 28,
    },
    textstyle:{
        fontWeight:'bold'
    },
    zongText:{
        fontSize:18,
        lineHeight:24
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
        paddingLeft: 10,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 6,
        flexDirection: 'row',
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
};


export default  (DetailsModal);

