import React, {Component} from "react";
import {StyleSheet, View, TouchableOpacity, Image} from "react-native";

const tabImages = [
	require('../../../assets/disease/liaoshen.png'),
	require('../../../assets/disease/liaoxin.png')
]

export default class AllDiseaseTabBar extends Component {

	static propType = {
		goToPage: React.PropTypes.func,
		activeTab: React.PropTypes.number,
		tabs: React.PropTypes.array,
		tabNames: React.PropTypes.array,
		tabIconNames: React.PropTypes.array
	};

	render() {
		let {activeTab,pageKey} = this.props;
		let tabImages = pageKey === 'disease' ? [
            require('../../../assets/disease/liaoshen.png'),
            require('../../../assets/disease/liaoxin.png')
        ] : [
            require('../../../assets/disease/xiushen.png'),
            require('../../../assets/disease/xiuxin.png')
        ]
		return (
			<View style={styles.tabs}>
				{tabImages.map((img, i) => this.renderItem(img, i))}
			</View>
		)
	}

	renderItem(img, i) {
		let {activeTab} = this.props;
		return (
			<TouchableOpacity
				key={i}
				activeOpacity={0.8}
				style={[styles.tab, activeTab === i ? styles.tabSelected :{}]}
				onPress={() => this.props.goToPage(i)}
			>
				<View style={styles.tabItem}>
					<Image source={img} style={styles.image}/>
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
		height: 35, width: 60
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
		borderBottomColor: '#FFF'
	}
}