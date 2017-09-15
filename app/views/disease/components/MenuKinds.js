import React, {PureComponent} from "react";
import {Actions} from "react-native-router-flux";
import {View, TouchableOpacity, TouchableHighlight, Alert, Image, Modal, Dimensions, ScrollView} from "react-native";
import {Text, Button} from "native-base";
import {Container, Content, Header} from "../../../components/index";
/**
 * 菜谱
 */

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export default class Menukinds extends PureComponent {
    constructor(props) {
        super(props);
        this.state={
          activeBar:0,
			idOrName:this.props.idOrName,
          	arr:this.props.arr,
        }
    }
    componentWillMount(){
        let {idOrName,arr}=this.props;
        for(var i=0;i<arr.length;i++){
            if(arr[i]==idOrName){
                this.setState({
                    activeBar:i
                })
            }
        }
        request.getJson(urls.apis.INGREDIENT_GETINGREDIENT,{
			name:idOrName
		}).then((result) => {
            this.setState({
                    data:result.obj,
                })
        }, (error) => {
		});
		request.getJson(urls.apis.COOKBOOK_GETCOOKBOOKLIST,{
			ingredient:idOrName,
			num:4
		}).then((result) => {
            // tools.showToast(JSON.stringify(result))
			this.setState({
				caiPu:result.obj,
			})
		}, (error) => {
		});
	}

	render() {
		let {data,caiPu,arr} = this.state;
		let tab=arr;
		if (!data ||!caiPu) {
			return (<Container></Container>)
		} else {
			let cai = (null);
			if (caiPu.length != 0) {
				cai = (
					<View>
						<Text style={{textAlign:'center',marginTop:10}}>推荐菜谱</Text>
						<View style={styles.caiPuBox}>
							{caiPu.map((item, index) => this.renderCaiPu(item, index))}
						</View>
					</View>
				)
			}
			return (
				<Container>
					<Header back {...this.props}></Header>
					<Content white>
						<ScrollView>
							<View style={styles.bar}>
                                {tab.map((item, index) => this.renderTab(item, index))}
							</View>
							<View style={styles.imgBox}>
								<Image source={{uri: urls.getImage(data.img,width,200)}}
									   style={styles.img}></Image>
							</View>
							<View style={styles.textBox}>
								<Text>        {data.abstract}</Text>
							</View>
							<View style={{flexDirection:'row',justifyContent:'center',marginTop:10}}>
								<Text>{data.name}</Text>
								<Text>的营养价值表(每100g)</Text>
							</View>
							<View style={styles.yyBox}>
								<View style={styles.yyBag}>
									<View style={styles.yyName}>
										<Text style={styles.doc}>碳水化合物</Text>
									</View>
									<View style={styles.yyName}>
										<Text style={styles.doc}>胆固醇(毫克)</Text>
									</View>
									<View style={styles.yyName}>
										<Text style={styles.doc}>膳食纤维(克)</Text>
									</View>
									<View style={styles.yyName}>
										<Text style={styles.doc}>能量(千卡)</Text>
									</View>
									<View style={styles.yyName}>
										<Text style={styles.doc}>脂肪(克)</Text>
									</View>
								</View>
								<View style={styles.yyBag}>
									<View style={styles.yyBz}>
										<Text style={styles.doc}>{data.carbohydrate}</Text>
									</View>
									<View style={styles.yyBz}>
										<Text style={styles.doc}>{data.cholesterol}</Text>
									</View>
									<View style={styles.yyBz}>
										<Text style={styles.doc}>{data.dietary_fiber}</Text>
									</View>
									<View style={styles.yyBz}>
										<Text style={styles.doc}>{data.energy}</Text>
									</View>
									<View style={styles.yyBz}>
										<Text style={styles.doc}>{data.fat}</Text>
									</View>
								</View>
							</View>
                            {cai}
						</ScrollView>
					</Content>
				</Container>
			);
		}

	}

	renderTab(item, index) {
		let itemStyle = styles.button;
		if (this.state.activeBar === index) {
			itemStyle = Object.assign({}, styles.button, styles.buttonSelected);
		}
		return (
			<Button
				key={index}
				transparent
				onPress={() => this._goToPage(item,index)}
				style={itemStyle}
			>
				<Text style={styles.textBar}>{item}</Text>
			</Button  >
		)
	}
	renderCaiPu(item, index) {
		return (
			<TouchableOpacity key={index} style={styles["menu"+index]}
							  onPress={() =>this.detail(item,index)}
			>
				<Text style={styles.doc}>{item.name}</Text>
			</TouchableOpacity>
		)
	}

	_goToPage(item, index) {
		this.setState({
			activeBar: index,
		});
		request.getJson(urls.apis.INGREDIENT_GETINGREDIENT,{
			name:item
		}).then((result) => {
			this.setState({
				data:result.obj,
			})
		}, (error) => {
		});
		request.getJson(urls.apis.COOKBOOK_GETCOOKBOOKLIST,{
			ingredient:item,
			num:4
		}).then((result) => {
			this.setState({
				caiPu:result.obj,
			})
		}, (error) => {
		});
	}

	detail(item, index) {
		Actions['menuDetail']({item: item, index: index})
	}
}

const styles = {
	textBar: {
		color: '#333',
		fontSize: 16,
		textAlign: 'center'
	},
	bar: {
		height: 42,
		flexDirection: 'row',
		backgroundColor: '#EDEDED'

	},
	imgBox: {
		height: 200,
		backgroundColor: '#fff',
		justifyContent: 'center',
	},
	img: {
		width: width,
		height: 200,
	},
	button: {
		flex: 1,
		justifyContent: 'center'
	},
	buttonSelected: {
		backgroundColor: "#fff",
	},
	textBox: {
		height: 50,
		flexDirection: 'row',
		paddingLeft: 10,
		paddingRight: 10
	},
	yyBox: {
		marginTop: 10,
		height: 80,
	},
	yyBag: {
		flex: 1,
		flexDirection: 'row',
	},
	yyName: {
		height: 40,
		flex: 1,
		backgroundColor: '#C5D8E6',
		borderColor: '#fff',
		borderWidth: 1,
		justifyContent: 'center'
	},
	yyBz: {
		height: 40,
		flex: 1,
		backgroundColor: '#EDEDED',
		borderColor: '#fff',
		borderWidth: 1,
		justifyContent: 'center'
	},
	doc: {
		textAlign: 'center',
		fontSize: theme.DefaultFontSize - 2,
	},
	caiPuBox: {
		marginTop: 10,
		height: 100,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	menu0: {
		height: 46,
		backgroundColor: '#F1F7ED',
		borderColor: '#fff',
		borderWidth: 2,
		justifyContent: 'center',
		width: '50%'
	},
	menu1: {
		height: 46,
		backgroundColor: '#F9F1EF',
		borderColor: '#fff',
		borderWidth: 2,
		justifyContent: 'center',
		width: '50%'
	},
	menu2: {
		height: 46,
		backgroundColor: '#F4F5E5',
		borderColor: '#fff',
		borderWidth: 2,
		justifyContent: 'center',
		width: '50%'
	},
	menu3: {
		height: 46,
		backgroundColor: '#EDF4FE',
		borderColor: '#fff',
		borderWidth: 2,
		justifyContent: 'center',
		width: '50%'
	},
	mb1: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	box1: {
		width: width * 0.9,
		borderWidth: 1,
		borderColor: '#fff',
		backgroundColor: '#fff',
		borderRadius: 5
	},
	img1: {
		width: width * 0.9,
		height: 200,
	},
	cpBar: {
		height: 30,
		borderTopWidth: 1,
		borderColor: '#E2E2E2',
		backgroundColor: '#F0F0F0',
		justifyContent: 'center',
		paddingLeft: 10,
		paddingRight: 10,
	},
	cp: {
		borderTopWidth: 1,
		borderColor: '#E2E2E2',
		backgroundColor: '#fff',
		justifyContent: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 4,
		paddingBottom: 4,
	},
	cpBox: {
		paddingLeft: 10,
	}
};

