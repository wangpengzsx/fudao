import React, {Component} from "react";
import {StyleSheet, View, TouchableOpacity, Image} from "react-native";
import {Text} from "native-base";

const tabImages = {
	"饮食": [require('../../../assets/disease/yinshi.png'), require('../../../assets/disease/yinshi1.png')],
	"起居": [require('../../../assets/disease/qiju.png'), require('../../../assets/disease/qiju1.png')],
	"动": [require('../../../assets/disease/dong.png'), require('../../../assets/disease/dong1.png')],
	"静": [require('../../../assets/disease/jing.png'), require('../../../assets/disease/jing1.png')],
	"娱乐": [require('../../../assets/disease/xiuxian.png'), require('../../../assets/disease/xiuxian1.png')],
}

export default class DiseaseMethodTabBar extends Component {

	static propType = {
		goToPage: React.PropTypes.func,
		activeTab: React.PropTypes.number,
		tabs: React.PropTypes.array,
		tabNames: React.PropTypes.array,
		tabIconNames: React.PropTypes.array
	};

	render() {
		let {tabs, activeTab} = this.props;
		return (
			<View style={styles.tabs}>
				{tabs.map((tab, i) => this.renderItem(tab, i))}
			</View>
		)
	}

	renderItem(tab, i) {
		let {activeTab} = this.props,
			textStyle = {...styles.text};

		if (activeTab === i) {
			textStyle.color = '#000';
		}
		return (
			<TouchableOpacity
				key={i}
				activeOpacity={0.8}
				style={[styles.tab, activeTab === i ? styles.tabSelected :{}]}
				onPress={() => this.props.goToPage(i)}
			>
				<View style={styles.tabItem}>
					<Image source={tabImages[tab][activeTab !== i?1:0]} style={styles.image}/>
					<Text style={textStyle}>{tab}</Text>
					{activeTab !== i || <View style={styles.sanjiao}/>}
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = {
	tabs: {
		flexDirection: 'row',
		height: 50,
		backgroundColor: '#8294B4',

	},

	tab: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#8294B4',
	},
	tabSelected: {
		backgroundColor: '#9FADC6',
	},
	tabItem: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	image: {
		height: 25, width: 25
	},
	text: {
		color: '#FFF',
		fontSize: theme.fontSizeH6
	},
	sanjiao: {
		width: 0,
		height: 0,
		marginBottom: -8,
		borderLeftWidth: 8,
		borderLeftColor: 'transparent',
		borderRightWidth: 8,
		borderRightColor: 'transparent',
		borderBottomWidth: 8,
		borderBottomColor: '#FFF',
	}
}