import {ToastAndroid} from "react-native";
import {Actions} from "react-native-router-flux";
import  {hex_md5} from "./md5"


export function login(phoneVale,passwordVale,appid){
        let  phone=phoneVale;
        let  password=passwordVale;
        request.getJson(urls.apis.USER_LOGIN,{
            account:phone,
            pwd:hex_md5(phone+password),
        }).then((data)=>{
            if(data.success) {
                toast.show(JSON.stringify(data))
                var userInformation = data.obj.userInformation;
                if(userInformation != undefined) { //基本信息已经添加完成
                    Actions['_onSearch']()
                } else { //没有基本信息表示第一次登录需要添写信息
                    Actions['startInformation']({appid:appid,showM:true,sex:1})
                }
            }else{
                ToastAndroid.show("密码不正确", ToastAndroid.SHORT);
            }
        },(error)=>{

        })

}
//校验手机号格式
export function checkPhone(phone){
    if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
        return false;
    }else{
        return true;
    }
}
//至少6位字母、数字、下划线密码
export function checkPwd(pwd){
    if(!(/^[\w]{6,12}$/).test(pwd)){
        return false;
    }else{
        return true;
    }
}