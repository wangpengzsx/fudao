import React, {PureComponent} from "react";
import {View, ToastAndroid} from "react-native";
import {Text} from "native-base";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import MyRecordeList from "./MyRecordeList";
const Btn = require('./Button');
const LABELS3 = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

/**
 * 我的月记录
 */
export default class MyRecordMonth extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			flag: 'day',
		}
		this.nowDate = new Date();
		this.mounth = this.nowDate.getMonth() + 1;
		this.allMounth = LABELS3.slice(0, this.mounth);
		this.disabled = LABELS3.slice(this.mounth);
	}

	render() {
		return (
			<View style={styles.tabView}>
				<View>
					<Text style={{textAlign:'center'}}>{this.nowDate.getFullYear()}年{this.mounth}月</Text>
				</View>
				<ScrollableTabView
					renderTabBar={() => (
					<ScrollableTabBar
					underlineStyle={{backgroundColor: 'transparent'}}
					renderTab={this._renderTabBar.bind(this)}
					/>
				)}
					tabBarPosition='top'
					scrollWithoutAnimation={false}
				>
					{this.allMounth.map((label) => <MyRecordeList key={label} tabLabel={label} label={label}
																  type='month'/>)}
				</ScrollableTabView>
			</View>
		)
	}

	_renderTabBar(name, page, isTabActive, onPressHandler, onLayoutHandler) {
		var disabled = (null);
		if (this.allMounth.length - 1 == page) {
			disabled = this.disabled.map((p, i) => {
				return (
					<View key={i} style={styles.tabBarView}>
						<Text style={{color:'#AEAEAE'}}>
							{p}
						</Text>
					</View>
				)
			})
			return <Btn
				key={`${name}_${page}`}
				accessible={true}
				accessibilityLabel={name}
				accessibilityTraits='button'
				onPress={() => onPressHandler(page)}
			>
				<View style={{flexDirection:'row'}}>
					<View style={isTabActive?styles.tabBarViewActive:styles.tabBarView}>
						<Text>
							{name}
						</Text>
					</View>
					{disabled}
				</View>
			</Btn>
		}
		return <Btn
			key={`${name}_${page}`}
			accessible={true}
			accessibilityLabel={name}
			accessibilityTraits='button'
			onPress={() => onPressHandler(page)}
			onLayout={onLayoutHandler}
		>
			<View style={{flexDirection:'row'}}>
				<View style={isTabActive?styles.tabBarViewActive:styles.tabBarView}>
					<Text style={isTabActive?styles.tabTextActive:styles.tabTextActive}>
						{name}
					</Text>
				</View>
			</View>
		</Btn>
	}
}
const styles = {
	tabView: {
		flex: 1,
		flexGrow: 1,
		marginBottom: 70,
		borderBottomColor: '#D8D8D8',
		borderBottomWidth: 1,
	},
	tabBarViewActive: {
		backgroundColor: '#A1CC00',
		margin: 12,
		marginLeft: 6,
		padding: 8,
		paddingTop: 2,
		borderRadius: 20,
	},
	tabBarView: {
		margin: 12,
		marginLeft: 6,
		padding: 8,
		paddingTop: 2,
	}
};

