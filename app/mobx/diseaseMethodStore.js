import {AsyncStorage} from "react-native";
import {observable, runInAction, computed, action, reaction, autorun} from "mobx";

class DiseaseMethodStore {
	@observable diseaseMethod = []
	@observable diseaseId = ''
	@observable questionId = ''
	@observable modalShow = false
	@observable errorMsg = ''

	@action
	fetchDiseaseMethod() {
		request.getJson(urls.apis.DISEASE_GETDISEASEDAILYMETHODLIST,{diseaseId: this.diseaseId})
			.then((result) => {
				if (result.ok) {
                    this.diseaseMethod = result.obj
				} else {
					tools.showToast('请求出错！')
				}
			}).catch((error)=>{
				console.log("Api call error");
        	});
	}
}

const diseaseMethodStore = new DiseaseMethodStore()
export default diseaseMethodStore