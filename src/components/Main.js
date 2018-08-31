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
      super(props)
      this.state = {
          text: '',
          placeholder: 'Digite sua tarefa aqui...',
          arrayTarefas: []

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


      tarefaArray.push({
        'tarefa': tarefa,
        'data': 'Adcionado dia: '+d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),
        'id': d.getMilliseconds()
        });


      this.setState({text: ''});
      this.setState({arrayTarefas: tarefaArray});
      console.log(this.state.arrayTarefas);
    }
  }

//   _storeData = async () => {
//     i++;
//     try {
//       await AsyncStorage.setItem( i , this.state.text);
//     } catch (error) {
//       // Error saving data
//     }
//   }
//   _retrieveData = async () => {
//     try {
//       const value = await AsyncStorage.getItem('TASKS');
//       if (value !== null) {
//         // We have data!!
//         console.log(value);
//       }
//      } catch (error) {
//        // Error retrieving data
//      }
//   }
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
