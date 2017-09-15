import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import AllDiseaseTabBar from "./AllDiseaseTabBar";
import AllDiseaseTabLiaoShen from "./AllDiseaseTabLiaoShen";
import AllDiseaseTabLiaoXin from "./AllDiseaseTabLiaoXin";


const bgColors = ['#F1F7EE', '#F9F1EF', '#EDF4FE', '#F4F5E5'];
/**
 * 所有问题列表组件
 */
@observer
export default class AllDiseaseTabView extends PureComponent {

    render() {
        let {data, selectedItem} = this.props;
        if (data.liaoshen && data.liaoxin) {
            return (
                <ScrollableTabView
                    style={styles.tabView}
                    renderTabBar={() => <AllDiseaseTabBar pageKey={this.props.pageKey}/>}
                    locked={false}
                >
                    <AllDiseaseTabLiaoShen
                        data={data.liaoshen}
                        onItemPress={(item) => this.props.onItemPress(item)}
                        onItemAdd={(item) => this.props.onItemAdd(item)}
                        selectedItem={selectedItem}
                    />
                    <AllDiseaseTabLiaoXin
                        data={data.liaoxin}
                        onItemPress={(item) => this.props.onItemPress(item)}
                        onItemAdd={(item) => this.props.onItemAdd(item)}
                        selectedItem={selectedItem}
                    />

                </ScrollableTabView>
            )
        }
        return null;
    }
}

const styles = {
    tabView: {
        flex: 1,
        backgroundColor: '#FFF',
    },
};

