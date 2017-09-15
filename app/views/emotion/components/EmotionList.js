import React, {PureComponent} from "react";
import {ListView, ScrollView, View, Image, ToastAndroid, DeviceEventEmitter} from "react-native";
import {Text, Button} from "native-base";
import {good, calm, bad} from "./EmotionData";

/**
 * 情绪列表
 */
export default class EmotionList extends PureComponent {

	ds = new ListView.DataSource({
		rowHasChanged: (row1, row2) => row1 !== row2,
	});

	state = {
		dataSource1: this.ds.cloneWithRows(good),
		dataSource2: this.ds.cloneWithRows(calm),
		dataSource3: this.ds.cloneWithRows(bad),
	}

	render() {
		let {dataSource1, dataSource2, dataSource3} = this.state;
		return (
			<View style={styles.container}>
				<Text style={styles.titleText}>
					下面哪个宝宝代表你的心情?
				</Text>
				{this._renderGroup(dataSource1)}
				{this._renderGroup(dataSource2)}
				{this._renderGroup(dataSource3)}
			</View>
		)
	}

	_renderGroup(dataSource) {
		return (
			<View style={styles.oneGroup}>
				<ListView
					contentContainerStyle={styles.listContainer}
					dataSource={dataSource}
					renderRow={this._renderRow.bind(this)}
					horizontal
					pageSize={5}
					enableEmptySections
				/>
			</View>
		)
	}

	_renderRow(rowData) {
		let {onItemPress} = this.props;
		return (
			<Button transparent block style={styles.item} onPress={() => onItemPress(rowData)}>
				<Image source={rowData.img} style={styles.itemImg}/>
				<Text style={styles.itemText}>{rowData.title}</Text>
			</Button>
		)
	}

}

const styles = {
	container: {
		width: theme.deviceWidth,
        backgroundColor:'rgba(255,255,255,0.3)',
    },
    oneGroup: {
		width: theme.deviceWidth,
        borderBottomColor:'rgba(255,255,255,0.4)',
        borderBottomWidth:0.5,
    },
	listContainer: {
		// backgroundColor:'rgba(255,255,255,0.3)',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: theme.deviceWidth,
		paddingRight:20,
		paddingLeft:20,
		/*justifyContent: 'space-between',*/

	},
	item: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		width: 60,
		height: 60,
		marginRight:((theme.deviceWidth-40)-300)/5 ,
		marginBottom:8,
		marginTop:5
	},
	itemImg: {
		width: 40,
		height: 40,
		/*marginRight: 5,*/
	},
	itemText: {
		color: '#fff',
		fontSize: theme.DefaultFontSize - 2,
	},
    titleText:{
		color:'#fff',
        fontSize: theme.DefaultFontSize - 2,
        margin:15,
	},

};

EmotionList.propTypes = {
	onItemPress: React.PropTypes.func,
};
EmotionList.defaultProps = {
	onItemPress: () => {
	}
};


