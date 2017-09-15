import React, {PureComponent} from "react";
import {Container, Content, Header,WebView} from "../../../components/index";



export default class Shop extends PureComponent {

	render() {
        return (
			<Container>
				<Header {...this.props}/>
				<Content delay>
					<WebView uri={urls.pages.SHOP}/>
				</Content>
			</Container>
		)
	}
}

const styles = {
	title: {
		fontSize: theme.DefaultFontSize,
		color: '#FFF',
		fontWeight: '400',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 12,
	}
}
