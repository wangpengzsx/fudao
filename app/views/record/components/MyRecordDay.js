import React, {PureComponent} from "react";
import {View, TouchableOpacity} from "react-native";
import {Text} from "native-base";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import MyRecordeList from "./MyRecordeList";
const Btn = require('./Button');
const LABELS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];


/**
 * 我的日记录
 */
export default class MyRecordDay extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            flag: 'day',
            tip: false,
            nowDate: new Date(),
        }
        this.days = new Date(this.state.nowDate.getFullYear(), this.state.nowDate.getMonth() + 1, 0).getDate();
        this.allDays = LABELS.slice(0, this.days);
    }

    render() {
        let that = this;
        let now = new Date();
        // alert(typeof (this.days-now));
        // this.days = new Date(this.state.nowDate.getFullYear(), this.state.nowDate.getMonth() + 1, 0).getDate();

        let {nowDate, tip} = this.state
        return (
            <View style={styles.tabView}>
                <View style={styles.topView}>
                    <TouchableOpacity onPress={()=> {
                        var pre = new Date(nowDate.getTime() - 24 * 60 * 60 * 1000 * this.days);
                        var t = new Date(pre.getFullYear(), pre.getMonth() + 1, 0).getDate();
                        var preDate = new Date(nowDate.getTime() - 24 * 60 * 60 * 1000 * t);
                        this.setState({
                            nowDate: preDate,
                            tip: true
                        })
                        this.timerOut1 = setTimeout(()=> {
                            that.setState({
                                tip: false
                            })
                        }, 100)
                    }}>
                        <Text>{nowDate.getMonth() == 0 ? 12 : nowDate.getMonth()}月</Text>
                    </TouchableOpacity>
                    <Text style={styles.topCenter}>{nowDate.getFullYear()}年{nowDate.getMonth() + 1}月</Text>
                    <TouchableOpacity
                        disabled={((new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0)) - (new Date())) > 0 ? true : false}
                        onPress={()=> {
                            var t = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0).getDate()
                            var nextDate = new Date(nowDate.getTime() + 24 * 60 * 60 * 1000 * t);
                            this.setState({
                                nowDate: nextDate,
                                tip: true
                            })
                            this.timerOut2 = setTimeout(()=> {
                                that.setState({
                                    tip: false
                                })
                            }, 100)
                        }}>
                        <Text
                            style={((new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0)) - (new Date())) > 0 ? styles.colorAE : {}}>{nowDate.getMonth() == 11 ? 1 : nowDate.getMonth() + 2}月</Text>
                    </TouchableOpacity>

                </View>
                {tip ? null : (
                    <ScrollableTabView

                        renderTabBar={() => (
                            <ScrollableTabBar
                                underlineStyle={{backgroundColor: 'transparent'}}
                                renderTab={this._renderTabBar.bind(this)}
                            />
                        )}
                        tabBarPosition='top'
                        initialPage={nowDate.getDate() - 1}
                        scrollWithoutAnimation={false}
                    >
                        {this.allDays.map((label, i) => <MyRecordeList key={i} year={nowDate.getFullYear()}
                                                                       month={nowDate.getMonth() + 1} btn={i}
                                                                       tabLabel={label} label={label} type='day'/>)}
                    </ScrollableTabView>
                )}


            </View>
        )
    }

    _renderTabBar(name, page, isTabActive, onPressHandler, onLayoutHandler) {

        return <Btn
            key={`${name}_${page}`}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
            onLayout={onLayoutHandler}
            disabled={((new Date(this.state.nowDate.getFullYear(), this.state.nowDate.getMonth(), parseInt(name))) - (new Date())) > 0 ? true : false}
        >
            <View style={{flexDirection: 'row'}}>
                <View style={isTabActive ? styles.tabBarViewActive : styles.tabBarView}>
                    <Text
                        style={((new Date(this.state.nowDate.getFullYear(), this.state.nowDate.getMonth(), parseInt(name))) - (new Date())) > 0 ? {color: '#aeaeae'} : {}}>
                        {name}
                    </Text>
                </View>
            </View>
        </Btn>
    }

    componentWillUnmount(){
        this.timerOut1&&clearTimeout(this.timerOut1);
        this.timerOut2&&clearTimeout(this.timerOut2);
    }
}
const styles = {
    tabView: {
        flex: 1,
        flexGrow: 1,
        //底部日记录、周记录、月记录的背景框
        // marginBottom: 70,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
    },
    topView: {
        flexDirection: 'row',
        margin: 10,
        marginBottom: 0,
    },
    topCenter: {
        flex: 1,
        textAlign: 'center'
    },
    tabBarViewActive: {
        backgroundColor: '#A1CC00',
        margin: 12,
        marginRight: 6,
        marginLeft: 6,
        padding: 8,
        paddingTop: 2,
        borderRadius: 20,
    },
    tabBarView: {
        margin: 12,
        marginRight: 6,
        marginLeft: 6,
        padding: 8,
        paddingTop: 2,
    },
    colorAE: {
        color: '#aeaeae',
    }
};

