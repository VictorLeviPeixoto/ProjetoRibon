/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, TouchableOpacity} from 'react-native';
import Lista from './Lista';

type Props = {};
export default class Main extends Component<Props> {

  constructor (props){
      super(props)
      this.state = {
          text: '',
          placeholder: 'Digite sua tarefa aqui...',
      }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerEdit}>

          <TextInput
              style={styles.txtInput}
              onChangeText={text => this.setState({text})}
              placeholder={this.state.placeholder}
              value={this.state.text}
          />
          <TouchableOpacity
            style={styles.botao}
            onPress={() => (this.setState({text: ''}))}
            >
            <View>
              <Text style={styles.txtBotao}>+</Text>
            </View>
            
          </TouchableOpacity>

        </View>

        <Lista/>

      </View>
    );
  }

  _adcionarTarefa(){
    const tarefa = this.state.text;

    () => this.setState({text: ''});

  }
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  txtInput: {
    flex:1,
    fontSize: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
  },

  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    padding: 5,
    height: 50,
    width:50,
    borderRadius: 35,
    marginHorizontal: 8,
  },

  txtBotao: {
    fontSize: 30,
    color: 'white',
  },

  containerEdit: {
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',

  }

});
