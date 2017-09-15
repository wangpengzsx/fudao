import {AsyncStorage} from "react-native";
import {observable, runInAction, computed, action, reaction, autorun} from "mobx";

class MyDiseaseListStore {
	@observable myDiseaseList = []
	@observable selectedItem = {}
	@observable deleteItemId = ''
	@observable addItemId = ''
	@observable errorMsg = ''

	@action
	fetchMyDiseaseList() {
		request.getJson(urls.apis.DISEASE_GETMYDISEASELIST)
			.then((result) => {
				if (result.ok) {
					this.myDiseaseList = result.obj
				} else {
					tools.showToast('请求出错！')
				}
			});
	}
	addMyDiseaseListItem(addItemId){
        request.getJson(urls.apis.DISEASE_ADDMYDISEASE,{diseaseId: addItemId})
            .then((result) => {
                if (result.ok) {
                    tools.showToast('添加成功！')
                } else {
                    tools.showToast('添加失败！')
                }
            });
	}
	deleteMyDiseaseListItem(deleteItemId){
        request.getJson(urls.apis.DISEASE_DELETEMYDISEASE,{diseaseId: deleteItemId})
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

const myDiseaseListStore = new MyDiseaseListStore()
export default myDiseaseListStore