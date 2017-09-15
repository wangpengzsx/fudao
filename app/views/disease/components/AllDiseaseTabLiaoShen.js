import React, {PureComponent} from "react";
import {View, Image, ListView, TouchableHighlight,DeviceEventEmitter} from "react-native";
import {Text, Button} from "native-base";

export default class AllDiseaseTabLiaoShen extends PureComponent {

    ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
        sectionHeaderHasChanged: (section1, section2) => section1 !== section2,

    });

    _renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={{fontWeight: 'bold'}}>{sectionID}</Text>
            </View>
        )
    }

    _renderRow(rowData, sectionId, rowId) {
        let {selectedItem, onItemAdd, onItemPress} = this.props;
        let contains = false
        selectedItem.map((item,index)=>{
            if(item.id === rowData.id){
                contains = true;
            }
        })
        return (
            <View style={styles.row}>
                <Button transparent style={{padding: 0, margin: 6}} onPress={() => onItemPress(rowData)}>
                    <View style={styles.rowView}>
                        <Image source={{uri: urls.getImage(rowData.img)}} style={styles.rowimg}/>
                        <Text style={styles.rowTitle}>{rowData.name}</Text>
                        {contains ?
                            <TouchableHighlight underlayColor='transparent'>
                                <Image source={require('../../../assets/arrows_square_check.png')}
                                       style={styles.choose}/>
                            </TouchableHighlight>
                            :
							<TouchableHighlight onPress={() => onItemAdd(rowData)} underlayColor='transparent'>
                                <Image source={require('../../../assets/arrows_square_plus.png')}
                                       style={styles.choose}/>
                            </TouchableHighlight>
                        }
                    </View>
                </Button>
            </View>
        )
    }

	render() {
        let {data} = this.props
        if(data !== null){
            let liaoShen = {}
            for(let k in data){
                liaoShen[k] = data[k].slice()
            }
            data = liaoShen
        }
        return (
			<ListView
                enableEmptySections={true}
                contentContainerStyle={styles.contentContainer}
				dataSource={this.ds.cloneWithRowsAndSections(data)}
				renderSectionHeader={this._renderSectionHeader.bind(this)}
				renderRow={this._renderRow.bind(this)}
				pageSize={4}

			/>
		)
	}

}

const styles = {
	contentContainer: {
		flexDirection: 'row', //设置横向布局
		flexWrap: 'wrap',    //设置换行显示
		width: theme.deviceWidth
	},
	sectionHeader: {
		borderBottomColor: theme.listBorderColor,
		borderBottomWidth: theme.borderWidth,
		width: theme.deviceWidth,
		height: 40,
		paddingLeft: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	row: {
		width: (theme.deviceWidth - 10) / 2,
		height: 60,
		marginLeft: 5,
	},
	rowView: {
		marginLeft: 8,
		marginRight: 8,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	rowTitle: {
		color: '#000',
		flex: 1,
	},
	rowimg: {
		width: 36,
		height: 36,
		marginRight: 4,
	},
	choose: {
		width: 20,
		height: 20,
		justifyContent: 'flex-end',
	}
};
