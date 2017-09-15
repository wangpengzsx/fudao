import React, {PureComponent} from "react";
import {View, Image, DeviceEventEmitter} from "react-native";
import {Container, Header, Content, WebView} from "../../components/index";
import positionStore from "../../mobx/positionStore";
import weatherStore from "../../mobx/weatherStore";

/**
 * 我的能量场
 */
export default class Energy extends PureComponent {

	render() {
		let {province, city} = positionStore.currentPosition;
		let {weather, winp} = weatherStore.currentWeather;
		let {aqi_scope} = weatherStore.pm25;

		province = encodeURI(encodeURI(province));
		city = encodeURI(encodeURI(city));
		weather = encodeURI(encodeURI(weather));
		winp = encodeURI(encodeURI(winp));
		aqi_scope = encodeURI(encodeURI(aqi_scope));

		let uri = urls.pages.MY_ENERGY + "?province=" + province + "&city=" + city + "&weather=" + weather + "&winp=" + winp + "&air_scope=" + aqi_scope;
		// console.log(uri);
		return (
			<Container>
				<Header {...this.props} />
				<Content>
					<WebView uri={uri}/>
				</Content>
			</Container>
		)
	}
}


const styles = {
	View: {
		flexDirection: 'row',
		height: 80,
		justifyContent: 'space-around'
	},
	Btn: {
		marginTop: 30,
		width: 100,
		height: 30,
		justifyContent: 'center'
	}
};
