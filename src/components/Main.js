/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import Lista from './Lista';

type Props = {};
export default class Main extends Component<Props> {

  constructor (props){
      super(props);
      this.listaTarefas;
      this.state = {
          text: '',
          placeholder: 'Digite sua tarefa aqui...',
          arrayTarefas: []

      }
  }

  componentWillMount(){
    this.setState({arrayTarefas: this.props.listaTarefas});
    console.log('tarefas na main'+this.props.listaTarefas);
  }

  render() {
    // this.setState({arrayTarefas: this.props.listaTarefas});
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
            onPress={this.adcionarTarefa.bind(this)}
            >
            <View>
              <Text style={styles.txtBotao}>+</Text>
            </View>
            
          </TouchableOpacity>

        </View>

        <Lista lista={this.state.arrayTarefas}/>

      </View>
    );
  }

  adcionarTarefa(){
    const tarefa = this.state.text;
    let tarefaArray = this.state.arrayTarefas;
    if (tarefa.length!==0){
      let d = new Date();
      let dia = d.getDay();
      let mes = d.getMonth();

      if (dia<10)
        dia = '0'+dia;
      
      if (mes<10)
        mes = '0'+mes;
      

      tarefaArray.push({
        tarefa : tarefa,
        data : 'Adcionado dia: '+dia+'/'+mes+'/'+d.getFullYear(),
        id : d.getTime()
        });


      this.setState({text: ''});
      this.setState({arrayTarefas: tarefaArray});
      this._storeData();
    }
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('TAREFA', JSON.stringify(this.state.arrayTarefas));
    } catch (error) {
      // Error saving data
    }
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
