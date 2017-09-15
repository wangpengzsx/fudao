import React, {PureComponent} from "react";
import {StyleSheet, View, Text, Image, ActivityIndicator} from "react-native";
import {connect} from "react-redux";
import {Actions} from "react-native-router-flux";
import {Container, Content} from "../../components/index";
import Header from "../../components/header/SearchHeader";

/**
 * 搜索用户
 */
export default class SearchUser extends PureComponent {

	state = {
		notExist: false,
	};

	render() {
		let {notExist} = this.state;
		return (
			<Container>
				<Header placeholder="搜索" onSearch={this._onSearch.bind(this)}/>
				<Content gray>
					{notExist ? this.renderNoUser() : null }
				</Content>
			</Container>
		);
	}

	renderNoUser() {
		return (
			<View style={styles.noUserView}>
				<Text>该用户不存在</Text>
			</View>
		)
	}

	// 搜索
	_onSearch(phone) {

		request.getJson(urls.apis.USER_SEARCH, {phone})
			.then(((result) => {

				if (result.ok) {
					if (result.obj) {
						this.setState({
							notExist: false
						})
						Actions.userDetail({
							userId: result.obj.id
						})
					} else {
						this.setState({
							notExist: true
						})
					}
				}
			}), (error) => {
				dispatch(hideLoading());
			});
	}

}

const styles = {
	noUserView: {
		height: 100,
		alignItems: 'center',
		justifyContent: 'center'
	}
};
const mapStateToProps = state => ({});