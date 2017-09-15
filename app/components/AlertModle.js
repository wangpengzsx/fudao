import React, {
    PureComponent,
    PropTypes
} from 'react';
import {
    View,
    StyleSheet,
    Modal,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    Text,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import groupBy from 'lodash/groupBy'
const SEPARATOR_HEIGHT = StyleSheet.hairlineWidth;
const CB_ENABLED_IMAGE = require('../assets/cb_enabled.png');
const CB_DISABLED_IMAGE = require('../assets/cb_disabled.png');
const RADIUBOX = require('../assets/RadiuBox.png');
const RADIUBOX_CK = require('../assets/RadiuBox_ck.png');
var arr = [];

class CheckBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            internalChecked: props.checked
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange() {
        let internalChecked = this.state.internalChecked;
        if (!internalChecked) {
            if (arr.length > 0) {
                arr.push(this.props.label)

            } else {
                arr[0] = this.props.label
            }
        } else {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == this.props.label) {
                    arr.splice(i, 1);
                    break;
                }
            }
        }


        this.setState({
            internalChecked: !internalChecked
        })
    }

    render() {
        let source = this.state.internalChecked ? CB_ENABLED_IMAGE : CB_DISABLED_IMAGE;

        let container = (
            <View style={this.props.containerStyle || styles.container}>
                <Image
                    style={this.props.checkboxStyle || styles.checkbox}
                    source={source}/>
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                </View>
            </View>
        );

        return (
            <TouchableOpacity onPress={this.onChange} underlayColor={this.props.underlayColor}
                              style={{marginBottom:5,marginTop:5}}>
                {container}
            </TouchableOpacity>
        );
    }
}

class RadiuBox extends PureComponent {

    state = {
        checked: this.props.checked
    };

    onChange() {
        this.setState({
            checked: true
        });
        this.timerOut = setTimeout(()=>this.props.onRequestClose(this.props.label), 200)
    }

    render() {
        let source = this.state.checked ? RADIUBOX_CK : RADIUBOX;
        let container = (
            <View style={this.props.containerStyle || styles.container}>
                <Image
                    style={this.props.checkboxStyle || styles.radiubox}
                    source={source}/>
                <View style={styles.labelContainer}>
                    <Text style={[styles.label, this.props.labelStyle]}>{this.props.label}</Text>
                </View>
            </View>
        );

        return (
            <TouchableOpacity onPress={this.onChange.bind(this)} underlayColor={this.props.underlayColor}
                              style={{marginBottom:5,marginTop:5}}>
                {container}
            </TouchableOpacity>
        );
    }

    componentWillUnmount(){
        this.timerOut&&clearTimeout(this.timerOut)
    }

}


class AlertDialog extends PureComponent {

    constructor(props) {
        super(props);
        arr = [];
        state = {
            selectedIndex: props.selectedIndex
        }
    }


    changeArr(newArr) {
        arr = newArr
    }

    render() {
        const {visible, onShow, onRequestClose, onOutSidePress, data, title, value, checked} = this.props;

        let valueChecked = groupBy(value, value => {
            return value
        })

        this.alertItem = this.data || (
                data.map((item, index) => {
                    return checked ? (
                        <CheckBox
                            key={index}
                            label={item}
                            checked={valueChecked[item] ? true : false}
                        />
                    ) : <RadiuBox
                        key={index}
                        label={item}
                        checked={false}
                        onRequestClose={onRequestClose}
                    />
                })
            );
        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={visible}
                onShow={onShow}
                onRequestClose={onRequestClose}>
                <TouchableWithoutFeedback onPress={()=> {
                    onOutSidePress();
                    arr = [];
                }} style={styles.modalStyle}>
                    <View style={styles.modalStyle}>
                        <View style={styles.contain}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    {title} ：
                                </Text>
                            </View>
                            <ScrollView style={styles.scrollview}>
                                <View style={styles.subView}>
                                    {this.alertItem}
                                </View>
                            </ScrollView>
                            {checked ? (
                                <TouchableOpacity style={styles.conform} onPress={()=> {
                                    onRequestClose(arr);
                                    arr = [];
                                }}>
                                    <Text style={styles.conformText}>
                                        确定
                                    </Text>
                                </TouchableOpacity>
                            ) : <View style={{height: 10}}></View>}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        marginLeft: 20,
    },
    checkbox: {
        width: 13,
        height: 13
    },
    radiubox: {
        width: 18,
        height: 18
    },

    labelContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    label: {
        fontSize: 15,
        color: 'grey'
    },
    // modal的样式
    modalStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: theme.deviceWidth,
        height: theme.deviceHeight,
        backgroundColor: 'rgba(0,0,0,0.2)',
        flexDirection: 'column',
        paddingTop: 40,
        paddingBottom: 40
    },
    contain: {
        width: theme.deviceWidth * 0.85,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    scrollview: {
        width: theme.deviceWidth * 0.85,
        flexDirection: 'column',
    },
    subView: {
        width: theme.deviceWidth * 0.85,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        justifyContent: 'center',

    },
    item: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: SEPARATOR_HEIGHT
    },
    itemText: {
        fontSize: 1,
        color: '#333333'
    },
    title: {
        height: 40,

    },
    titleText: {
        lineHeight: 40,
        color: '#3081C4',
        fontSize: 18,
        fontWeight: "700",
        paddingLeft: 15
    },
    conform: {
        height: 36
    },
    conformText: {
        textAlign: 'right',
        lineHeight: 36,
        color: '#3081C4',
        fontSize: 16,
        fontWeight: "500",
        paddingRight: 25
    }
});

AlertDialog.propTypes = {
    ...Modal.propTypes,
    data: PropTypes.array,
    value: PropTypes.array
};

AlertDialog.defaultProps = {
    animationType: 'none',
    transparent: true,
    visible: false,
    data: [],
    value: [],
    onShow: () => {
    },
    onRequestClose: () => {
    },
    onOutSidePress: () => {
    }
}

export default AlertDialog;