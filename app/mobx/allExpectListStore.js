import {observable, runInAction, computed, action, reaction, autorun} from "mobx";

class AllExpectListStore {
	@observable allExpectList = []
    @observable data = []
    @observable selectedItem = {}
    @observable modalShow = false
	@observable allExpectListLiaoShen = []
	@observable allExpectListLiaoXin = []
	@observable errorMsg = ''

	@action
	fetchAllExpectList() {
		request.getJson(urls.apis.EXPECT_GETALLEXPECTLIST)
			.then((result) => {
				if (result.ok && result.obj) {
                    this.allExpectList = result.obj
					this.allExpectListLiaoShen = result.obj.liaoshen
                    this.allExpectListLiaoXin = result.obj.liaoxin
				} else {
					tools.showToast('请求出错！')
				}
			}).catch((error)=>{
            console.log("Api call error");
        });
	}
    fetchData(type){
        let url
        switch (type) {
            case '1':
                url = urls.apis.EXPECT_MERIDIANS;
                break
            case '2':
                url = urls.apis.EXPECT_ACUPOINTS;
                break
            case '3':
                url = urls.apis.EXPECT_ORGANS;
                break
            case '4':
                url = urls.apis.EXPECT_CIRCULATORYSYSTEMS;
                break
            default:
                return
        }
        request.getJson(url,{expect: this.selectedItem.name})
            .then((result) => {
                if (result.ok) {
                    this.data = result.obj
                } else {
                    tools.showToast('请求出错！')
                }
            }).catch((error)=>{
            console.log("Api call error");
        })
    }
}

const allExpectListStore = new AllExpectListStore()
export default allExpectListStore