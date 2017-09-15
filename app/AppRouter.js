import React, {PureComponent} from "react";
import {Platform} from "react-native";
import {Router, Scene, Reducer} from "react-native-router-flux";
import Index from "./views/index/Index";
import Login from "./views/authentication/Login";
import ArticleDetail from "./views/article/ArticleDetail";
import Collection from "./views/collection/Collection";
import Start from "./views/authentication/Start";
import Register from "./views/authentication/Register";
import SetPassword from "./views/authentication/SetPassword";
import PasswordSuccess from "./views/authentication/PasswordSuccess";
import StartInformation from "./views/authentication/StartInformation";
import RebuildPassword from "./views/authentication/RebuildPassword";
import RebuildSuccess from "./views/authentication/RebuildSuccess";
import PasswordValidate from "./views/authentication/PasswordValidate";
import WomanChoose from "./views/authentication/WomanChoose";
import Friend from "./views/friend/Friend";
import About from "./views/about/About";
import UserAgreement from "./views/about/UserAgreement";
import PrivacyStatement from "./views/about/PrivacyStatement";
import Record from "./views/record/Record";
import MedicalExamination from "./views/medical-examination/MedicalExamination";
import Homeapp from "./views/home/HomeDrag";
import SideBar from "./views/sidebar/SideBar";
import Diagnosis from "./views/diagnosis/Diagnosis";
import Evaluation from "./views/diagnosis/Evaluation";
import DeepDiagnosis from "./views/diagnosis/DeepDiagnosis";
import Settings from "./views/settings/Settings";
import Disease from "./views/disease/Disease";
import DiseaseDetail from "./views/disease/DiseaseDetail";
import Energy from "./views/energy/Energy";
import NewDynamic from "./views/dynamic/NewDynamic";
import DynamicDetail from "./views/dynamic/DynamicDetail";
import DynamicPicture from "./views/dynamic/DynamicPicture";
import MenuDetail from "./views/disease/components/MenuDetail";
import MenuKinds from "./views/disease/components/MenuKinds";
import Shop from "./views/disease/components/Shop";
import Teach from "./views/disease/components/Teach";
import Body from "./views/disease/components/Body";
import Expect from "./views/disease/Expect";
import ExpectDetail from "./views/disease/ExpectDetail";
import Health from "./views/disease/Health";
import FriendApply from "./views/friend/FriendApply";
import BarcodeScannerApp from "./views/friend/components/BarcodeScanner"

import Qrcode from "./views/friend/components/Qrcode"
import AgreeFriendApply from "./views/friend/AgreeFriendApply";
import NewFriend from "./views/friend/NewFriend";
import UserDetail from "./views/user/UserDetail";
import RemarkSet from "./views/user/RemarkSet";
import BaseInfo from "./views/base-info/BaseInfo";
import Emotion from "./views/emotion/Emotion";
import Search from "./views/search/Search";
import SearchUser from "./views/search/SearchUser";
import SearchSymptomProblem from "./views/search/SearchSymptomProblem";
import SearchDailyMethod from "./views/search/SearchDailyMethod";
import SearchFriendsCircle from "./views/search/SearchFriendsCircle";
import SearchInformation from "./views/search/SearchInformation";
import Message from "./views/message/Message";
import MsgDetail from "./views/message/MsgDetail";
import Chat from "./views/message/Chat";
import Feedback from "./views/feedback/Feedback";
import CityPick from "./views/authentication/CityPick";
/**
 * 路由
 */
export default class AppRouter extends PureComponent {

	// 最后一次触Back键的时间
	lastBackPressTime = 0;

	render() {
		return (
			<Router hideNavBar={true} createReducer={this.reducerCreate.bind(this)} onExitApp={this.appExit.bind(this)} navigationState={{style:{height:0}}}>
				<Scene key="root"  hideNavBar>

					<Scene key="start" component={Start} title="启动页" hideNavBar initial/>

					{/*首页*/}
					<Scene key="index" component={Index} title="首页" hideNavBar/>
					{/*启动注册*/}
					<Scene key="register" component={Register} title="注册" hideNavBar/>
					<Scene key="login" component={Login} title="登录" hideNavBar/>
					<Scene key="setPassword" component={SetPassword} title="设置密码" hideNavBar/>
					<Scene key="rebuildPassword" component={RebuildPassword} title="请设置新密码" hideNavBar  />
					<Scene key="passwordSuccess" component={PasswordSuccess} hideNavBar/>
					<Scene key="startInformation" component={StartInformation} title="基本信息" hideNavBar/>
					<Scene key="passwordValidate" component={PasswordValidate} title="找回密码" hideNavBar/>
					<Scene key="womanChoose" component={WomanChoose} title="阶段选择" hideNavBar/>
					<Scene key="rebuildSuccess" component={RebuildSuccess} hideNavBar/>

					{/*主页*/}
					<Scene title="主页" key="homeapp" component={Homeapp}/>

					{/*好友*/}
					<Scene key="friend" component={Friend} title="好友" hideNavBar/>
					<Scene key="barcodescanner" component={BarcodeScannerApp} title="二维码/条码" hideNavBar/>
					<Scene key="qrcode" component={Qrcode} title="我的二维码" hideNavBar/>

					<Scene key="friendApply" component={FriendApply} title="好友申请" hideNavBar/>
					<Scene key="newFriend" component={NewFriend} title="新的朋友" hideNavBar/>
					<Scene key="agreeFriendApply" component={AgreeFriendApply} title="好友验证" hideNavBar/>

					{/*用户*/}
					<Scene key="userDetail" component={UserDetail} title="用户详情" hideNavBar/>
					<Scene key="remarkSet" component={RemarkSet} title="设置备注" hideNavBar/>
					{/*侧边栏*/}
					<Scene key="sideBar" component={SideBar} title="侧边栏" hideNavBar/>

					{/*资讯*/}
					<Scene title="资讯详情" key="articleDetail" component={ArticleDetail} hideNavBar/>

					{/*收藏*/}
					<Scene title="收藏" key="collection" component={Collection} hideNavBar/>

					{/*我的*/}
					<Scene title="关于福道" key="about" component={About} hideNavBar/>
					<Scene title="隐私声明" key="privacyStatement" component={PrivacyStatement} hideNavBar/>
					<Scene title="用户协议" key="userAgreement" component={UserAgreement} hideNavBar/>
					<Scene title="基本信息" key="baseInfo" component={BaseInfo} hideNavBar/>
					<Scene title="我的记录" key="record" component={Record} hideNavBar/>
					<Scene title="体检信息" key="medicalExamination" component={MedicalExamination} hideNavBar/>
					<Scene title="系统设置" key="settings" component={Settings} hideNavBar/>

					{/*能量场*/}
					<Scene title="能量场" key="energy" component={Energy} hideNavBar/>

					{/*自诊*/}
					<Scene key="diagnosis" component={Diagnosis} title="自查" hideNavBar/>
					<Scene key="evaluation" component={Evaluation} title="测评" hideNavBar/>
					<Scene key="deepDiagnosis" component={DeepDiagnosis} title="深度自查" hideNavBar/>

					{/*自疗*/}
					<Scene title="自疗" key="disease" component={Disease} hideNavBar/>
					<Scene title="疾病详情" key="diseaseDetail" component={DiseaseDetail} hideNavBar/>
					<Scene key="menuKinds" component={MenuKinds} hideNavBar/>
					<Scene key="menuDetail" component={MenuDetail} hideNavBar/>
					<Scene key="shop" component={Shop} hideNavBar/>
					<Scene key="teach" component={Teach} hideNavBar/>
					<Scene key="body" component={Body} hideNavBar/>

					{/*自修*/}
					<Scene key="expect" component={Expect} hideNavBar/>
					<Scene key="expectDetail" component={ExpectDetail} hideNavBar/>

					{/*自养*/}
					<Scene key="health" component={Health} hideNavBar/>

					{/*动态*/}
					<Scene key="newDynamic" component={NewDynamic} title="新动态" hideNavBar/>
					<Scene key="dynamicDetail" component={DynamicDetail} title="动态详情" hideNavBar/>
					<Scene key="dynamicPicture" component={DynamicPicture} title="动态图片" hideNavBar/>

					{/*情绪*/}
					<Scene key="emotion" component={Emotion} title="情绪" hideNavBar />

					{/*搜索*/}
					<Scene title="搜索" key="search" component={Search} hideNavBar/>
					<Scene title="搜索保健方法" key="searchDailyLife" component={SearchDailyMethod} hideNavBar/>
					<Scene title="搜索朋友圈" key="searchFriendsCircle" component={SearchFriendsCircle} hideNavBar/>
					<Scene title="搜索资讯" key="searchInformation" component={SearchInformation} hideNavBar/>
					<Scene title="搜索症状与问题" key="searchSymptomProblem" component={SearchSymptomProblem} hideNavBar/>
					<Scene title="搜索用户" key="searchUser" component={SearchUser} hideNavBar/>

					{/*消息*/}
					<Scene title="消息" key="message" component={Message} hideNavBar/>
					<Scene title="聊天消息" key="chat" component={Chat} hideNavBar/>
					<Scene title="系统消息" key="msgDetail" component={MsgDetail} hideNavBar/>

					{/*意见反馈*/}
					<Scene title="意见反馈" key="feedback" component={Feedback} hideNavBar/>

					{/*城市列表*/}
					<Scene title="" key="cityPick" component={CityPick} hideNavBar/>
				</Scene>
			</Router>
		)
	}


	reducerCreate(params) {
		const defaultReducer = Reducer(params)
		return (state, action) => {
			// console.log(state);
			// console.log(action);
			return defaultReducer(state, action)
		}
	}

	appExit() {
		if (this.lastBackPressTime && this.lastBackPressTime + 2000 >= Date.now()) {
			return false;
		}
		this.lastBackPressTime = Date.now();
		tools.showToast('再按一次退出应用');
		return true;
	}

	shouldComponentUpdate() {
		return false
	}
}

// const styles={
// 	tabBarStyle:{
// 		marginTop:Platform.OS==='android'?0:20
// 	}
//
// }