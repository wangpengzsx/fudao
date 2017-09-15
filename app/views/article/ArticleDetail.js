import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import {Container, Content, Header, WebView} from "../../components/index";

/**
 * 我的时间
 */
@observer
export default class ArticleDetail extends PureComponent {

	render() {
		let {articleId} = this.props;
		return (
			<Container>
				<Header {...this.props}/>
				<Content white>
					<WebView
						uri={urls.pages.ARTICLE_GETARTICLE + '?id=' + articleId}/>
				</Content>
			</Container>
		)
	}
}

ArticleDetail.propTypes = {
	articleId: React.PropTypes.string
}
