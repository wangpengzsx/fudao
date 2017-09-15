import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import {Actions} from "react-native-router-flux";
import {View, Image, Text} from "react-native";
import {Button} from "native-base";
import {Container, Content, Header,Modal} from "../../components/index";
import MyDiseaseList from "./components/MyDiseaseList";
import DiseaseMethodTabView from "./components/DiseaseMethodTabView";
import QuestionText from "../components/QuestionText"
import DetailModal from "./components/DetailModal"
import BodyModal from "./components/BodyModal"
import TeachModal from "./components/TeachModal"
import expectMethodStore from "../../mobx/expectMethodStore";
import myExpectListStore from "../../mobx/myExpectListStore";
import allExpectListStore from "../../mobx/allExpectListStore";
import questionStore from "../../mobx/questionStore";


@observer
export default class ExpectDetail extends PureComponent {

    componentDidMount(){
        expectMethodStore.fetchExpectMethod()
    }

    onTransPress(item){
        myExpectListStore.selectedItem = item
        allExpectListStore.selectedItem = item
        expectMethodStore.expectId = item.id
        expectMethodStore.fetchExpectMethod()
        allExpectListStore.fetchData()
    }

    onItemRemove(item,i) {
        let {myDiseaseList,deleteMyDiseaseListItem} = myDiseaseListStore;
        myDiseaseList.splice(i, 1);
        deleteMyDiseaseListItem(item.id)
        allExpectListStore.fetchAllExpectList()
    }

	render() {
        let {myExpectList,selectedItem} = myExpectListStore;
        const {expectMethod} = expectMethodStore;
        const {modalShow,questionId} = questionStore;

        return (
			<Container>
                <Header title = {selectedItem.name || this.props.title}/>
				<Content delay>
					<View style={{backgroundColor:'transparent'}}>
						<Text style={styles.title}>我的问题</Text>
					</View>
					<MyDiseaseList
						data={myExpectList}
						onTransPress = {(item) => this.onTransPress(item)}
						onItemRemove={(item,i) => this.onItemRemove(item,i)}
						selectedItemId={selectedItem.id}
					/>
					<DiseaseMethodTabView data={expectMethod} pageKey={'expect'}/>
					{/*<Button transparent style={styles.btnStyle} onPress={()=> questionStore.jlModalShow=true}>*/}
						{/*<Image source={require('../../assets/disease/jingluo.png')} style={styles.image}/>*/}
					{/*</Button>*/}
                    {allExpectListStore.selectedItem.part == '精神' ? <View/> : <Button transparent style={styles.btnStyle} onPress={() => Actions.body({pageKey:'expect',title:selectedItem.name})}>
                        <Image source={require('../../assets/disease/jingluo.png')} style={styles.image}/>
                    </Button>}
				</Content>
                <DetailModal visible={modalShow}>
                    <QuestionText data={questionId} from={'expect'}/>
                </DetailModal>
                <BodyModal visible={questionStore.jlModalShow} pageKey={'expect'}/>
                <TeachModal visible={questionStore.teachModalShow} pageKey={'expect'}/>
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
