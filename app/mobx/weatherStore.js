import {observable, asMap, action, runInAction} from "mobx";
import {persist} from "mobx-persist";

class WeatherStore {
	@persist('object') @observable currentWeather = {
		cityno: "beijing",
		week: "星期六",
		winp: "4级",
		winpid: "204",
		citynm: "北京",
		weather_icon1: "",
		temp_high: "30",
		windid: "5",
		cityid: "101010100",
		weather_icon: "http://api.k780.com:88/upload/weather/d/1.gif",
		humi_high: "0",
		weatid: "2",
		weaid: "1",
		temp_curr: "27",
		humi_low: "0",
		temperature: "30℃/17℃",
		weather: "多云",
		days: "2017-06-10",
		humidity: "18%",
		weatid1: "",
		weather_curr: "多云",
		temp_low: "17",
		temperature_curr: "27℃",
		wind: "南风"
	}
	@persist('object') @observable pm25 = {
		cityno: "beijing",
		weaid: "1",
		citynm: "北京",
		aqi: "57",
		aqi_levnm: "良",
		aqi_remark: "可以正常进行室外活动",
		cityid: "101010100",
		aqi_levid: "2",
		aqi_scope: "50-100"
	}

	@action
	fetchCurrentWeather = async(weaid) => {
		weaid = weaid.replace('市', '');
		try {
			const result = await this._fetchCurrentWeather(weaid)
			runInAction(() => {
				this.currentWeather = result
			})
		} catch (error) {
			console.error(error);
		}
	}

	_fetchCurrentWeather(weaid) {
		return new Promise((resolve, reject) => {
			request.getJson(urls.apis.WEATHER_GETWEATHER, {
				weaid
			}).then((result) => {
				if (result.ok) {
					resolve(result.obj)
				}
			})
		})
	}

	@action
	fetchPm25 = async(weaid) => {
		weaid = weaid.replace('市', '');
		try {
			const result = await this._fetchPm25(weaid)
			runInAction(() => {
				this.pm25 = result
			})
		} catch (error) {
			console.error(error);
		}
	}

	_fetchPm25(weaid) {
		return new Promise((resolve, reject) => {
			request.getJson(urls.apis.WEATHER_GETPM25, {
				weaid
			}).then((result) => {
				console.log(result)
				if (result.ok) {
					resolve(result.obj)
				}
			})
		})
	}


}

const weatherStore = new WeatherStore()
export default weatherStore
hydrate('weather', weatherStore).then(() => {
	weatherStore.hydrated = true
	console.log('weather hydrated', weatherStore)
})