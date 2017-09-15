import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Container, Header, Content} from "../../components/index";
import DetailsModal from "../home/components/DetailsModal";
import {WebView} from "react-native";
import userStore from "../../mobx/userStore";

/**
 * 我的健康环
 */
export default class HealthRing extends PureComponent {


	render() {
		let {loginUser} = this.props;
		return (
			<Content>
				<WebView source={{uri:urls.pages.HEALTH_CIRCLE+'?token='+userStore.token}}
						 onMessage={(event)=>this.openDetailsBox(event.nativeEvent.data)}
				/>
				<DetailsModal ref={(e)=>this._groupSelectModal = e}></DetailsModal>
			</Content>
		)
	}
	openDetailsBox(data){
		this._groupSelectModal.show(data)
	}
}

const mapStateToProps = state => ({
	loginUser: state.user.loginUser
});
