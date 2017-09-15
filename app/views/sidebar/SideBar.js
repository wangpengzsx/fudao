import React, {PureComponent} from "react";
import {Image, TouchableOpacity,Platform} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {Grid, Col, Text, Icon, Button, View} from "native-base";
import {Container, Content} from "../../components/index";
import {DefaultTabBar} from "react-native-scrollable-tab-view";
import TabView from "./components/TabView";
import HealthEvaluation from "./HealthEvaluation";
import HealthRing from "./HealthRing";
import LifeCycle from "./LifeCycle";
import MyPosition from "./MyPosition";
import MyTime from "./MyTime";
import OfflineService from "./OfflineService";
import userStore from "../../mobx/userStore";


//const drawerCover = require('../../assets/my-photos/photo.jpg');

const tabs = [
	{
		text: '健康环',
		icon: require('../../assets/sidebar/shulan-2_06.png'),
		selectedIcon:require('../../assets/sidebar/shulan_06.png'),
		component: HealthRing
	},
	{
		text: '生命周期',
		icon: require('../../assets/sidebar/shulan-2_08.png'),
		selectedIcon: require('../../assets/sidebar/shulan_08.png'),
		component: LifeCycle
	},
	{
		text: '我的时间',
		icon: require('../../assets/sidebar/shulan-2_10.png'),
		selectedIcon: require('../../assets/sidebar/shulan_10.png'),
		component: MyTime
	},
	{
		text: '我的位置',
		icon: require('../../assets/sidebar/shulan-2_12.png'),
		selectedIcon: require('../../assets/sidebar/shulan_12.png'),
		component: MyPosition
	},
	/*{
		text: '线下服务',
		icon: require('../../assets/sidebar/shulan-2_16.png'),
		selectedIcon: require('../../assets/sidebar/shulan_16.png'),
		component: OfflineService
	}*/
]

export default class SideBar extends PureComponent {

	state = {
		activeTab: 0
	}

	render() {
		let textStyle = Object.assign({}, styles.tabBarItemText, styles.tabBarItemTextSelected);
		let {loginUser} = userStore;
		let drawerCover = {uri: urls.getImage(userStore.loginUser.photo, 300, 300)};
		return (
			<Container>
				<Content>
					<Grid style={{marginTop:Platform.OS=='ios'?20:0}}>
						<Col style={styles.sidebar}>
							<Button transparent
									style={styles.tabButton}
									onPress={() => Actions.pop()}>
								<Text style={textStyle}>{'<<返回主页'}</Text>
							</Button>
							{this.renderAvater()}
							{tabs.map((item, index) => this.renderTabBar(item, index))}
						</Col>
						<Col>
							<TabView ref={(e) => this._tabView = e} tabs={tabs}
									 onChangeTab={(event) => this._onChangeTab(event)}/>
						</Col>
					</Grid>
				</Content>
			</Container>
		);
	}

	renderAvater() {
		let {loginUser} = this.props;
		return (
			<View style={styles.avatar}>
				<TouchableOpacity>

					<Image
						source={{uri: urls.getImage(userStore.loginUser.photo, 300, 300)}}
						style={styles.thumbnail}/>
				</TouchableOpacity>
			</View>
		)
	}

	renderTabBar(item, index) {

		let itemStyle = styles.tabBarItem,
			textStyle = styles.tabBarItemText,
			iconStyle = styles.tabBarItemIcon,
			iconName = item.icon;
		if (this.state.activeTab === index) {
			itemStyle = Object.assign({}, styles.tabBarItem, styles.tabBarItemSelected);
			textStyle = Object.assign({}, styles.tabBarItemText, styles.tabBarItemTextSelected);
			iconStyle = Object.assign({}, styles.tabBarItemIcon, styles.tabBarItemTextSelected);
			iconName = item.selectedIcon;
		}

		return (
			<Button
				key={index}
				transparent
				onPress={() => this._goToPage(index)}
				style={itemStyle}
			>
				<Image source={iconName} style={{width: 24,height: 24}}/>
				<Text style={textStyle}>{item.text}</Text>
			</Button>
		)
	}

	_goToPage(index) {
		this._tabView.goToPage(index);
	}

	_onChangeTab(event) {
		this.setState({
			activeTab: event.i
		})
	}
}
const sideBarWidth = 55;
const styles = {
	sidebar: {
		backgroundColor: '#333',
		width: sideBarWidth
	},
	avatar: {
		width: sideBarWidth,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	thumbnail: {
		width: 40,
		height: 40,
		borderWidth: 1,
		borderColor: '#efefef',
	},
	tabBarItem: {
		flexDirection: 'column',
		paddingLeft: 0,
		paddingRight: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: sideBarWidth,
		marginTop: 20,
		borderRadius: 0,
	},
	tabBarItemSelected: {
		backgroundColor: '#FFFFFF',
	},
	tabBarItemIcon: {
		fontSize: 24,
		color: '#FFFFFF',
	},
	tabBarItemText: {
		fontSize: 10,
		color: '#FFFFFF',
	},
	tabBarItemTextSelected: {
		color: theme.brandPrimary
	},
	tabButton:{
		justifyContent: 'center',
		alignItems: 'center',
		width: sideBarWidth,
		flexDirection: 'column',
		paddingLeft: 0,
		paddingRight: 0,
		backgroundColor:'rgba(0,0,0,.0)',
		marginTop:20
	}
}


const mapStateToProps = state => ({
	...state.user,
});
