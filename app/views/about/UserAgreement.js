import React, {PureComponent} from "react";
import {Container, Header, Content, WebView} from "../../components/index";

/**
 * 用户协议
 */
export default class UserAgreement extends PureComponent {

	render() {
		return (
			<Container>
				<Header {...this.props}/>
				<Content white>
					<WebView uri={urls.pages.PROTOCOL}/>
				</Content>
			</Container>
		)
	}
}
