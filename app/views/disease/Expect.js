import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import {Actions} from "react-native-router-flux";
import {View, Image, Text} from "react-native";
import {Container, Content, Header} from "../../components/index";
import MyDiseaseList from "./components/MyDiseaseList";
import AllDiseaseTabView from "./components/AllDiseaseTabView";
import allExpectListStore from "../../mobx/allExpectListStore";
import expectMethodStore from "../../mobx/expectMethodStore";
import myExpectListStore from "../../mobx/myExpectListStore";

/**
 * 我的问题
 */
@observer
export default class Expect extends PureComponent {

    componentDidMount(){
        myExpectListStore.fetchMyExpectList()
        allExpectListStore.fetchAllExpectList()
    }

    onItemPress(item){
        myExpectListStore.selectedItem= item
        allExpectListStore.selectedItem = item
        Actions.expectDetail({title: item.name, data: item})
        expectMethodStore.expectId = item.id
    }
    onItemAdd(item){
        let {myExpectList,addMyExpectListItem} = myExpectListStore;
        myExpectList.unshift(item);
        addMyExpectListItem(item.id)
        allExpectListStore.fetchAllExpectList()
    }
    onItemRemove(item,i) {
        let {myExpectList,deleteMyExpectListItem} = myExpectListStore;
        myExpectList.splice(i, 1);
        deleteMyExpectListItem(item.id)
        allExpectListStore.fetchAllExpectList()

    }
    render() {
        let {allExpectList} = allExpectListStore;
        let {myExpectList,selectedItem} = myExpectListStore;
        return (
			<Container>
				<Header {...this.props}/>
				<Content delay>
					<View style={{backgroundColor:'transparent'}}>
						<Text style={styles.title}>我的问题</Text>
					</View>
					<MyDiseaseList
						data={myExpectList}
						onItemPress={(item) => this.onItemPress(item)}
						onItemRemove={(item,i) => this.onItemRemove(item,i)}
						selectedItemId={selectedItem.id}
                    />
					<AllDiseaseTabView
						data={allExpectList}
						onItemPress={(item) => this.onItemPress(item)}
						onItemAdd = {(item) => this.onItemAdd(item)}
						selectedItem = {myExpectList}
                        pageKey = {'expect'}
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
