import React, {Component} from "react";
import {ScrollView, ListView, View, Text} from "react-native";
import GiftedListView from "../../../components/GiftedListView";
import ArticleItem from "./ArticleItem";

export default class ArticleList extends Component {

	render() {
		return (
			<GiftedListView
				rowView={this._renderRowView.bind(this)}
				onFetch={this._onFetch.bind(this)}
				firstLoader={true}
				pagination={true}
				refreshable={true}
				withSections={false}
				enableEmptySections={true}
				locked={true}
			/>
		)
	}

	_onFetch(page = 1, callback, options) {
		let {label} = this.props;
		request.getJson(urls.apis.ARTICLE_GETARTICLELIST, {
            columnId: label,
			page
		}).then((result) => {
			if (page === result.obj.pageCount) {
				callback(result.obj.list, {
					allLoaded: true
				});
			} else {
				callback(result.obj.list);
			}
		});
	}

	_renderRowView(rowData) {
		return (
			<ArticleItem article={rowData}/>
		)
	}


	_renderPaginationAllLoadedView() {
		return (
			<Text>END</Text>
		)
	}

	_paginationFetchingView() {
		return (
			<Text>_paginationFetchingView</Text>
		)
	}

	_paginationWaitingView() {
		return (
			<Text>Waiting</Text>
		)
	}

}

ArticleList.propTypes = {
	label: React.PropTypes.string, // 资讯栏目
}