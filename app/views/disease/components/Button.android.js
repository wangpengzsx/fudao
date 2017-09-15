const React = require('react');
const ReactNative = require('react-native');
const {
  TouchableNativeFeedback,
  View,
} = ReactNative;

const Button = (props) => {
  return <TouchableNativeFeedback
    delayPressIn={0}
    {...props}
  >
    {props.children}
  </TouchableNativeFeedback>;
};

module.exports = Button;
