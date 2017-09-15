import React, {Component} from "react";
import {Actions} from "react-native-router-flux";
import ArticleTextItem from "./ArticleTextItem";
import ArticleSingleImageItem from "./ArticleSingleImageItem";
import ArticleMultiImageItem from "./ArticleMultiImageItem";

export default class ArticleItem extends Component {

	render() {
		let {article} = this.props;

		article.imgs = [];
		if (article.img) {
			article.imgs = article.img.split(',')
		}

		// 图片个数
		let imgLen = article.imgs.length;
		if (imgLen == 0)
			return <ArticleTextItem
				article={article}
				onPress={this._onPress.bind(this)}
				onLongPress={this._onLongPress.bind(this)}/>
		else if (imgLen >= 3)
			return <ArticleMultiImageItem
				article={article}
				onPress={this._onPress.bind(this)}
				onLongPress={this._onLongPress.bind(this)}/>
		else
			return <ArticleSingleImageItem
				article={article}
				onPress={this._onPress.bind(this)}
				onLongPress={this._onLongPress.bind(this)}/>
	}

	_onPress() {
		let {article, loginUser, onPress} = this.props;

		if (onPress)
			onPress(article);
		else
			Actions.articleDetail({
				articleId: article.id
			})
	}

	_onLongPress() {
		let {article, onLongPress} = this.props;

		if (onLongPress)
			onLongPress(article);
	}
}

ArticleItem.propTypes = {
	article: React.PropTypes.object, // 资讯
	onPress: React.PropTypes.func,
	onLongPress: React.PropTypes.func,
}