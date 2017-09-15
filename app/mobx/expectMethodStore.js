import {observable, runInAction, computed, action, reaction, autorun} from "mobx";

class ExpectMethodStore {
	@observable expectMethod = []
	@observable expectId = ''
	@observable questionId = ''
	@observable modalShow = false
	@observable errorMsg = ''

	@action
	fetchExpectMethod() {
		request.getJson(urls.apis.EXPECT_GETEXPECTDAILYMETHODLIST,{expectId: this.expectId})
			.then((result) => {
				if (result.ok) {
                    this.expectMethod = result.obj
				} else {
					tools.showToast('请求出错！')
				}
			}).catch((error)=>{
				console.log("Api call error");
        	});
	}
}

const expectMethodStore = new ExpectMethodStore()
export default expectMethodStore