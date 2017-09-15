import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Content, WebView} from "../../components/index";
import positionStore from "../../mobx/positionStore"


/**
 * 我的位置
 */
export default class MyEnergy extends PureComponent {


	render() {
		let {lng,lat}=positionStore;


			return (
				<Content>
					<WebView
						uri={urls.pages.MY_LOCATION+"?x="+lng+"&y="+lat}/>
				</Content>
			)


	}
}

const mapStateToProps = state => ({
	...state.position
});
