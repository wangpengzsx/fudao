import React, { PureComponent } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Vibration,
    View
} from 'react-native';
import BarcodeScanner from 'react-native-barcodescanner';
import {Header,Container} from "../../../components/index";
import {Actions} from "react-native-router-flux";

export default class BarcodeScannerApp extends PureComponent {
    state = {
        barcode: '',
        cameraType: 'back',
        text: 'Scan Barcode',
        torchMode: 'off',
        type: '',
    };


    barcodeReceived(e) {
        if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();
        console.log(e.data)
        var phone=`${e.data}`
        request.getJson(urls.apis.USER_SEARCH, {phone})
        .then(((result) => {

            if (result.ok) {
                if (result.obj) {
                    this.setState({
                        notExist: false
                    })
                    Actions.userDetail({
                        userId: result.obj.id,
                        from:'sao'
                    })
                } else {
                    this.setState({
                        notExist: true
                    })
                }
            }
        }), (error) => {
            //dispatch(hideLoading());
        });

        this.setState({
            barcode: e.data,
            text: `${e.data} (${e.type})`,
            type: e.type,
        });
    }

    render() {
        console.log(this.state.text);
        return (
            <Container>
                <Header {...this.props}/>
                <BarcodeScanner
                    onBarCodeRead={this.barcodeReceived.bind(this)}
                    style={{ flex: 1 }}
                    torchMode={this.state.torchMode}
                    cameraType={this.state.cameraType}
                />
                <View style={styles.statusBar}>
                    <Text style={styles.statusBarText}>{this.state.text}</Text>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    statusBar: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusBarText: {
        fontSize: 20,
    },
});

