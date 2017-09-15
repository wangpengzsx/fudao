import {AsyncStorage} from "react-native";
import {observable, runInAction, computed, action, reaction, autorun} from "mobx";

class ArticleStore {
	@observable articleColumnList = []
	@observable errorMsg = ''

	@action
	fetchArticleColumnList() {
		request.getJson(urls.apis.ARTICLE_GETARTICLECOLUMNLIST)
			.then((result) => {
				console.log(result);
				if (result.ok) {
					this.articleColumnList = result.obj
				} else {
					tools.showToast('请求出错！')
				}
			});
	}

	@computed
	get isFetching() {
		return this.articleColumnList.length == 0 && this.errorMsg == ''
	}
}
const articleStore = new ArticleStore();
export default articleStore