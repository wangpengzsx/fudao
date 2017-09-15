import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Content, WebView} from "../../components/index";

/**
 * 健康测评
 */
export default class HealthEvaluation extends PureComponent {

	render() {
		let {loginUser} = this.props;
		return (
			<Content>
				<WebView uri={urls.pages.HEALTH_APPRAISAL}/>
			</Content>
		)
	}
}

const mapStateToProps = state => ({
	loginUser: state.user.loginUser
});
