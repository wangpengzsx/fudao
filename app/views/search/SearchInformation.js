import React, {PureComponent} from "react";
import {ScrollView} from "react-native";
import {Container, Content, SearchHeader} from "../../components/index";
import InformationResult from "./components/InformationResult";
import {observer} from "mobx-react/native";
import searchStore from "../../mobx/searchStore";

@observer
export default class SearchInformation extends PureComponent {

    search() {
        let keyword = searchStore.keyword
        if (!keyword) {
            searchStore.symptomProblem = {}
            searchStore.information = {}
            searchStore.dailyMethod = {}
        } else {
            searchStore.fetchInformation()

        }
    }

	render() {
		let {information} = searchStore;
		return (
			<Container>
				<SearchHeader placeholder="搜索资讯" onSearch={this.search.bind(this)} onChangeText ={(keyword) =>  searchStore.keyword = keyword}/>
                <Content white>
                    <ScrollView>
                        <InformationResult key="information" data={information}/>
                    </ScrollView>
                </Content>
			</Container>
		);
	}
}