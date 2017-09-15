import React, {PureComponent, PropTypes} from 'react';
import {View, StyleSheet, Modal, TouchableOpacity, Text, TouchableWithoutFeedback,DatePickerIOS} from 'react-native';


class DatePicker_IOS extends PureComponent {


    state = {
        date:new Date()
    };

    render() {
        const {visible, onShow, onRequestClose, onOutSidePress,sexChose} = this.props;
        let now = new Date();
        let year = sexChose==1?now.getFullYear()-16:now.getFullYear()-14;
        let month = now.getMonth();
        let day = now.getDate();
        let max = new Date(year,month,day);

        return (
            <Modal
                animationType="none"
                transparent={true}
                visible={visible}
                onShow={onShow}
                onRequestClose={onRequestClose}>
                <TouchableWithoutFeedback onPress={()=> onOutSidePress()} style={styles.modalStyle}>
                    <View style={styles.modalStyle}>
                        <View style={styles.contain}>
                            <View style={styles.subView}>
                                <DatePickerIOS
                                    onDateChange={(date)=>this.setState({date})}
                                    date={this.state.date}
                                    maximumDate={max}
                                    mode="date"
                                />
                            </View>
                            <TouchableOpacity style={styles.conform} onPress={()=> onRequestClose(this.state.date)}>
                                <Text style={styles.conformText}>
                                    确定
                                </Text>
                            </TouchableOpacity>
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
        borderRadius: 3
    },
    subView: {
        width: theme.deviceWidth * 0.85,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 3
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

DatePickerIOS.propTypes = {
    ...Modal.propTypes,
};

DatePickerIOS.defaultProps = {
    animationType: 'none',
    transparent: true,
    visible: false,
    onShow: () => {
    },
    onRequestClose: () => {
    },
    onOutSidePress: () => {
    }
}

export default DatePicker_IOS;