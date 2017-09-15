import React, {Component} from "react";
import {ScrollView, ListView, View, Text, ToastAndroid} from "react-native";
import GiftedListView from "../../../components/GiftedListView";
import MyRecordeListRow from "./MyRecordeListRow";
import DetailsModal from "../../home/components/DetailsModal";
import {Actions} from "react-native-router-flux";


var len = [];

export default class MyRecordeList extends Component {
	constructor(props){
		super(props);
		for(var i=0;i<30;i++){
			len[i]=""
		}
		this.state={
			len:len,
			none:'',
		}
	}
	componentWillMount(){
		this.setState({
			none:this.state.len[this.props.btn]=='{}'?"暂无记录":''
		})
	}

	render() {
		return (
			<View style={{flex:1}}>
				<GiftedListView
					style={{marginBottom:20}}
					rowView={this._renderRowView.bind(this)}
					onFetch={this._onFetch.bind(this)}
					firstLoader={true}
					pagination={true}
					refreshable={true}
					withSections={true}
					sectionHeaderView={this._renderSectionHeaderView}
					enableEmptySections={true}
					paginationAllLoadedView={this._renderPaginationAllLoadedView.bind(this)}
				/>
				<DetailsModal ref={(e)=>this._groupSelectModal = e}/>
				{this.state.none==''?(
					<View style={{flex:999}}>
						<Text style={{textAlign:'center'}}>暂无记录</Text>
					</View>
				):null}
			</View>

		)
	}

	_onFetch(page = 1, callback, options) {
		let {btn,month,year} = this.props;
		let c;
		if(btn>=9){
			c=btn-9;
		}else{
			c=btn;
		}
		let dateTime =year+'-'+month+'-'+(btn+1);
		request.getJson(urls.apis.TIMEPERIODAPI_GETMYRECORD,{
			dateTime:dateTime
		}).then((res) => {
			len[btn] = JSON.stringify(res.obj);
			this.setState({
				len:len
			})
			callback(res.obj, {
				allLoaded: true
			})
		});
	}

	_renderRowView(rowData, sectionID, rowID) {
		return (
			<MyRecordeListRow
				row={rowData}
				gotoDetail={this.gotoDetail.bind(this,rowData)}
				type={this.props.type}/>
		)
	}

	_renderSectionHeaderView(sectionData, sectionID) {
		return (
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionHeaderText}>
					{sectionID}
				</Text>
			</View>
		)
	}

	_renderPaginationAllLoadedView() {
		// alert(len)
		// if(len[this.props.btn]=="{}"){
		// 	return <View style={{}}>
		// 		<Text style={{textAlign:'center',marginTop:20}}>暂无记录</Text>
		// 	</View>;
		// }
		return null;
	}

	_paginationFetchingView() {
		return (
			<Text>_paginationFetchingView</Text>
		)
	}

	_paginationWaitingView() {
		return (
			<Text>Waiting</Text>
		)
	}

	gotoDetail(data){
		if (data.type==0){
			var thressAll = [];

			var thress = JSON.parse(data.threeCharacterClassic);
			if (thress instanceof Array) {
				thressAll = thress.join('，');
			} else {
				if (thress.dishes.length > 0) {
					thressAll = thress.dishes;
				}
				if (thress.staple.length > 0) {
					thressAll = thressAll.length > 0 ? thressAll.concat(thress.staple) : thress.staple;
				}
			}
			Actions.menuKinds({
				idOrName: thressAll[0],
				arr: thressAll
			})

		}else{
			this._groupSelectModal.show(JSON.stringify(data));


		}

	}

}

const styles = {
	sectionHeader: {
		marginTop: 20,
		marginLeft: 36,
		backgroundColor:'transparent'
	},
	sectionHeaderText: {
		color: '#000',
		fontSize: 16,
	}
}

MyRecordeList.propTypes = {
	label: React.PropTypes.string, // 资讯栏目
}

