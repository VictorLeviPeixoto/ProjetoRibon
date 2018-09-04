import React, {Component} from 'react';
import {StyleSheet, Text, View,Modal,TouchableOpacity,AsyncStorage} from 'react-native';

type Props = {};
export default class ModalRemover extends Component<Props> {
  
    constructor (props){
        super(props);

        this.state = {
            modalVisible: false,
            listaModal: [],
            listaCompleta: []
        };

    }

    componentWillReceiveProps(newProps){
      this.setState({
          modalVisible: newProps.condicaoModal,
          listaModal: newProps.listaModal,
          listaCompleta: newProps.listaCompleta});
    }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  
    render() {
      return (
        <View style={{marginTop: 22}}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>

            <View style={styles.containerModal}>
              <View style={styles.modal}>
                <Text style={styles.txtHeader}>Deseja remover a tarefa {this.state.listaModal.tarefa}?</Text>

                <View style={styles.containerBotoes}>

                  <TouchableOpacity
                  title = 'cancelar'
                  onPress = {() => this.cancelar()}
                  style = {styles.botaoCancelar}
                  >
                    <Text style={styles.txtBotao}>CANCELAR</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                  title = 'editar'
                  onPress = {() => this.removerTarefa(this.state.listaModal.id)}
                  style = {styles.botaoEditar}
                  >
                    <Text style={styles.txtBotao}>REMOVER</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>

       </View>
    );
  }
  cancelar(){
    this.setState({text: '',modalVisible: false});
  }

  removerTarefa(id){
    let index = this.state.listaCompleta.findIndex(x => x.id === id);
    let a = this.state.listaCompleta;
    a.splice(index,1);
    this.setState({a: this.state.listaCompleta});
    this.props.atualizarLista();
    this._storeData();
    this.setState({modalVisible: false})
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem('TAREFA', JSON.stringify(this.state.listaCompleta));
    } catch (error) {
      // Error saving data
      console.log('Deu ruim');
    }
  }

}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#FFF',
    elevation: 10,
    borderRadius: 10,
    height: 190,
    width: 370

  },
  containerModal: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtInput: {
    fontSize: 20,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  txtHeader: {
    color: 'black',
    fontSize: 18,
    padding: 10,

  },
  botaoCancelar: {
    flex:1,
    borderRadius: 10,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20
  },

  botaoEditar: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20
  },
  containerBotoes: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 20
  },
  txtBotao: {
    fontSize: 18,
    color: 'white',
  },
});
