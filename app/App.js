import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import GlobalContants from "./common/globalContants";
import AppNavigator from "./AppNavigator";
import {enableLogging} from "mobx-logger";
import userStore from "./mobx/userStore";

// mobx loggin
enableLogging({
	predicate: () => __DEV__ && Boolean(window.navigator.userAgent),
	action: true,
	reaction: true,
	transaction: true,
	compute: true
});

// global
console.log(GlobalContants);
console.log(global);

/**
 * App
 */
@observer
export default class App extends PureComponent {

	render() {
		if (userStore.hydrated) {
			return <AppNavigator />
		}
		return null
	}
}