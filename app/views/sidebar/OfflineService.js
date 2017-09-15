import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Container, Header, Content, WebView} from "../../components/index";

/**
 * 线下服务
 */
export default class OfflineService extends PureComponent {

	render() {
		return (
			<Content>
				<WebView uri="http://echarts.baidu.com/examples.html"/>
			</Content>
		)
	}
}

const mapStateToProps = state => ({});
