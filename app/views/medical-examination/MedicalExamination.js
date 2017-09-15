import React, {PureComponent} from "react";
import {ScrollView, DatePickerAndrofield, ListView, View, TouchableOpacity, Platform, AlertIOS} from "react-native";
import {ListItem, Body, Right, Input, Item, Text, Icon} from "native-base";
import {Container, Content, Separator, Header, Loading} from "../../components/index";
import AlertDialog from '../../components/AlertModle';


/**
 * 体检信息
 */
export default class MedicalExamination extends PureComponent {

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        }),
        rowsAndSections: {},
        _alertItem: [],
        alertDialogVisible: false,
        title: ""
    }

    componentDidMount() {
        let value = '';
        this.fetchMedicalExaminationList(value)
    }

    fetchMedicalExaminationList(value) {
        request.getJson(urls.apis.MEDICALEXAMINATION_GETMEDICALINFORMATIONLIST, {keyword: value})
            .then((result) => {
                this.setState({
                    rowsAndSections: result.obj
                })
            });
    }


    render() {
        let {isFetching, rowsAndSections} = this.state;
        return (
            <Container>
                <Header {...this.props}/>
                <Content delay white>
                    <Item rounded style={styles.inputGroup}>
                        <TouchableOpacity>
                            <Icon name="search" style={styles.inputIcon}/>
                        </TouchableOpacity>
                        <Input
                            onChangeText={(text) => this._onChangeText(text)}
                            style={styles.inputText}/>
                    </Item>
                    {!isFetching &&
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRowsAndSections(rowsAndSections)}
                        renderRow={this._renderRow.bind(this)}
                        initialListSize={12}
                        pageSize={20}
                        renderSectionHeader={this._renderSectionHeader.bind(this)}
                        enableEmptySections
                    />
                    }
                    {Platform.OS == 'ios' ? <AlertDialog
                        data={this.state._alertItem}
                        selectedIndex={this.state.selectedIndex}
                        title={this.state.title}
                        visible={this.state.alertDialogVisible}
                        onRequestClose={this.onRequestClose.bind(this)}
                        onOutSidePress={this.dismissAlertDialog.bind(this)}
                    /> : null}
                    <Loading isShow={isFetching}/>
                </Content>
            </Container>
        )
    }

    onRequestClose(value) {
        this.updataMedicalExamination(this.id, value)

        this.setState({
            alertDialogVisible: false,
        });
    }

    dismissAlertDialog() {
        this.setState({
            alertDialogVisible: false,
        });
    }

    _onChangeText(text) {
        this.fetchMedicalExaminationList(text)
    }

    _renderRow(rowData, sectionId, rowId) {
        let {rowsAndSections} = this.state;
        return (
            <ListItem
                key={rowData.id}
                icon
                onPress={() => Platform.OS == 'ios' ? this.editItemIOS(rowData, sectionId) : this.editItem(rowData, sectionId)}
                last={rowId == rowsAndSections[sectionId].length - 1}
            >
                <Body>
                    <Text style={{fontSize: theme.fontSizeH5}}>
                        {rowData.name}
                        <Text style={{fontSize: theme.fontSizeH6, color: 'gray'}}>{rowData.unit?'('+rowData.unit+')':''}</Text>
                    </Text>
                </Body>
                <Right>
                    <Text note>{rowData.value}</Text>
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

    editItem(item, group) {
        // 当前编辑项
        this.curentItem = item;
        this.curentGroup = group;
        if (item.items)
            if (item.items[0] == "阴性") {
                item.limit = 'yinx_yangx';
            } else if (item.items[1] == "色弱") {
                item.limit = 'zc_sr_sm';
            } else if (item.items[1] == "异常") {
                item.limit = 'zc_yc';
            } else if (item.items[1] == "齐" || item.items[1] == "不齐") {
                item.limit = 'qi_bqi';
            }
        if (item.inputType == "1") {
            tools.showDialog({
                title: item.name,
                input: {
                    hint: item.name,
                    prefill: item.value,
                    allowEmptyInput: true,
                    keyboardType: 'numeric',
                    maxLength: 10,
                    minLength: 0,
                    callback: (id, text) => this._yanzheng(id, item.id, item.inputType,item.range)
                }
            });
        } else if (item.inputType == "2") {
            tools.showDialog({
                title: item.name,
                input: {
                    hint: item.name,
                    prefill: "",
                    allowEmptyInput: true,
                    keyboardType: 'default',
                    maxLength: 10,
                    minLength: 0,
                    callback: (id, text) => this._yanzheng(id, item.id, item.inputType)
                }
            });
        } else if (item.inputType == "3") {
            let selectedIndex = 0;
            let value = item.value;
            if (value == "阴性" || value == "正常" || value == "齐") {
                selectedIndex = 0
            } else if (value == "阳性" || value == "异常" || value == "色弱" || value == "不齐") {
                selectedIndex = 1
            } else if (value == "色盲") {
                selectedIndex = 2
            }
            tools.showDialog({
                title: item.name,
                items: item.items,
                selectedIndex: selectedIndex,
                itemsCallbackSingleChoice: (id, text) => this._singleChoice(id, item.id, item.limit)
            })
        } else if (item.inputType == "4") {
            tools.showDialog({
                title: item.name,
                input: {
                    hint: item.name,
                    prefill: item.value,
                    allowEmptyInput: true,
                    keyboardType: 'default',
                    maxLength: 10,
                    callback: (id, text) => this._yanzheng(id, item.id, item.inputType)
                }
            });
        }
    }


    editItemIOS(item, group) {
        // 当前编辑项
        this.curentItem = item;
        this.curentGroup = group;
        if (item.items)
            if (item.items[0] == "阴性") {
                item.limit = 'yinx_yangx';
            } else if (item.items[1] == "色弱") {
                item.limit = 'zc_sr_sm';
            } else if (item.items[1] == "异常") {
                item.limit = 'zc_yc';
            } else if (item.items[1] == "齐" || item.items[1] == "不齐") {
                item.limit = 'qi_bqi';
            }
        if (item.inputType == "1" || item.inputType == "2" || item.inputType == "4") {
            AlertIOS.prompt(item.name, null, [
                {text: '取消', onPress: (e)=>null, style: 'cancel'},
                {text: '确定', onPress: (e)=>this._yanzheng(e, item.id, item.inputType), style: 'default'}
            ], 'plain-text', item.value || "")
        } else if (item.inputType == "3") {
            let selectedIndex = 0;
            let value = item.value;
            if (value == "阴性" || value == "正常" || value == "齐") {
                selectedIndex = 0
            } else if (value == "阳性" || value == "异常" || value == "色弱" || value == "不齐") {
                selectedIndex = 1
            } else if (value == "色盲") {
                selectedIndex = 2
            }
            // tools.showDialog({
            //     title: item.name,
            //     items: item.items,
            //     selectedIndex: selectedIndex,
            //     itemsCallbackSingleChoice: (id, text) => this._singleChoice(id, item.id, item.limit)
            // })
            this.id = item.id;
            this.setState({
                title: item.name,
                _alertItem: item.items,
                alertDialogVisible: true,
                selectedIndex: selectedIndex
            });
            // this.refs.AlertDialogIOS.changeArr(item.value.split(","))
        }
    }

    _yanzheng(id, Id, inputType,range) {

        if (inputType == '1') {
            let xia=range.split('~')[0];
            let da=range.split('~')[1];
            if (this.reg("^[0-9]+([.]{1}[0-9]+){0,1}$", id) || id == '') {
                if(parseInt(id)<xia||parseInt(id)>da){
                    tools.showToast("请输入范围在"+range+"内")
                }else{
                    this.updataMedicalExamination(Id, id);
                }


            } else {
                tools.showToast("请输入数字")
            }
        } else if (inputType == '2') {
            this.updataMedicalExamination(Id, id)
        } else if (inputType == '4') {
            this.reg("^[0-9]*\/[0-9]*$", id)
            if (this.reg("^[0-9]*\/[0-9]*$", id) || id == '') {
                this.updataMedicalExamination(Id, id)
            } else {
                tools.showToast("请输入数字/数字")
            }
        }

    }

    _singleChoice(id, Id, limit) {
        let value;
        if (limit == 'yinx_yangx') {
            if (id == 0) {
                value = "阴性"
            } else {
                value = "阳性"
            }
        } else if (limit == 'zc_sr_sm') {
            if (id == 0) {
                value = "正常"
            } else if (id == 1) {
                value = "色弱"
            } else {
                value = "色盲"
            }
        } else if (limit == 'zc_yc') {
            if (id == 0) {
                value = "正常"
            } else {
                value = "异常"
            }
        } else if (limit == 'qi_bqi') {
            if (id == 0) {
                value = "齐"
            } else {
                value = "不齐"
            }
        }
        this.updataMedicalExamination(Id, value)
    }

    reg(zhengze, value) {
        var re = new RegExp(zhengze);
        var result = re.test(value);
        if (!result) {
            return false;
        } else {
            return true;
        }
    }

    updataMedicalExamination(name, value) {
        // 更新本地
        let {rowsAndSections} = this.state;
        this.curentItem.value = value;
        this.setState({
            rowsAndSections: {...rowsAndSections}
        })

        // 更新服务器数据
        request.getJson(urls.apis.MEDICALEXAMINATION_UPDATAMEDICALINFORMATIONRESULT, {
            medicalInformationId: name,
            value: value
        })
            .then((result) => {
                if (result.ok) {
                    //tools.showToast("修改成功");
                }
            });
    }
}

const styles = {
    inputBox: {
        height: 50,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backCol: {width: 35, justifyContent: 'center'},
    inputCol: {height: 30, justifyContent: 'center'},
    backButton: {marginLeft: -10},
    inputGroup: {
        height: 40,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50,
        marginRight: 50,
        marginTop: 5,
        marginBottom: 5
    },
    inputIcon: {color: '#666666'},
    inputText: {color: '#666666', marginBottom: 2},
};
