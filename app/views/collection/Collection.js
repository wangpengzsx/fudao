import React, {PureComponent} from "react";
import {StyleSheet, View, Alert} from "react-native";
import {observer} from "mobx-react/native";
import {Container, Content, Header} from "../../components/index";
import CollectionList from "./components/CollectionList";


/**
 * 收藏
 */
@observer
export default class Collection extends PureComponent {

	render() {
		return (
			<Container>
				<Header {...this.props}/>
				<Content delay white>
					<CollectionList/>
				</Content>
			</Container>
		)
	}
}