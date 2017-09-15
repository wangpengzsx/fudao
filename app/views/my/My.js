import React, {PureComponent} from "react";
import {View,ScrollView,Text} from "react-native";
import {Container, Content, Header} from "../../components/index";
import Separator from "../../components/Separator";
import {observer} from "mobx-react/native";
import MyPhoto from "./components/MyPhoto";
import MyList from "./components/MyList";
import MyGrid from "./components/MyGrid";


/**
 * 我的
 */
@observer
export default class My extends PureComponent {

	render() {
		return (
			<Container>
				<Header menu {...this.props}/>
				<Content gray>
					<View style={{height:theme.deviceHeight-130}}>
						<ScrollView>
							<MyPhoto/>
							<MyGrid/>
							<Separator/>
							<MyList />
							<Separator/>
						</ScrollView>
					</View>
				</Content>
			</Container>
		)
	}
}
