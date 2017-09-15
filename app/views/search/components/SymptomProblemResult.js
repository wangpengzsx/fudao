import React, {PureComponent} from "react";
import {TouchableOpacity} from "react-native";
import {Actions} from "react-native-router-flux";
import {Text, View} from "native-base";
import diseaseMethodStore from "../../../mobx/diseaseMethodStore";
import myDiseaseListStore from "../../../mobx/myDiseaseListStore";
import allDiseaseListStore from "../../../mobx/allDiseaseListStore";
/**
 * result
 */
export default class SymptomProblemResult extends PureComponent {
    onPress(item) {
        myDiseaseListStore.fetchMyDiseaseList()
        myDiseaseListStore.selectedItem = item
        allDiseaseListStore.selectedItem = item
        Actions.diseaseDetail()
        diseaseMethodStore.diseaseId = item.id
    }

    render() {
        let {list} = this.props.data;
        return (
            <View style={styles.itemContainer}>
                {list && list.map((item, i) => (
                    <TouchableOpacity key={i} style={styles.item} onPress={() => this.onPress(item)}>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
}
const styles = {
    itemContainer: {
        padding: 14,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: '#eeeeee',
        margin: 5,
        padding: 10,
        height: 30,
        justifyContent: 'center',
        borderRadius: 5,
    }
};