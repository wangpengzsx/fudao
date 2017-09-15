import React, {PureComponent} from "react";
import {TouchableOpacity, Text} from "react-native";
import {View} from "native-base";
import {Actions} from "react-native-router-flux";
import diseaseMethodStore from "../../../mobx/diseaseMethodStore";
import expectMethodStore from "../../../mobx/expectMethodStore";
import healthMethodStore from "../../../mobx/healthMethodStore";
import questionStore from "../../../mobx/questionStore";
import QuestionText from "../../components/QuestionText"
import DetailModal from "../../disease/components/DetailModal"
/**
 * result
 */
export default class DailyMethodResult extends PureComponent {

    onPress1(item){
        let arr = new Array(item)
        Actions.menuKinds({
            idOrName: item,
            arr: arr
        })
    }
    onPress2(type,id,name) {
        questionStore.questionType = type
        questionStore.questionId = id
        questionStore.questionName = name
        questionStore.modalShow = true
        // if (type === 'disease') {
        //     diseaseMethodStore.questionId = id
        //     diseaseMethodStore.modalShow = true
        // } else if (type === 'expect') {
        //     expectMethodStore.questionId = id
        //     expectMethodStore.modalShow = true
        // } else {
        //     healthMethodStore.questionId = id
        //     healthMethodStore.modalShow = true
        // }
    }

    render() {
        let {data} = this.props;
        return (
            <View>
                {data.length > 0 && data.map((item, index) =>
                    <View key={index} style={styles.itemContainer}>
                        <View style={styles.titleBox}>
                            <Text style={styles.title}>{item.type}</Text>
                        </View>

                        {
                            item.type == '饮食' ? item.list.map((items, i) => (
                                    <TouchableOpacity key={i} onPress={() => this.onPress1(items.name)} style={styles.item}>
                                        <Text style={styles.text}>{ items.name}</Text>
                                    </TouchableOpacity>
                                )
                            ) :
                            item.list.map((items, i) => (
                                    <TouchableOpacity key={i} onPress={() => this.onPress2(items.methodType,items.id,items.name)} style={styles.item}>
                                        <Text style={styles.text}>{ items.timePeriod + ' : ' + items.name}</Text>
                                    </TouchableOpacity>
                                )
                            )

                        }
                    </View>
                )}
            </View>
        )
    }
}
const styles = {
    titleBox: {
        height: 30,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16
    },
    itemContainer: {
        padding: 14,
        backgroundColor: '#FFFFFF',
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