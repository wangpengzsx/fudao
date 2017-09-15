import React, {PureComponent} from "react";
import {ScrollView} from "react-native";
import {Container, Content, SearchHeader} from "../../components/index";
import SymptomProblemResult from "./components/SymptomProblemResult";
import {observer} from "mobx-react/native";
import searchStore from "../../mobx/searchStore";

@observer
export default class SearchSymptomProblem extends PureComponent {

    search() {
        let keyword = searchStore.keyword
        if (!keyword) {
            searchStore.symptomProblem = {}
            searchStore.information = {}
            searchStore.dailyMethod = {}
        } else {
            searchStore.fetchSymptomProblem()
        }
    }

	render() {
        let {symptomProblem} = searchStore;
		return (
			<Container>
				<SearchHeader placeholder="搜索症状和问题" onSearch={this.search.bind(this)} onChangeText ={(keyword) =>  searchStore.keyword = keyword}/>
                <Content white>
                    <ScrollView>
                        <SymptomProblemResult key="symptomproblem" data={symptomProblem}/>
                    </ScrollView>
                </Content>
			</Container>
		);
	}
}
