import {observable, asMap, action, runInAction} from "mobx";
import {persist} from "mobx-persist";
import weatherStore from "./weatherStore";

var Geolocation = require('Geolocation');

class PositionStore {
	@persist('object') @observable currentPosition = {
		adcode: "110108",
		country_code: 0,
		country: "中国",
		province: "北京市",
		city: "北京市",
		district: "海淀区",
		distance: "15",
		street: "中关村东路",
		direction: "附近",
		street_number: "66号院-甲1号楼-27层",
	}
	@observable errorMsg = ''
	@observable lat = 39.99034788200354
	@observable lng = 116.34033501776993


    @action
    fetchCurrentPosition() {
        Geolocation.getCurrentPosition(
            location => {
                console.log('location');
                console.log(location);
                let {longitude, latitude} = location.coords;
                this.lng=longitude;
                this.lat=latitude;
                this.geoconv(longitude, latitude);
            },
            error => {
                console.log('error')
                console.log(error)
                tools.showToast("获取位置失败")
            }
        );
    }

	/**
	 * 转码
	 * @param longitude
	 * @param latitude
	 */
	geoconv(longitude, latitude) {
		request.getJson('http://api.map.baidu.com/geoconv/v1/', {
			coords: longitude + "," + latitude,
			from: 1,
			to: 5,
			ak: 'trLEKMVBCc6MKGemHlUXdyy2'
		}).then((data) => {
			this.geocoder(data.result[0].y, data.result[0].x)
		})
	}

	/**
	 * 获取当前位置
	 * @param longitude
	 * @param latitude
	 */
	geocoder(longitude, latitude) {
		request.getJson('http://api.map.baidu.com/geocoder/v2/', {
			location: longitude + "," + latitude,
			output: 'json',
			pois: 1,
			radius: 20,
			ak: 'trLEKMVBCc6MKGemHlUXdyy2'
		}).then((data) => {
			if (data.status == 0){
				this.currentPosition = data.result.addressComponent;

				// 获取天气
                weatherStore.fetchCurrentWeather(this.currentPosition.city);
                weatherStore.fetchPm25(this.currentPosition.city);
            }


		});
	}

}

const positionStore = new PositionStore()
export default positionStore
hydrate('position', positionStore).then(() => {
	positionStore.hydrated = true
	console.log('position hydrated', positionStore)
})