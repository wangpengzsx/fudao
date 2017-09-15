import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import {connect} from "react-redux";
import {Container, Header, Content, WebView} from "../../components/index";
import userStore from "../../mobx/userStore";

/**
 * 我的生命周期
 */
@observer
export default class LifeCycle extends PureComponent {


	render() {
		let {loginUser} = userStore;

		return (
			<Content>
				<WebView uri={urls.pages.LIFE_CYCLE+'?sex='+loginUser.sex+'&birthdate='+tools.dateFormat(new Date(loginUser.birthday),'yyyy-MM-dd')}/>
			</Content>
		)
	}
}

const mapStateToProps = state => ({
	loginUser: state.user.loginUser
});
