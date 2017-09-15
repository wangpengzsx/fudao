/**
 * Created by Administrator on 2017/3/2.
 */

import React, {PureComponent} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
} from 'react-native';

import Picker from 'react-native-picker';
import area from './area.json'
const {width,height} = Dimensions.get('window')

function createAreaData(callback){

    let data = [];
    let len = area.length;
    for(let i=0;i<len;i++){
        let city = [];
        for(let j=0,cityLen=area[i]['city'].length;j<cityLen;j++){
            city.push(area[i]['city'][j]['name']);
        }

        let _data = {};
        _data[area[i]['name']] = city;
        data.push(_data);
    }
    callback(data);

};
 class Picker extends PureComponent {
    constructor(props ) {
        super(props);
    }
    render() {
        return (
            <Navigator initialRoute={{name:'nav',component:Nav}}
                       configureScene={
                           (route) => {
                               return ({
                                   ...Navigator.SceneConfigs.PushFromRight,
                                   gestures: null
                               });
                           }
                       }
                       renderScene={
                           (route, navigator) =>
                           {
                               let Component = route.component;
                               return <Component {...route.params} navigator={navigator} />
                           }
                       }/>
        );
    }
};

class Nav extends Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            city:'北京'
        }
    }
    _showAreaPicker() {
        createAreaData(data => {
            console.log(data)
            Picker.init({
                pickerData: data,
                selectedValue: ['河北', '唐山'],
                onPickerConfirm: pickedValue => {
                    console.log('area', pickedValue);
                    this.setState({
                        city:pickedValue[1]
                    })
                },
                onPickerCancel: pickedValue => {
                    console.log('area', pickedValue);
                },
                onPickerSelect: pickedValue => {
                    console.log('area', pickedValue);
                }
            });
            Picker.show();
        });
    }
    /*  goToList=()=>{
     let {navigator} = this.props;
     if(navigator){
     navigator.push({
     name:'list',
     component:List,
     params:({
     changeCity:(city)=>{this.setState({
     city:city
     })}
     })
     })
     }
     }*/
    render() {
        return (
            <View style={styles.view}>
                <View style={styles.cityView}><Text style={styles.city}>{this.state.city}</Text></View>

                <TouchableOpacity style={styles.select} onPress={this._showAreaPicker.bind(this)}>
                    <Text style={styles.selectCity}>picker模式选择区域</Text>
                </TouchableOpacity>

                /*<TouchableOpacity style={styles.select} onPress={this.goToList}>
                 <Text style={styles.selectCity}>列表模式选择区域</Text>
                 </TouchableOpacity>

                 <View style={styles.footer}><Text>any problem ? 674668211 : null</Text></View>*/
            </View>
        );
    }
};

const styles = StyleSheet.create({
    view:{flex:1,justifyContent:'center',alignSelf:'center'},
    cityView:{justifyContent:'center',alignSelf:'center'},
    city:{color:'red',fontSize:20},
    select:{marginTop: 30, marginLeft: 20},
    selectCity:{color:'gray',fontSize:16},
    footer:{position:'absolute',left:0,right:0,bottom:20,width:width}
})
function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        closeDrawer: key => dispatch(closeDrawer()),
    };

}

const mapStateToProps = state => ({});
export default connect(mapStateToProps, bindAction)(Picker);