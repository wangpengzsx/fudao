import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import {Container, Header, HeaderIcon, Content, Loading} from "../../components/index";
import ScrollableTabView, {ScrollableTabBar} from "react-native-scrollable-tab-view";
import ArticleList from "./components/ArticleList";
import articleStore from "../../mobx/articleStore";

/**
 * 资讯
 */
@observer
export default class Article extends PureComponent {

	render() {
		const {isFetching, articleColumnList} = articleStore;
		return (
			<Container>
				<Header menu {...this.props}/>
				<Content white style={{paddingBottom: 50}}>
					{!isFetching &&
					<ScrollableTabView
						renderTabBar={() => (
						<ScrollableTabBar
							activeTextColor={theme.navTabBarActiveTextColor}
							underlineStyle={{backgroundColor: theme.navTabBarActiveTextColor}}
						/>
					)}
						tabBarPosition='top'
						scrollWithoutAnimation={false}
						style={styles.tabView}
					>
						{articleColumnList.map((column) => (
							<ArticleList key={column.id}
										 tabLabel={column.name}
										 label={column.id}/>)
						)}
					</ScrollableTabView>
					}
					<Loading isShow={isFetching}/>
				</Content>
			</Container>
		)

	}

	componentDidMount() {
		articleStore.fetchArticleColumnList()
	}

}
const styles = {
	tabView: {
		flex: 1,
		flexGrow: 1,
	},
};
