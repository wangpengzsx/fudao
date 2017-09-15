/**
 * Created by chenxx on 2017/4/21.
 */
import {AsyncStorage} from "react-native";
import {observable, runInAction, computed, action, reaction, autorun} from "mobx";
import groupBy from 'lodash/groupBy'
import allDiseaseListStore from "./allDiseaseListStore";
import diseaseMethodStore from "./diseaseMethodStore";
import myDiseaseListStore from "./myDiseaseListStore";
import {Actions} from "react-native-router-flux";

class DiagnosisStore {
    @observable diagnosisList = [];
    @observable diagnosisDisease = [];
    @observable diagnosisDiseaseOrderBy = {};
    @observable errorMsg = '';

    @action
    fetchDiagnosisColumnList() {

    }

    @action
    addDisease(disease) {
        this.diagnosisDisease.push(disease);
        this.diagnosisDiseaseOrderBy = groupBy(this.diagnosisDisease, item => {
            return item.name
        });
    }

    @action
    delDisease(index) {
        this.diagnosisDisease.splice(index,1);
        this.diagnosisDiseaseOrderBy = groupBy(this.diagnosisDisease, item => {
            return item.name
        });
    }

    @action
    addMyDiseaseToBackstage(flag){
        var ids='';
        for(var i=0;i<this.diagnosisDisease.length;i++){
            ids+=this.diagnosisDisease[i].id+',';
        }
        request.getJson(urls.apis.DIAGNOSIS_ADDMYDISEASES,{
            ids
        }).then(()=>{
            if(!flag){
                request.getJson(urls.apis.DISEASE_GETMYDISEASELIST).then((res) => {
                    if(res.obj.length>0){
                        var item = res.obj[0];
                        myDiseaseListStore.myDiseaseList = res.obj
                        myDiseaseListStore.selectedItem = item
                        allDiseaseListStore.selectedItem = item
                        diseaseMethodStore.diseaseId = item.id
                        Actions.diseaseDetail({pageKey:'zicha'})
                    }else{
                        Actions.disease();
                    }

                })
            }
        })
        // this.diagnosisDisease = [];
        // this.diagnosisDiseaseOrderBy = {};
    }

    @computed
    get isFetching() {
        return this.diagnosisList.length == 0 && this.errorMsg == '';
    }
}
const diagnosisStore = new DiagnosisStore();
export default diagnosisStore