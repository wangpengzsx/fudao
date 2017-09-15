import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import {Actions} from "react-native-router-flux";
import {View, Image, Text} from "react-native";
import {Container, Content, Header} from "../../components/index";
import MyDiseaseList from "./components/MyDiseaseList";
import AllDiseaseTabView from "./components/AllDiseaseTabView";
import allDiseaseListStore from "../../mobx/allDiseaseListStore";
import diseaseMethodStore from "../../mobx/diseaseMethodStore";
import myDiseaseListStore from "../../mobx/myDiseaseListStore";

/**
 * 我的问题
 */
@observer
export default class Disease extends PureComponent {

    componentDidMount(){
        myDiseaseListStore.fetchMyDiseaseList()
        allDiseaseListStore.fetchAllDiseaseList()
    }

    onItemPress(item){
        myDiseaseListStore.selectedItem = item
        allDiseaseListStore.selectedItem = item
        Actions.diseaseDetail({title: item.name, data: item})
        diseaseMethodStore.diseaseId = item.id
	}

    onItemAdd(item){
        let {myDiseaseList,addMyDiseaseListItem} = myDiseaseListStore;
        myDiseaseList.unshift(item);
        addMyDiseaseListItem(item.id)
        allDiseaseListStore.fetchAllDiseaseList()
    }

    onItemRemove(item,i) {
        let {myDiseaseList,deleteMyDiseaseListItem} = myDiseaseListStore;
        myDiseaseList.splice(i, 1);
        deleteMyDiseaseListItem(item.id)
        allDiseaseListStore.fetchAllDiseaseList()
    }

	render() {
        let {allDiseaseList} = allDiseaseListStore;
        let {myDiseaseList,selectedItem} = myDiseaseListStore;
        return (
			<Container>
				<Header {...this.props}/>
				<Content delay>
					<View style={{backgroundColor:'transparent'}}>
						<Text style={styles.title}>我的问题</Text>
					</View>
					<MyDiseaseList
						data={myDiseaseList}
						onItemPress={(item) => this.onItemPress(item)}
						onItemRemove={(item,i) => this.onItemRemove(item,i)}
						selectedItemId={selectedItem.id}
					/>
					<AllDiseaseTabView
						data={allDiseaseList}
						onItemPress={(item) => this.onItemPress(item)}
						onItemAdd = {(item) => this.onItemAdd(item)}
						selectedItem = {myDiseaseList}
						pageKey = {'disease'}
					/>
				</Content>
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
	}
}
