let rowsData = {
	'基本信息': [
		{
			title: '昵称',
			property: 'nickname',
			type: 'input',
		},
		{
			title: '姓名',
			property: 'name',
			type: 'input',
		},
		{
			title: '性别',
			property: 'sex',
			type: 'singleChoice',
			items: [
				'男',
				'女'
			],
			cannotEdit: true
		},
		{
			title: '出生日期',
			property: 'birthday',
			type: 'date',
			cannotEdit: true
		},
		{
			title: '身高',
			property: 'height',
			type: 'input',
		},
		{
			title: '体重',
			property: 'weight',
			type: 'input',
		}
	],
	'病史': [
		{
			title: '个人史',
			property: 'personalHistory',
			type: 'multiChoice',
			items: [
				'肠道神经或肌肉病变',
				'先天性巨结肠',
				'肠道肿瘤',
				'炎症性肠病',
				'甲状腺功能减退症',
				'糖尿病',
				'周围血管病',
				'结缔组织病',
				'淀粉样变性',
				'脊髓损伤',
				'帕金森病',
				'精神病',
				'抑郁症',
				'神经性厌食',
				'文化程度低',
				'脑卒中',
				'脑内血管病变',
				'头部外伤',
				'血糖长期控制不达标',
				'胰岛素抵抗',
				'长期接触铅等有毒物质',
				'血脂异常',
				'高胆固醇血症',
				'脑动脉粥样硬化',
				'心肌梗死',
				'心房纤颤',
				'充血性心力衰竭',
				'落枕',
				'冠心病',
				'高血压',
				'哮喘',
				'呼吸道感染',
				'肺结核',
				'慢阻肺急性加重',
				'呼吸系统疾病',
				'突发或者急性发作的局灶性神经系统疾病',
				'外伤',
				'出血',
				'手术',
				'卒中',
				'肾脏病',
				'血液病',
				'慢性疼痛',
				'自杀',
				'记忆力减退',
				'精神疾病',
				'跌倒或骨折',
				'甲状腺功能亢进'
			],
		},
		{
			title: '家族史',
			property: 'familyHistory',
			type: 'multiChoice',
			items: [
				'痴呆',
				'肥胖',
				'骨质疏松',
				'慢阻肺',
				'呼吸系统疾病',
				'痛风',
				'自杀',
				'高血压',
				'早发心血管病'
			],
		},
		{
			title: '婚育史',
			property: 'obstetricalHistory',
			type: 'multiChoice',
			items: ['多育'],
		},
		{
			title: '用药史',
			property: 'medicationHistory',
			type: 'multiChoice',
			items: [
				'阿片制剂',
				'精神类药',
				'抗惊厥药',
				'钙通道拮抗剂',
				'抗胆碱能药',
				'滥用泻药',
				'抗凝血药物',
				'抗血小板药物',
				'抗抑郁药',
				'中枢兴奋性药物',
				'镇痛药',
				'镇静药',
				'茶碱类药',
				'类固醇',
				'酒精',
				'肿瘤放化疗',
				'影响骨代谢疾病药物',
				'长期服用避孕药等药物'
			],
		}
	],
	'生活习惯': [
		{
			title: '饮食',
			property: 'diet',
			type: 'multiChoice',
			items: [
				'高脂肪饮食',
				'饮食不规律',
				'含纤维食物摄入过少',
				'喜欢辛辣食物',
				'多食煎炸类食物',
				'暴饮暴食',
				'夜间加餐',
				'常吃零食',
				'饮食缺钙',
				'饱餐',
				'饮过量咖啡',
				'饮食过咸'
			],
		},
		{
			title: '运动',
			property: 'motion',
			type: 'multiChoice',
			items: [
				'缺乏运动',
				'长时间保持同一姿势'
			],
		},
		{
			title: '睡眠',
			property: 'sleep',
			type: 'multiChoice',
			items: [
				'睡眠姿势不当',
				'睡眠不足',
				'入睡困难',
				'睡眠维持障碍',
				'早醒',
				'睡眠质量下降'
			],
		},
		{
			title: '吸烟',
			property: 'smoke',
			type: 'multiChoice',
			items: [
				'吸烟'
			],
		},
		{
			title: '饮酒',
			property: 'drink',
			type: 'multiChoice',
			items: [
				'长期酗酒',
				'过量饮酒'
			],
		}
	],
	'长期精神状况': [
		{
			title: '精神状况',
			property: 'mentalState',
			type: 'multiChoice',
			items: [
				'紧张',
				'疲劳',
				'精神状态异常',
				'忧郁',
				'注意力不易集中',
				'记忆力减退',
				'情绪波动大',
				'兴趣',
				'精力减退',
				'长期注意力高度集中'
			]
		}
	]
};

export default rowsData;