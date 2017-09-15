import React, {PureComponent} from "react";
import {StatusBar, Platform} from "react-native";
import {StyleProvider, Drawer} from "native-base";
import SplashScreen from "react-native-splash-screen";
import AppRouter from "./AppRouter";
import getTheme from "../native-base-theme/components/";
import positionStore from "./mobx/positionStore";


/**
 * 导航
 */
export default class AppNavigator extends PureComponent {

	render() {
		return (
			<StyleProvider style={getTheme(theme)}>
				<Drawer ref={(ref) => this._drawer = ref}>
					<StatusBar
						hidden={false}
						barStyle="light-content"
						backgroundColor={theme.statusBarColor}/>
					<AppRouter/>
				</Drawer>
			</StyleProvider>
		)
	}

	componentDidMount() {
		// 关闭启动页
		SplashScreen.hide();
		// 获取当前位置
		// positionStore.fetchCurrentPosition();
	}
}

