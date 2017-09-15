import {Alert, Linking, Platform} from "react-native";
import {action, asMap, observable, runInAction} from "mobx";
import {persist} from "mobx-persist";

class VersionStore {
    @persist('object') @observable latestVersion = {}

    @action
    fetchLatestVersion(callback) {
        try {
            request.getJson(urls.pages.LATEST_VERSION).then((result) => {
                runInAction(() => {
                    console.log(result)
                    this.latestVersion = result
                    callback(result)
                })
            })
        } catch (error) {
            console.error(error);
        }
    }

    @action
    checkVersion(isShowToast) {
        if (isShowToast) {
            tools.showToast("正在检测版本信息...")
        }

        this.fetchLatestVersion((latestVersion) => {
            if (latestVersion.versionCode > config.versionCode) {
                Alert.alert(
                    '版本更新:',
                    "有新版本可以更新了哦",
                    [
                        {text: '稍后更新', onPress: () => null},
                        {text: '现在更新', onPress: () => this.updateVersion(latestVersion.url)},
                    ]
                )
            } else {
                if (isShowToast) {
                    tools.showToast('当前已是最新版本')
                }
            }
        });
    }

    @action
    updateVersion(url) {
        if (Platform.OS === 'ios') {
            let uri = 'itms-apps://itunes.apple.com/cn/app/ben-tu-dou/id1071376858?l=en&mt=8';
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    /*return Linking.openURL('http://static.houfadoc.com/share/');*/
                } else {
                    return Linking.openURL(uri);
                }
            }).catch(err => console.error('An error occurred', err));
        } else {
            Linking.canOpenURL(url).then(supported => {
                if (!supported) {
                    /*return Linking.openURL('http://static.houfadoc.com/share/');*/
                } else {
                    return Linking.openURL(url);
                }
            }).catch(err => console.error('An error occurred', err));
        }
    }
}

const versionStore = new VersionStore()
export default versionStore
