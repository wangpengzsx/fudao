import React, {PureComponent} from "react";
import {observer} from "mobx-react/native";
import {View, Image, DeviceEventEmitter, ScrollView, Text} from "react-native";
import {Container, Content, Header,Modal} from "../../components/index";
import MyDiseaseList from "./components/MyDiseaseList";
import DiseaseMethodTabView from "./components/DiseaseMethodTabView";
import QuestionText from "../components/QuestionText"
import DetailModal from "./components/DetailModal"
import healthMethodStore from "../../mobx/healthMethodStore";
import questionStore from "../../mobx/questionStore";

@observer
export default class Health extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            img: "",
            detail: ""
        };

    }
    fetchWeather(){
        let self = this
        request.getJson(urls.apis.HEALTH_GETSOLARTERM)
            .then((result) => {
                if (result.ok && result.obj) {
                    let data = result.obj[0]
                    self.setState({
                        name: data.name,
                        img: data.img,
                        detail: data.detail
                    })
                } else {
                    tools.showToast('请求出错！')
                }
            }).catch((error)=>{
            console.log("Api call error");
        });
    }
    componentDidMount(){
        this.fetchWeather()
        healthMethodStore.fetchHealthMethod()
    }

	render() {
        let {healthMethod} = healthMethodStore;
        const {modalShow,questionId} = questionStore;

        return (
			<Container>
				<Header {...this.props}/>
				<Content delay>
                    <View style={styles.container}>
                        <Image source={{uri: urls.getImage(this.state.img)}} style={styles.img} />
                    </View>
					<DiseaseMethodTabView data={healthMethod}  pageKey={'health'}/>
				</Content>
                <DetailModal visible={modalShow}>
                    <QuestionText data={questionId} from={'health'}/>
                </DetailModal>
			</Container>
		)
	}
}

const styles = {
    container:{
        height: 140,
    },
    img: {
        height: 140,
        width: theme.deviceWidth,
    },
	title: {
		fontSize: theme.DefaultFontSize,
		color: '#FFF',
		fontWeight: '400',
		marginTop: 10,
		marginBottom: 10,
		marginLeft: 12,
	}
}
