import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import logo from '../../../assets/logo.png';
import {getTop} from '../../../services/top.tsx';

class Top extends React.Component {
  state = {
    top: {
      welcome: '',
      subtitle: '',
    },
  };

  updateTop() {
    this.setState({top: getTop()});
  }

  componentDidMount() {
    this.updateTop();
  }

  render() {
    return (
      <View style={styles.top}>
        <Image source={logo} style={styles.imagem} />
        <Text style={styles.welcome}>{this.state.top.welcome}</Text>
        <Text style={styles.subtitle}>{this.state.top.subtitle}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  top: {
    backgroundColor: '#f6f6f6',
    padding: 16,
  },
  imagem: {
    width: 70,
    height: 28,
  },
  welcome: {
    marginTop: 24,
    fontSize: 26,
    lineHeight: 42,
    fontWeight: 'bold',
    color: '#464646',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 26,
    color: '#A3A3A3',
  },
});

export default Top;
