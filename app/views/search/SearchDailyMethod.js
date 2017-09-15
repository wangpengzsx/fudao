import React, {PureComponent} from "react";
import {ScrollView} from "react-native";
import {Container, Content, SearchHeader} from "../../components/index";
import DailyMethodResult from "./components/DailyMethodResult";
import {observer} from "mobx-react/native";
import searchStore from "../../mobx/searchStore";
import questionStore from "../../mobx/questionStore";
import QuestionText from "../components/QuestionText"
import DetailModal from "../disease/components/DetailModal"

@observer
export default class SearchDailyMethod extends PureComponent {

    search() {
        let keyword = searchStore.keyword
        if (!keyword) {
            searchStore.symptomProblem = {}
            searchStore.information = {}
            searchStore.dailyMethod = {}
        } else {
            searchStore.fetchDailyMethod()
        }
    }

	render() {
        let {dailyMethod} = searchStore;
        const {modalShow,questionId,questionType} = questionStore;
        return (
			<Container>
				<SearchHeader placeholder="搜索保健方法" onSearch={this.search.bind(this)} onChangeText ={(keyword) =>  searchStore.keyword = keyword}/>
                <Content white>
                    <ScrollView>
                        <DailyMethodResult key="dailyMethod" data={dailyMethod}/>
                        <DetailModal visible={modalShow}>
                            <QuestionText data={questionId} from={questionType}/>
                        </DetailModal>
                    </ScrollView>
                </Content>
			</Container>
		);
	}
}