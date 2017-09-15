import React, {Component} from "react";
import {Grid, Item, Text, Row} from "native-base";

export default class ArticleTextItem extends Component {

	render() {
		let {article, onPress, onLongPress} = this.props;
		return (
			<Item style={styles.item}
				  onPress={()=> onPress && onPress(article)}
				  onLongPress={()=> onLongPress && onLongPress(article)}>
				<Grid>
					<Row style={styles.row1}>
						<Text style={styles.title}>{article.title}</Text>
					</Row>
					<Row style={{height:30}}>
						<Text style={styles.from}>来自：{article.source}</Text>
						<Text style={styles.timeDiff}>{tools.dateFormat(new Date(article.createTime),'yyyy-MM-dd')}</Text>
					</Row>
				</Grid>
			</Item>
		)
	}
}
const styles = {
	item: {
		margin: 5,
		padding: 5,
	},
	row1: {
		marginBottom: 5,
	},
	title: {
		fontSize: 14,
	},
	from: {
		fontSize: 12,
		color: '#AAAAAA'
	},
	timeDiff: {
		fontSize: 12,
		color: '#AAAAAA',
		marginLeft: 15
	}
};

ArticleTextItem.propTypes = {
	article: React.PropTypes.object, // 资讯
	onPress: React.PropTypes.func,
	onLongPress: React.PropTypes.func,
}
