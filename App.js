import React, {Component} from 'react';
import {Text, View,AsyncStorage} from 'react-native';
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
    console.log('componentWillMount');
    this._retrieveData();
  }
  componentDidMount(){
    this._retrieveData();

  }

  render() {
    if(this.state.tarefasRecarregadas!=[]){
      console.log('Pronto pra ir pra main: '+this.state.tarefasRecarregadas);
      return (
        <Main listaTarefas={this.state.tarefasRecarregadas}/>
        
      );
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TAREFA');
      if (value !== null) {
        let x =  JSON.parse(value);
        x.map((item) =>{this.state.tarefasRecarregadas.push(item)})
        this.setState({tarefasRecarregadas: x});
        console.log('recarregado: '+this.state.tarefasRecarregadas);

      }
     } catch (error) {
       // Error retrieving data
     }
  }
}

