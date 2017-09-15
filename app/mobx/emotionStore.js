/**
 * Created by ljunb on 2016/12/14.
 */
import {observable, runInAction, computed, action} from "mobx";
import {calm} from "../views/emotion/components/EmotionData";

class EmotionStore {
	@observable updateTime = null;
	@observable myEmotion = null;

	@action
	updateMyEmotion(emotion,time) {
		this.myEmotion = emotion;
		this.updateTime = time;
		var i=3600;
		var c=setInterval(()=>{
			i--;
			if(i==0){
				clearInterval(c);
				this.myEmotion=calm[0]
			}
		},1000)
	};


}

const emotionStore = new EmotionStore();
export default emotionStore