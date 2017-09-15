import React, {PureComponent} from "react";
import {View, ScrollView, TouchableHighlight, TouchableOpacity, TextInput} from "react-native";
import {Text} from "native-base";
import {observer} from "mobx-react/native";
import {Actions} from "react-native-router-flux";
import {Container, Header} from "../../components/index";
import CommonList from "./components/CommonList";
import diagnosisStore from "../../mobx/diagnosiStore";
import positionStore from "../../mobx/positionStore";
// import allDiseaseListStore from "../../mobx/allDiseaseListStore";
// import diseaseMethodStore from "../../mobx/diseaseMethodStore";
// import myDiseaseListStore from "../../mobx/myDiseaseListStore";

var i = 0;
/**
 * 自诊
 */
@observer
export default class Diagnosis extends PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			text: "",
			diagnosisList: []
		}
	}

	componentWillMount() {
		let {currentPosition} = positionStore;
		request.getJson(urls.apis.DIAGNOSIS_GETCOMMONDISEASELIST, {
			region: currentPosition.city
		}).then((result) => {
			if (result.ok) {
				this.setState({
					// diagnosisList:diagnosisList
					diagnosisList: result.obj
				})
			} else {
				tools.showToast('请求出错！')
			}
		});
	}


	render() {
		const {isFetching, diagnosisDisease} = diagnosisStore;
		const {diagnosisList, text} = this.state;
		i = 0;
		if (diagnosisList.length > 0) {
			return (
				<Container>
					<Header {...this.props}/>
					<View style={styles.content}>
						<View style={{backgroundColor:'transparent'}}>
							<Text style={styles.h1}>在以下问题中选出您存在的问题</Text>
						</View>
						<View style={styles.questionList}>
							<ScrollView style={{flex: 1}}>
								{this.renderList(diagnosisList)}
								<View style={styles.customize}>
									<TextInput style={styles.textInput} onChangeText={(text) => this.setState({text})}
											   value={this.state.text} placeholder="找不到您的问题？那就写下来吧！"
											   placeholderTextColor="rgba(200,200,200,0.6)"
											   multiline={true}
											   underlineColorAndroid="transparent"/>
									<TouchableOpacity style={styles.customizeButton}
													  onPress={text ? this.addCustomizeDisease.bind(this) : null}>
										<Text style={styles.customizeButtonText}>确定</Text>
									</TouchableOpacity>
								</View>
							</ScrollView>
							<View style={styles.questionChoosed}>
								<ScrollView style={styles.choosedScrollView}>
									{this.renderChoosed(diagnosisDisease)}
								</ScrollView>
								<View style={styles.buttonContainer}>
									<TouchableOpacity style={diagnosisDisease.length>0?styles.button:styles.button2}
													  onPress={() => diagnosisDisease.length>0?this.gotoCeping(false):null}>
										<Text style={styles.buttonText}>完成自查</Text>
									</TouchableOpacity>
									<TouchableOpacity style={styles.button} onPress={() => this.gotoCeping(true)}>
										<Text style={styles.buttonText}>继续自测</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>

					</View>
				</Container>
			)
		} else {
			return (
				<Container>
					<Header {...this.props}/>
					{/*<Loading isShow={isFetching}/>*/}
				</Container>
			)
		}
	}

	renderList(list) {
		const {diagnosisDiseaseOrderBy} = diagnosisStore;
		console.log(list);
		i = 0;
		var listView = list.map((items, index) => {
			if (items.list.length > 0) {
				i++;
				return (
					<CommonList key={index} items={items} selectedItem={diagnosisDiseaseOrderBy}
								onItemAdd={(item) => this._onItemAdd(item)}/>
				)
			}
			return null;
		})
		var res = i <= 2 ?
			(
				<View style={styles.oneLine}>
					{listView}
				</View>
			)
			:
			listView[0] && listView[1] ?
				(<View>
					<View style={styles.oneLine}>
						{listView.slice(0, 2)}
					</View>
					<View style={styles.oneLine}>
						{listView.slice(2, 4)}
					</View>
				</View>)
				:
				(
					(<View>
						<View style={styles.oneLine}>
							{listView.slice(0, 3)}
						</View>
						<View style={styles.oneLine}>
							{listView.slice(3, 4)}
						</View>
					</View>)
				);

		return res;

	}

	renderChoosed(diagnosis) {
		if (diagnosis.length == 0) {
			var list = (
				<View style={styles.tishiView}>
					<Text style={styles.tishi}>点击添加上面的问题到这里</Text>

				</View>
			)
		} else {
			var list = diagnosis.map((item, index) => {
				return (
					<View style={styles.row} key={index}>
						<TouchableOpacity underlayColor='transparent' onPress={this.delChoosed.bind(this, index)}
										  style={{flexDirection: 'row'}}>
							<Text style={styles.rowTitle}>{item.name}</Text>

							<Text style={styles.deleteChoosed}>一</Text>
						</TouchableOpacity>
					</View>
				)
			});
		}


		return (
			<View style={styles.chooseView}>
				{list}
			</View>
		)
	}

	delChoosed(index) {
		diagnosisStore.delDisease(index);
	}

	_onItemAdd(item) {
		diagnosisStore.addDisease(item);
	}

	addCustomizeDisease() {
		diagnosisStore.addDisease({
			name: this.state.text
		});
		this.setState({
			text: ''
		})
	}

	gotoCeping(flag) {
		diagnosisStore.addMyDiseaseToBackstage(flag);
		if (flag) {
			Actions.evaluation()
		}
	}

}
const styles = {
	content: {
		flex: 1,

	},
	h1: {
		color: "#fff",
		fontSize: 16,
		marginLeft: 16,
	},
	questionList: {
		flex: 1,
	},
	oneLine: {
		flexDirection: 'row',
		marginLeft: 10,
		// marginRight: 2,
		flexWrap: 'wrap',
	},
	customize: {
		margin: 10,
		backgroundColor: 'rgba(255,255,255,0.4)',
		borderWidth: 0.5,
		borderColor: '#fff',
		flexDirection: 'row',
		padding: 8,
	},
	textInput: {
		height: 40,
		flex: 1,
		textAlignVertical: 'top',
		padding: 0,
		margin: 0,
		color: "rgba(200,200,200,0.6)"
	},
	customizeButton: {
		height: 40,
		backgroundColor: '#C4D2DF',
		borderRadius: 5,
		justifyContent: 'center'
	},
	customizeButtonText: {
		color: '#6B7577',
		fontSize: 18,
		padding: 7,
		// textAlignVertical: 'center',
		// paddingTop: 10
	},
	tishiView: {
		width: theme.deviceWidth,
	},
	tishi: {
		color: "#909193",
		fontSize: 16,
		marginTop: theme.deviceHeight / 10,
		textAlign: 'center',
	},
	questionChoosed: {
		height: theme.deviceHeight / 3,
		backgroundColor: "#fff",
		flexDirection: 'column'
	},
	choosedScrollView: {
		flex: 1,
	},
	buttonContainer: {
		flexDirection: 'row',
		height: 70,
		paddingTop: 18,
		// paddingBottom:15,
		justifyContent: 'space-around',
		backgroundColor: '#EBEBEB'
	},
	button: {
		backgroundColor: "#A1CF00",
		width: (theme.deviceWidth - 30) / 2,
		height: 36,
		borderRadius: 5,
		justifyContent: 'center'
	},
	button2: {
		backgroundColor: "#ccc",
		width: (theme.deviceWidth - 30) / 2,
		height: 36,
		borderRadius: 5,
		justifyContent: 'center'
	},
	buttonText: {
		color: '#fff',
		padding: 5,
		fontSize: 15,
		textAlign: 'center',
	},
	chooseView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	row: {
		backgroundColor: '#C2C2C2',
		flexDirection: 'row',
		margin: 4,
		height: 30,
	},
	rowTitle: {
		padding: 4,
	},
	deleteChoosed: {
		padding: 5,
		fontSize: 12,
		fontWeight: '500',
		color: '#fff',
	}
};
