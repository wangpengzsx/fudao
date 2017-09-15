import React, {Component} from "react";
import {Grid, Item, Text, Row, Col, Thumbnail} from "native-base";

export default class ArticleMultiImageItem extends Component {

	render() {
		let {article, onPress, onLongPress} = this.props;
		return (
			<Item style={styles.item}
				  onPress={()=> onPress && onPress(article)}
				  onLongPress={()=> onLongPress && onLongPress(article)}>
				<Grid>
					<Row>
						<Text style={styles.title}>{article.title}</Text>
					</Row>
					<Row style={styles.row2}>
						<Col>
							<Thumbnail square source={{uri: urls.apis.IMAGE + '?filePath=' + article.imgs[0]}}
									   style={{width: 110, height: 70}}/>
						</Col>
						<Col>
							<Thumbnail square source={{uri: urls.apis.IMAGE + '?filePath=' + article.imgs[1]}}
									   style={{width: 110, height: 70}}/>
						</Col>
						<Col>
							<Thumbnail square source={{uri: urls.apis.IMAGE + '?filePath=' + article.imgs[2]}}
									   style={{width: 110, height: 70}}/>
						</Col>
					</Row>
					<Row>
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
		marginLeft: 10,
		marginRight: 10,
		paddingTop: 10,
		paddingBottom: 10,
	},
	row2: {
		paddingTop: 5, paddingBottom: 5
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

ArticleMultiImageItem.propTypes = {
	article: React.PropTypes.object,
	onPress: React.PropTypes.func,
	onLongPress: React.PropTypes.func,
}
