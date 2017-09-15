import React, {PureComponent} from "react";
import {Modal, View, Image, TouchableHighlight} from "react-native";
import {Text} from "native-base";


/**
 * 图片展示组件
 */
class TextSolve extends PureComponent {

    render() {
        return (
            <View  style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.content}>{this.props.content}</Text>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: theme.DefaultFontSize + 6,
        marginBottom: 20,
        marginTop: 20,
    },
    content: {
        fontSize: theme.DefaultFontSize,
        marginLeft: 30,
        marginRight: 30,
    },

};

TextSolve.propsTypes = {
    title: React.PropTypes.string,
    content: React.PropTypes.string,
}

export default (TextSolve);



