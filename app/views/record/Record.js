import React, {PureComponent} from "react";
import {View} from "react-native";
import {Button, Text} from "native-base";
import {Container, Content, Header} from "../../components/index";
import {ScrollableTabBar} from "react-native-scrollable-tab-view";
import MyRecordDay from "./components/MyRecordDay";
import MyRecordWeek from "./components/MyRecordWeek";
import MyRecordMonth from "./components/MyRecordMonth";


/**
 * 我的记录
 */
export default class Record extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			flag: 'day',
		}
	}

	render() {
		return (
			<Container>
				<Header {...this.props}/>
				<Content delay gray>
					{this.state.flag == 'day' ? <MyRecordDay /> : (this.state.flag == 'week' ? <MyRecordWeek /> :
							<MyRecordMonth />)}
{/*		底部日记录、周记录、月记录按钮
	<View style={styles.typeTitle}>
						<Button transparent onPress={()=> {
							this.setState({flag: 'day'})
						}}
								style={this.state.flag == 'day' ? styles.titleButtonLeft : styles.titleButtonAll}>
							<Text
								style={this.state.flag == 'day' ? styles.titleTextChoosed : styles.titleText}>日记录</Text>
						</Button>
						<Button transparent onPress={()=> {
							this.setState({flag: 'week'})
						}}
								style={this.state.flag == 'week' ? styles.titleButtonCenter : styles.titleButtonAll}>
							<Text
								style={this.state.flag == 'week' ? styles.titleTextChoosed : styles.titleText}>周记录</Text>
						</Button>
						<Button transparent onPress={()=> {
							this.setState({flag: 'month'})
						}}
								style={this.state.flag == 'month' ? styles.titleButtonRight : styles.titleButtonAll}>
							<Text
								style={this.state.flag == 'month' ? styles.titleTextChoosed : styles.titleText}>月记录</Text>
						</Button>
					</View>*/}
				</Content>

			</Container>
		)
	}
}
const styles = {
	tabView: {
		flex: 1,
		flexGrow: 1,
	},
	typeTitle: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		margin: 20,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#D8D8D8',
		overflow: 'hidden',
		position: 'absolute',
		bottom: 20,
		left: 0,
	},
	titleText: {
		color: '#000',
		fontSize: 14,
	},
	titleTextChoosed: {
		color: '#fff',
		fontSize: 14,
	},
	titleButtonLeft: {
		flex: 1,
		backgroundColor: '#A1CC00',
		borderRadius: 14,
		height: 30,
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0,
		justifyContent: 'center',
	},
	titleButtonCenter: {
		flex: 1,
		backgroundColor: '#A1CC00',
		height: 30,
		justifyContent: 'center',
	},
	titleButtonRight: {
		flex: 1,
		backgroundColor: '#A1CC00',
		borderRadius: 14,
		height: 30,
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0,
		justifyContent: 'center',
	},
	titleButtonAll: {
		flex: 1,
		height: 30,
		justifyContent: 'center',
	}
};
