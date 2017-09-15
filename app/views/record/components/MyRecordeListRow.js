import React, {Component} from "react";
import {View,TouchableOpacity} from "react-native";
import {ListItem, Text, List} from "native-base";


export default class MyRecordeListRow extends Component {

	render() {
		return (
			<TouchableOpacity
				style={this.props.type=='day'?styles.myRecordeListRow:[styles.myRecordeListRow,styles.Month]}
				onPress={()=>this.props.gotoDetail()}
			>
				<View style={styles.twoLine}>
					<Text style={styles.color000}>{this.props.row.timePeriod}</Text>
					<Text style={styles.color000}>{this.props.row.startTime}</Text>
				</View>
				<View style={this.props.type=='day'?{ width:100 }:{ width:200 }}>
					{this.renderList()}
				</View>
			</TouchableOpacity>
		)
	}

	renderList() {
		if (this.props.type != 'day') {
			if(this.props.row.methodName){
				return null;
			}
			return (
				<List dataArray={this.props.row.content} renderRow={(data) =>
					<ListItem style={styles.listItem}>
						<Text style={{color:'#A4A4A4'}}>{data.time}  {data.content}</Text>
					</ListItem>
				}/>
			)
		}
		if(this.props.row.type==0){
			// var allYinshiArr = JSON.parse(this.props.row.threeCharacterClassic)
			var methodName = '';
			var thress = JSON.parse(this.props.row.threeCharacterClassic);
			if (thress instanceof Array) {
				methodName = thress.join('，');
			} else {
				var thressAll = [];
				if (thress.dishes.length > 0) {
					thressAll = thress.dishes;
				}
				if (thress.staple.length > 0) {
					thressAll = thressAll.length > 0 ? thressAll.concat(thress.staple) : thress.staple;
				}
				methodName = thressAll.join('，');
			}
		}

		return (
			<Text style={styles.colorA4}>{this.props.row.methodName||methodName}</Text>
		)
	}

}

const styles = {
	myRecordeListRow: {
		backgroundColor: '#fff',
		margin: 20,
		marginTop: 10,
		marginBottom: 0,
		borderRadius: 10,
		padding: 16,
		flexDirection: 'row',
		alignItems: 'center',
	},
	myRecordeListRowMonth: {
		alignItems: 'flex-start',
	},
	color000: {
		color: '#000',
	},
	colorA4: {
		color: '#A4A4A4',
		textAlign: 'center',
	},
	twoLine: {
		flex: 1,
	},
	listItem: {
		padding: 0,
		margin: 0,
		borderColor: 'transparent'
	}
}
