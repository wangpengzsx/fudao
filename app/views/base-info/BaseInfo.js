import React, {PureComponent} from "react";
import {ListView, Platform, AlertIOS} from "react-native";
import {observer} from "mobx-react/native";
import {ListItem, Body, Right, Text, Icon} from "native-base";
// import DialogIOS from 'react-native-dialog';
import {Container, Content, Header, Separator} from "../../components/index";
import AlertDialog from '../../components/AlertModle';
import rowsData from "./data/rowsData";
import userStore from "../../mobx/userStore";

/**
 * 个人信息
 */
@observer
export default class BaseInfo extends PureComponent {

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        }),
        _alertItem: [],
        alertDialogVisible: false,
        title: ""
    }

    componentDidMount() {
        userStore.fetchLoginUserBase();
    }

    render() {
        let {loginUser} = userStore;
        _.values(rowsData).forEach((item) => {
            item.forEach((rowData) => {
                rowData.value = loginUser[rowData.property] || ''
            })
        });
        return (
            <Container>
                <Header {...this.props}/>
                <Content delay white>
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRowsAndSections(rowsData)}
                        renderRow={this._renderRow.bind(this)}
                        pageSize={20}
                        renderSectionHeader={this._renderSectionHeader.bind(this)}
                    />
                    {Platform.OS == 'ios' ? <AlertDialog
                        data={this.state._alertItem}
                        value={this.state.value}
                        title={this.state.title}
                        visible={this.state.alertDialogVisible}
                        onRequestClose={this.onRequestClose.bind(this)}
                        onOutSidePress={this.dismissAlertDialog.bind(this)}
                        checked={true}
                        ref="AlertDialogIOS"
                    /> : null}
                </Content>
            </Container>
        )
    }

    _renderRow(rowData, sectionId, rowId) {
        return (
            <ListItem
                key={rowData.title}
                icon
                onPress={() => Platform.OS == 'ios' ? this.editItemIOS(rowData) : this.editItem(rowData)}
                last={rowId == rowsData[sectionId].length - 1}
            >
                <Body>
                <Text style={{fontSize: theme.fontSizeH5}}>{rowData.title}</Text>
                </Body>
                <Right>
                    <Text note>{this.valueToString(rowData.property, rowData.value)}</Text>
                    <Icon active name="ios-arrow-forward"/>
                </Right>
            </ListItem>
        )
    }

    _renderSectionHeader(sectionData, sectionID) {
        return (
            <Separator title={sectionID}/>
        )
    }

    editItem(item) {
        let {loginUser} = userStore;

        if (item.cannotEdit) {
            tools.showToast(item.title + "不能编辑");
            return;
        }

        if (item.type == 'singleChoice') {
            let selectedIndex = 0;

            try {
                let value = loginUser[item.property];
                selectedIndex = _.isNumber(value) ? value : 0;
            } catch (e) {
            }

            tools.showDialog({
                title: item.title,
                items: item.items,
                selectedIndex: selectedIndex,
                itemsCallbackSingleChoice: (id, text) => userStore.updateUserInfo(item.property, id)
            })
        } else if (item.type == 'multiChoice') {

            // text -> id
            let selectedIndicesText = [], selectedIndicesId = [];
            try {
                selectedIndicesText = loginUser[item.property].split(',');
                selectedIndicesId = selectedIndicesText.map((t) => item.items.findIndex((tt) => tt == t));
            } catch (e) {
            }

            tools.showDialog({
                title: item.title,
                items: item.items,
                selectedIndices: selectedIndicesId,
                positiveText: "确定",
                itemsCallbackMultiChoice: (id, text) => userStore.updateUserInfo(item.property, text.filter((t) => t != null && t != '').join(','))
            })
        } else if (item.type == 'input') {
            let prefill = '';
            if (loginUser[item.property]) {
                prefill += loginUser[item.property]
            }
            tools.showDialog({
                title: item.title,
                input: {
                    hint: item.title,
                    prefill: prefill,
                    allowEmptyInput: false,
                    maxLength: 10,
                    callback: (text) => userStore.updateUserInfo(item.property, text)
                }
            });
        }
    }

    valueToString(property, value) {
        value = value || '';

        if (property == 'sex') {
            return value == '1' ? '男' : '女';
        } else if (property == 'birthday') {
            return tools.dateFormat(new Date(value), 'yyyy-MM-dd');
        } else {
            if (_.isString(value) && value.length > 10) {
                return value.substr(0, 10) + '...';
            } else {
                return value;
            }
        }
    }

    dismissAlertDialog() {
        this.setState({
            alertDialogVisible: false
        });
    }

    onRequestClose(arr) {
        userStore.updateUserInfo(this.item.property, arr.filter((t) => t != null && t != '').join(','))
        this.setState({
            alertDialogVisible: false
        });
    }

    editItemIOS(item) {
        this.item = item;
        let {loginUser} = userStore;

        if (item.cannotEdit) {
            return;
        }

        if (item.type == 'singleChoice') {

        } else if (item.type == 'multiChoice') {

            let alertdata = item.items;
            this.setState({
                title: item.title,
                _alertItem: alertdata,
                alertDialogVisible: true,
                value: item.value.split(",")
            });
            this.refs.AlertDialogIOS.changeArr(item.value.split(","))

        } else if (item.type == 'input') {

            let prefill = '';
            if (loginUser[item.property]) {
                prefill += loginUser[item.property]
            }
            AlertIOS.prompt(item.title, null, [
                {text: '取消', onPress: (e)=>null, style: 'cancel'},
                {text: '确定', onPress: (e)=>userStore.updateUserInfo(item.property, e), style: 'default'}
            ], 'plain-text', prefill)

        }

    }

}
