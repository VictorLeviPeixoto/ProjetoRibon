import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Main from './src/components/Main'

type Props = {};
export default class App extends Component<Props> {
  constructor(){
    super();
    if (__DEV__) {
  require('react-devtools');
}
  }
  componentWillMount(){
    if (__DEV__) {
      require('react-devtools');
    }
  }
  render() {
    return (
      <Main/>
    );
  }
}
