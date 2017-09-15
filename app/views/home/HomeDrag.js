import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    Image
} from 'react-native';

import {createResponder} from 'react-native-gesture-responder';

const {width, height} = Dimensions.get('window');

export default class HomeDrap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gestureState: {},
            thumbSize: 100,
            left: 0,
            top: height / 2,
            right:0
        }
    }

    componentWillMount() {
        console.log('componentWillMount...');
        this.gestureResponder = createResponder({
            onStartShouldSetResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetResponderCapture: (evt, gestureState) => true,
            onResponderMove: (evt, gestureState) => {
                let {left, top, right} = this.state;
                left += (gestureState.moveX - gestureState.previousMoveX);
                right += (gestureState.previousMoveX - gestureState.moveX);
                top += (gestureState.moveY - gestureState.previousMoveY);
                this.setState({
                    gestureState: {
                        ...gestureState
                    },
                    left, top,right
                })
            },
            onResponderRelease: (evt, gestureState) => {
                let {left,right} = this.state;
                    left=0;
                    right=0;

                    this.setState({
                        left:left,
                        right:right
                    })
            },
            onResponderSingleTapConfirmed: (evt, gestureState) => {
                console.log('onResponderSingleTapConfirmed...' + JSON.stringify(gestureState));
            },
            debug: true
        });
    }

    render() {
        let {place,img}=this.props

            return (
                <View
                    style={{
                        width: 35,
                        height: 35,
                        position: 'absolute',
                        left:place=='left'? this.state.left:null,
                        right:place=='right'? this.state.right:null,
                        top: this.state.top,
                        backgroundColor:'rgba(0,0,0,.0)',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    {...this.gestureResponder}
                >
                    <Image source={img} style={styles.image}/>
                </View>
            );



    }
}
const styles = {
    image:{
        width:35,
        height:35
    }
};

