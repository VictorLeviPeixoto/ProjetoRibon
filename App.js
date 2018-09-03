import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Main from './src/components/Main'

type Props = {};
export default class App extends Component<Props> {

  constructor (props){
    super (props);
    this.state = {
      tarefasRecarregadas: []
    }
  }

  componentWillMount(){
    if (__DEV__) {
      require('react-devtools');
    }
    this._retrieveData();
  }

  render() {
    return (
      <Main listaTarefas={this.state.tarefasRecarregadas}/>
    );
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TAREFA');
      if (value !== null) {
        // We have data!!
        console.log(value);
        this.setState({tarefasRecarregadas: value})
      }
     } catch (error) {
       // Error retrieving data
     }
  }
}

