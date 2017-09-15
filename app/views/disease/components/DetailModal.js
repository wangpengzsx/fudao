import React, {PureComponent} from "react";
import {Modal, View, Image, ListView,ScrollView} from "react-native";
import {Icon, Button, ListItem, Text} from "native-base";
import diseaseMethodStore from "../../../mobx/diseaseMethodStore";
import expectMethodStore from "../../../mobx/expectMethodStore";
import healthMethodStore from "../../../mobx/healthMethodStore";
import questionStore from "../../../mobx/questionStore";

export default class DetailModal extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    render() {
        let {visible, data, children} = this.props;
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onRequestClose={() => this.hide()}
            >
                <View style={styles.opacityView}/>
                <View style={styles.content}>
                            <Button
                                onPress={() => this.hide()}
                                style={styles.closeButton}>
                                <Icon name="close" style={{color: '#FFF', fontSize: 20}}/>
                            </Button>
                        {children}
                </View>
            </Modal>
        )
    }

    hide() {
        questionStore.modalShow = false
    }
}


const styles = {
    opacityView: {
        flex: 1,
        backgroundColor: '#6c6c6c',
        opacity: 0.5,
    },
    content: {
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        flexDirection: 'column',
        position: "absolute",
        top: 30,
        bottom: 30,
        left: 20,
        right: 20,
        opacity: 1,
        flex: 1,
        overflow:'hidden'
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
        marginLeft:10,
        marginTop:10,
        zIndex:100
    },
    child: {
        marginBottom: 20,
    }
};




