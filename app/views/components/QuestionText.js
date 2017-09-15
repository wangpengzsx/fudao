import React, {PureComponent} from "react";
import {View, Image, Dimensions, ScrollView} from "react-native";
import {connect} from "react-redux";
import {Text} from "native-base";
import Video from "react-native-video";
import VideoText from "../components/VideoText";
import ImageText from "../components/ImageText";
import questionStore from "../../mobx/questionStore";


class QuestionText extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            daily: {}
        }
    }

    componentWillMount() {
        let id = this.props.data;
        if (this.props.from === 'disease') {
            var url = urls.apis.DISEASE_GETDISEASEDAILYMETHODDETAIL;
        } else if (this.props.from === 'expect') {
            var url = urls.apis.EXPECT_GETEXPECTDAILYMETHODDETAIL;
        } else {
            var url = urls.apis.HEALTH_GETHEALTHDAILYMETHODDETAIL;
        }
        if (id) {
            request.getJson(url, {id})
                .then((res) => {
                    this.setState({
                        daily: res.obj[0],
                    })
                })
                .catch((error) => {console.log("Api call error");
            });
        }
    }

    render() {
        let {daily} = this.state
        if (JSON.stringify(daily) != '{}') {
            return (
                <View style={styles.view}>
                    {this.renderImg(daily)}
                </View>
            )
        }
        return null;
    }

    renderImg(data) {
        let ext = data.img.substring(data.img.indexOf(".") + 1);

        if (ext == 'mp3' || ext == 'wav' || ext == 'm4a') {
            return (
                <VideoText title={data.name} content={data.detail} video={data.img} basis={data.threeCharacterClassic} time={data.length}/>
            )
        } else {
            const title = questionStore.questionName;
            var content =data.detail;
            return (
               <ImageText title={title} content={content} img={data.img} />
            )

        }
    }

}

const styles = {
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleText: {
        textAlign: 'center'
    },
    contentText: {
        fontSize: theme.DefaultFontSize,
        marginLeft: 30,
        marginRight: 30,
        lineHeight: 28,
    },
    image: {
        margin: 20,
        width: theme.deviceWidth * 0.78,
        height: 200,
    }
};

export default QuestionText


