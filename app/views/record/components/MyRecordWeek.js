import React, {PureComponent} from "react";
import {View, ToastAndroid} from "react-native";
import {Text} from "native-base";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import MyRecordeList from "./MyRecordeList";
const Btn = require('./Button');
const LABELS2 = ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周'];


/**
 * 我的周记录
 */
export default class MyRecordWeek extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			flag: 'day',
		}
		this.nowDate = new Date();
		var lastCurDay = new Date(this.nowDate.getFullYear(), this.nowDate.getMonth() + 1, 0);
		this.week = this.getMonthWeek(lastCurDay.getFullYear(), lastCurDay.getMonth(), lastCurDay.getDate());
		this.allWeek = LABELS2.slice(0, this.week);
	}

	render() {
		return (
			<View style={styles.tabView}>
				<View style={styles.topView}>
					<Text>{this.nowDate.getMonth()}月</Text>
					<Text style={styles.topCenter}>{this.nowDate.getFullYear()}年{this.nowDate.getMonth() + 1}月</Text>
					<Text style={styles.colorAE}>{this.nowDate.getMonth() + 2}月</Text>
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
					{this.allWeek.map((label) => <MyRecordeList key={label} tabLabel={label} label={label}
																type='week'/>)}
				</ScrollableTabView>
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
		>
			<View style={isTabActive?styles.tabBarViewActive:styles.tabBarView}>
				<Text>
					{name}
				</Text>
			</View>
		</Btn>;
	}

	getMonthWeek(a, b, c) {
		var date = new Date(a, b, c), w = date.getDay(), d = date.getDate();
		return Math.ceil(
			(d + 6 - w) / 7
		);
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
