/**
 * Created by Administrator on 2017/3/1.
 */


/**
 * Created by Administrator on 2017/3/1.
 */
//noinspection JSAnnotator
'use strict';
import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {Container, Title, Content, Left, Right, Body, Form, Input, Item,Thumbnail,Button,Text} from "native-base";



/**
 *提交按鈕
 */
class CommitButton extends PureComponent {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Button block={this.props.block} bordered={this.props.border} style={{marginTop:this.props.top}} onPress={this.props.onPress} >
                <Text>{this.props.title}</Text>
            </Button>
        )
    }
}
const styles = {



};
export default CommitButton
