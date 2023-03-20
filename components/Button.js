import { Text, TouchableOpacity } from 'react-native';

const Button = ({ stylesBtn, stylesText, text, onPress }) => {
  return (
    <TouchableOpacity style={stylesBtn} activeOpacity={0.8} onPress={onPress}>
      <Text style={stylesText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
