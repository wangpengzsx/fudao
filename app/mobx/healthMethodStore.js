import {observable, runInAction, computed, action, reaction, autorun} from "mobx";

class HealthMethodStore {
	@observable healthMethod = []
	@observable questionId = ''
	@observable modalShow = false
	@observable errorMsg = ''

	@action
	fetchHealthMethod() {
		request.getJson(urls.apis.HEALTH_GETHEALTHDAILYMETHODLIST)
			.then((result) => {
				if (result.ok) {
                    this.healthMethod = result.obj
				} else {
					tools.showToast('请求出错！')
				}
			}).catch((error)=>{
				console.log("Api call error");
        	});
	}
}

const healthMethodStore = new HealthMethodStore()
export default healthMethodStore