const React = require('react');
const ReactNative = require('react-native');
const {
	TouchableOpacity,
	View,
} = ReactNative;

const Button = (props) => {
	return <TouchableOpacity
		delayPressIn={0}
		disabled={props.disabled}

		// eslint-disable-line new-cap
		{...props}
	>
		{props.children}
	</TouchableOpacity>;
};

module.exports = Button;
