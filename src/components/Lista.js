import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ListView, TouchableOpacity, Image, AsyncStorage} from 'react-native';
import ModalEditar from './ModalEditar';

type Props = {};
export default class Lista extends Component<Props> {

  
    constructor (props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.lista;
        this.state = {
          listaTarefas: [],
          dataSource: ds.cloneWithRows(props.lista),
          condicaoModal: false,
          listaModal: []
        }

    }

    componentWillReceiveProps(newProps){
      this.renovarLista();

      if(this.state.condicaoModal===true)
       this.setState({condicaoModal: false});
    }

    renovarLista(){
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state.listaTarefas = this.props.lista;
      this.state.dataSource = ds.cloneWithRows(this.state.listaTarefas);
    }

  render() {
    
    return (
      <View style={styles.container}>

        <ListView
            style={styles.lista}
            dataSource={this.state.dataSource}
            renderRow={rowData => 
            (
              <View style={styles.containerLista}>

                <View style={{flex:1}}>

                  <Text style={styles.txtTarefa}>{rowData.tarefa}</Text>
                  <Text>Data da criação: {rowData.dataCriacao}</Text>
                  <Text>Data da edição: {rowData.dataEdicao}</Text>
                    
                </View>

                <TouchableOpacity
                  style={styles.botaoRemover}
                  onPress={() => {this.removerTarefa(rowData.id)}}>
                  <View>
                    <Text style={styles.txtBotao}>-</Text>
                  </View>
                  
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoEditar}
                    onPress={()=>{this.editarTarefa(rowData)}}>
                    <View>
                        <Image source={require('../imgs/edit.png')}/>
                    </View>
                    
                </TouchableOpacity>

              </View>
        )}
        />

        <ModalEditar 
        condicaoModal={this.state.condicaoModal}
        listaModal={this.state.listaModal} 
        listaCompleta={this.state.listaTarefas}
        atualizarLista={() => this._retrieveData()}/>


      </View>
    );
  }

  removerTarefa(id){
    let index = this.state.listaTarefas.findIndex(x => x.id === id);
    let a = this.state.listaTarefas;
    a.splice(index,1);
    this.setState({listaTarefas: a});
    this.componentWillReceiveProps();
    this._storeData();
  }

  editarTarefa(arrayTarefa){
    this.setState({
      condicaoModal: true,
      listaModal: arrayTarefa});
      console.log(arrayTarefa);
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('TAREFA', JSON.stringify(this.state.listaTarefas));
    } catch (error) {
      // Error saving data
    }
  }

  _retrieveData = async () => {
    console.log('EntrouRD');
    try {
      const value = await AsyncStorage.getItem('TAREFA');
      if (value !== null) {
        let listaRecarregada = JSON.parse(value);
        // We have data!!
        this.setState({listaTarefas: listaRecarregada});
        this.componentWillReceiveProps();
        console.log('Lista voltando pra Lista'+value);
      }
     } catch (error) {
       // Error retrieving data
     }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerLista: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  lista: {
    backgroundColor: '#F5FCFF',
    marginVertical: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  txtTarefa: {
    flex: 1,
    fontSize: 20,
    paddingTop: 10,
    color: 'black',
  },
  txtData: {
    fontSize: 12,
    paddingBottom: 10,
    color: 'gray',
  },
  botaoEditar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    padding: 5,
    height: 35,
    width: 35,
    borderRadius: 35,
    marginLeft: 10
  },
  botaoRemover: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 5,
    height: 35,
    width: 35,
    borderRadius: 35
  },
  txtBotao: {
    fontSize: 30,
    color: 'white',
  },
});
