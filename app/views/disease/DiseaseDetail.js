import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import {View, Image, Text} from "react-native";
import {Button,Left,Icon} from "native-base";
import {Actions} from "react-native-router-flux";
import {Container, Content, Header,Modal} from "../../components/index";
import MyDiseaseList from "./components/MyDiseaseList";
import DiseaseMethodTabView from "./components/DiseaseMethodTabView";
import QuestionText from "../components/QuestionText"
import DetailModal from "./components/DetailModal"
import BodyModal from "./components/BodyModal"
import TeachModal from "./components/TeachModal"
import allDiseaseListStore from "../../mobx/allDiseaseListStore";
import myDiseaseListStore from "../../mobx/myDiseaseListStore";
import diseaseMethodStore from "../../mobx/diseaseMethodStore";
import questionStore from "../../mobx/questionStore";

@observer
export default class DiseaseDetail extends PureComponent {

    componentDidMount(){
        diseaseMethodStore.fetchDiseaseMethod()
    }

    onTransPress(item){
        myDiseaseListStore.selectedItem = item
        allDiseaseListStore.selectedItem = item
        diseaseMethodStore.diseaseId = item.id
        diseaseMethodStore.fetchDiseaseMethod()
	}

    onItemRemove(item,i) {
        let {myDiseaseList,deleteMyDiseaseListItem} = myDiseaseListStore;
        myDiseaseList.splice(i, 1);
        deleteMyDiseaseListItem(item.id)
        allDiseaseListStore.fetchAllDiseaseList()
    }

	render() {
        let {myDiseaseList,selectedItem} = myDiseaseListStore;
        const {diseaseMethod} = diseaseMethodStore;
        const {modalShow,questionId} = questionStore;
		return (
			<Container>
				<Header title = {selectedItem.name || this.props.title} left={
                    <Left>
                        <Button transparent onPress={this.props.pageKey == 'zicha'?  ()=>Actions.index() : ()=> Actions.pop()}><Icon
                            name="arrow-back"/></Button>
                    </Left>
                }/>
				<Content delay>
                    <View style={{backgroundColor:'transparent'}}>
						<Text style={styles.title}>我的问题</Text>
					</View>
					<MyDiseaseList
						data={myDiseaseList}
						onTransPress = {(item) => this.onTransPress(item)}
						onItemRemove={(item,i) => this.onItemRemove(item,i)}
						selectedItemId={selectedItem.id}
					/>
					<DiseaseMethodTabView data={diseaseMethod} pageKey={'disease'}/>
					{/*<Button transparent style={styles.btnStyle} onPress={()=> questionStore.jlModalShow =true}>*/}
						{/*<Image source={require('../../assets/disease/jingluo.png')} style={styles.image}/>*/}
					{/*</Button>*/}
                    {allDiseaseListStore.selectedItem.type == '精神' ? <View/> : <Button transparent style={styles.btnStyle} onPress={() => Actions.body({pageKey:'disease',title:selectedItem.name})}>
                        <Image source={require('../../assets/disease/jingluo.png')} style={styles.image}/>
                    </Button>}
				</Content>
                <DetailModal visible={modalShow}>
                    <QuestionText data={questionId} from={'disease'}/>
                </DetailModal>
                <BodyModal visible={questionStore.jlModalShow} pageKey={'disease'}/>
                <TeachModal visible={questionStore.teachModalShow} pageKey={'disease'}/>
			</Container>
		)
	}
}

const styles = {
	title: {
		fontSize: theme.DefaultFontSize,
		color: '#FFF',
		fontWeight: '400',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 12,
	},
    btnStyle:{
        width: 65,
        height: 65,
        position: 'absolute',
        right:0,
        bottom: 100,
        backgroundColor:'rgba(0,0,0,.0)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image:{
        width:50,
        height:50
    }
}
