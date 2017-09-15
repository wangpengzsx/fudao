
'use strict';
import React, {PureComponent} from "react";
import {Button,Text} from "native-base";

/**
 *提交按鈕
 */
class GetCode extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
            text:this.props.title,
            number1:"",
            number:'60',
            disabled:false,
        }
    }

    render() {
        let title=(
            this.state.text+this.state.number1
        );
        return (
            <Button block={this.props.block} disabled={this.state.disabled}  bordered={this.props.border} style={{marginTop: 4}} onPress={this.props.onPress} >
                <Text>{title}</Text>
            </Button>
        )
    }

    _click(){
        this.interval();
        this.setState({
            text:'重新获取',
            disabled:true,
        });
    }
    interval(){
        let self=this;
        let {number} = self.state;
        let timer = setInterval(function(){
            if(number==1){
                self.setState({
                    disabled:false,
                    text:self.props.title,
                    number1:''
                });
                clearInterval(timer);
            }else{
                number--;
                if(number>=10){
                    self.setState({
                        number1:number,
                    })
                }else{
                    self.setState({
                        number1:"0"+number,
                    })
                }

            }
        },1000);
        this.timer = timer;
    }
    clearTimer(){
        clearInterval(this.timer);
    }
}

export default GetCode;

