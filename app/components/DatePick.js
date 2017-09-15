/**
 * Created by Administrator on 2017/2/28.
 */
'use strict';
import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    DatePickerAndroid,
    TouchableHighlight,
} from 'react-native';
//简单封装一个组件
export default class DatePick extends React.Component {
    render() {
        return (
            <TouchableHighlight
                style={styles.button}
                underlayColor="#a5a5a5"
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableHighlight>
        );
    }
}