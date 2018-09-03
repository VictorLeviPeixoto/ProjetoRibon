import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ListView, TouchableOpacity, Image, AsyncStorage} from 'react-native';

type Props = {};
export default class Lista extends Component<Props> {
  
    constructor (props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.lista;
        this.state = {
          listaTarefas: [],
          dataSource: ds.cloneWithRows(props.lista),
        }

    }

    componentWillReceiveProps(newProps){
      this.renovarLista();
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
                  <Text>{rowData.data}</Text>
                    
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
                    onPress={()=>{this.editarTarefa(rowData.id)}}>
                    <View>
                        <Image source={require('../imgs/edit.png')}/>
                    </View>
                    
                </TouchableOpacity>

              </View>
        )}
        />

      </View>
    );
  }

  removerTarefa(id){
    let index = this.state.listaTarefas.findIndex(x => x.id === id);

    let a = this.state.listaTarefas;

    a.splice(index,1);

    this.setState({a:this.state.listaTarefas})

    this.componentWillReceiveProps();

    this._storeData();
  }

  editarTarefa(id){
    alert('editar'+id);
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('TAREFA', JSON.stringify(this.state.listaTarefas));
    } catch (error) {
      // Error saving data
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TASKS');
      if (value !== null) {
        // We have data!!
        this.setState({})
        console.log(value);
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
