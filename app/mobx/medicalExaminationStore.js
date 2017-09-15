import {observable, asMap, action, runInAction} from "mobx";

class MedicalExaminationStore {
	@observable medicalExaminationList = {}
	@observable medicalExaminationGroup = {}
	/*@observable isFetching = true*/
	@observable errorMsg = ''
	@observable medical = {}

	@action
	fetchMedicalExaminationList (){

			/*this.isFetching = true*/

			request.getJson(urls.apis.MEDICALEXAMINATION_GETMEDICALINFORMATIONLIST)
				.then((result) => {
					if (result.ok) {
						this.medicalExaminationList=result.obj;
					}
					/*this.isFetching = false*/
				});
	}
	@action
	updataMedicalExamination (name,value){
		tools.showToast(name,value)
			/*this.isFetching = true;*/

			request.getJson(urls.apis.MEDICALEXAMINATION_UPDATAMEDICALINFORMATIONRESULT,{
				medicalInformationId:name,
				value:value
			})
				.then((result) => {
					if (result.ok) {
						tools.showToast("修改成功");
						/*this.fetchMedicalExaminationList()*/
					}
					/*this.isFetching = false*/
				});
	}
}

const medicalExaminationStore = new MedicalExaminationStore();
export default medicalExaminationStore