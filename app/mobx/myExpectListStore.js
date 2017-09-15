import {observable, runInAction, computed, action, reaction, autorun} from "mobx";

class MyExpectListStore {
	@observable myExpectList = []
	@observable selectedItem = {}
	@observable deleteItemId = ''
	@observable addItemId = ''
	@observable errorMsg = ''

	@action
	fetchMyExpectList() {
		request.getJson(urls.apis.EXPECT_GETMYEXPECTLIST)
			.then((result) => {
				if (result.ok) {
					this.myExpectList = result.obj
				} else {
					tools.showToast('请求出错！')
				}
			});
	}

	addMyExpectListItem(addItemId){
        request.getJson(urls.apis.EXPECT_ADDMYEXPECT,{expectId: addItemId})
            .then((result) => {
                if (result.ok) {
                    tools.showToast('添加成功！')
                } else {
                    tools.showToast('添加失败！')
                }
            });
	}

	deleteMyExpectListItem(deleteItemId){
        request.getJson(urls.apis.EXPECT_DELETEMYEXPECT,{expectId: deleteItemId})
            .then((result) => {
                if (result.ok) {
                    tools.showToast('删除成功！')
                } else {
                    tools.showToast('删除失败！')
                }
            });
    }

    @computed
    get contains() {return false}
}

const myExpectListStore = new MyExpectListStore()
export default myExpectListStore