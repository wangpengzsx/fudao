import React, {PureComponent} from "react";
import {View} from "native-base";
import ScrollableTabView from "react-native-scrollable-tab-view";

class TabView extends PureComponent {

	render() {
		let {tabs, onChangeTab} = this.props;
		return (
			<ScrollableTabView
				ref={(e) => this._scrollableTabView = e}
				renderTabBar={() => <View style={{height: 0, width: 0}}/>}
				onChangeTab={(event) => onChangeTab(event)}
				locked
			>
				{tabs.map((item, index) => this.renderTab(item, index))}
			</ScrollableTabView>
		);
	}

	renderTab(item, index) {
		let Component = item.component;
		return (
			<Component key={index} tabLabel={item.title}/>
		)
	}

	goToPage(index) {
		this._scrollableTabView.goToPage(index);
	}

	shouldComponentUpdate() {
		return false
	}
}

const styles = {}

TabView.propTypes = {
	tabs: React.PropTypes.array,
	onChangeTab: React.PropTypes.func,
}

TabView.defaultProps = {
	tabs: [],
	onChangeTab: () => {
	},
}

export default (TabView);
