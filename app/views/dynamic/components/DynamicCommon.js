import React, {Component} from "react";
import {Text} from "native-base";
import {View, Image, TouchableHighlight} from "react-native";
import DynamicImage from './DynamicImage';
import {Actions} from "react-native-router-flux";
import dynamicStore from "../../../mobx/dynamicStore";

/**
 * 动态公共部分
 */
export default class DynamicCommon extends Component {
    render() {
        let {info} = this.props;
        return (
            <View style={styles.dynamicCommon}>
                <View>
                    <Image source={{uri: urls.getImage(info.user.photo, 700, 500)}} style={styles.dynamicTouxiang}/>
                </View>
                <TouchableHighlight style={styles.dynamicDetail} underlayColor='#fafafa'
                                    onPress={this._skipToDetail.bind(this)}>
                    <View>
                        <Text style={styles.dynamicName}>{info.user.nickname||"用户"+JSON.stringify(info.user.id).substr(0,4)}</Text>
                        <Text style={styles.dynamicContent}>{info.content}</Text>
                        <DynamicImage imagePath={info.path}/>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }

    _skipToDetail() {
        let {info} = this.props;
        dynamicStore.dynamicDetail(info);
        Actions.dynamicDetail()
        // const {dispatch} = this.props;
        // dispatch(skipToDetail(this.props.info, this.props.newnew));
    }

}

const styles = {
    dynamicCommon: {
        flexDirection: 'row',
    },
    dynamicDetail: {
        flex: 1,
    },
    dynamicTouxiang: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    dynamicName: {
        color: '#5E7192',
        fontSize: theme.DefaultFontSize,
    },
    dynamicContent: {
        marginTop: 6,
        color: '#282828',
        fontSize: theme.DefaultFontSize,
    },
};

DynamicCommon.propsTypes = {
    info: React.PropTypes.object,
};
DynamicCommon.defaultProps = {
    info: {},
};

