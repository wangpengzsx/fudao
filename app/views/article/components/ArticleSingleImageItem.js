import React, {Component} from "react";
import {Grid, Item, Text, Row, Col, Thumbnail} from "native-base";

export default class ArticleSingleImageItem extends Component {

	render() {
		let {article, onPress, onLongPress} = this.props;

		// 多图分隔显示第一张
        let imgs = article.img.split(',');

		return (
			<Item style={styles.item}
				  onPress={()=> onPress && onPress(article)}
				  onLongPress={()=> onLongPress && onLongPress(article)}>
				<Grid>
					<Row>
						<Col>
							<Row>
								<Text style={styles.title}>{article.title}</Text>
							</Row>
							<Row style={{height:30}}>
								<Text style={styles.from}>来自：{article.source}</Text>
								<Text style={styles.timeDiff}>{tools.dateFormat(new Date(article.createTime),'yyyy-MM-dd')}</Text>
							</Row>
						</Col>
						<Col style={{width: 115, justifyContent: 'flex-end', flexDirection: 'row'}}>
							<Thumbnail square source={{uri: urls.apis.IMAGE + '?filePath=' + imgs[0]}}
									   style={{width: 110, height: 70}}/>
						</Col>
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
		height: 90,
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

ArticleSingleImageItem.propTypes = {
	article: React.PropTypes.object,
	onPress: React.PropTypes.func,
	onLongPress: React.PropTypes.func,
}
