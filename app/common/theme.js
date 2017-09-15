import {Platform, Dimensions, PixelRatio} from "react-native";
import material from "../../native-base-theme/variables/material";
import color from "color";
const platformStyle = 'fudao';

export default Object.assign(material, {
	//
	platformStyle,
	// 按钮颜色
	brandPrimary: '#9FCC2D',
	brandInfo: '#3F57D3',
	brandSuccess: '#5cb85c',
	brandDanger: '#d9534f',
	brandWarning: '#f0ad4e',
	brandSidebar: '#252932',

	// Header背景颜色
	toolbarDefaultBg: 'transparent',

	// fudao
	contentBgColor: '#EAEEEF',

	get statusBarColor() {
		return '#0a2761';
	},

	// 底部Nav TabBar
	navTabBarHeight: 50,
	navTabBarBgColor: '#FAFBFD',
	navTabBarBorderWidth: (1 / PixelRatio.getPixelSizeForLayoutSize(1)),
	navTabBarBorderColor: '#d9d9d9',
	navTabBarTextColor: '#868686',
	navTabBarActiveTextColor: '#9FCC2D',

	// 主题字体颜色
	fontSizeBase: 15,
	DefaultFontSize: 15,

	// 字体大小
	get fontSizeH1() {
		return this.fontSizeBase * 1.8;
	},
	get fontSizeH2() {
		return this.fontSizeBase * 1.6;
	},
	get fontSizeH3() {
		return this.fontSizeBase * 1.4;
	},
	get fontSizeH4() {
		return this.fontSizeBase * 1.2;
	},
	get fontSizeH5() {
		return this.fontSizeBase;
	},
	get fontSizeH6() {
		return this.fontSizeBase * 0.8;
	},

})
