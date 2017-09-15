import {observable} from "mobx";

class QuestionStore {
	@observable questionId = ''
	@observable questionName = ''
	@observable questionType = ''
	@observable data = ''
	@observable modalShow = false
	@observable jlModalShow = false
	@observable teachModalShow = false
	@observable errorMsg = ''

}

const questionStore = new QuestionStore()
export default questionStore