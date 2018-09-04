import React, {Component} from 'react';
import {StyleSheet, Text, View,Modal,TouchableOpacity, TextInput,AsyncStorage} from 'react-native';

type Props = {};
export default class ModalEditar extends Component<Props> {
  
    constructor (props){
        super(props);

        this.state = {
            modalVisible: false,
            listaModal: [],
            text: '',
            placeHolder: 'Edite sua tarefa',
            listaCompleta: [],
            listaGravar: []
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
                <Text style={styles.txtHeader}>ediçao da tarefa: {this.state.listaModal.tarefa}</Text>

                <TextInput
                    style={styles.txtInput}
                    onChangeText={text => this.setState({text})}
                    placeholder={this.state.placeHolder}
                    value={this.state.text}
                />

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
                  onPress = {() => this.editarTarefa()}
                  style = {styles.botaoEditar}
                  >
                    <Text style={styles.txtBotao}>EDITAR</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </View>
          </Modal>

       </View>
    );
  }
  cancelar(){
    this.setState({text: '',modalVisible: false})
  }
  editarTarefa(){
    console.log('Entrou');
    let txt = this.state.text;
    let criacao = this.state.listaModal.dataCriacao;
    let id = this.state.listaModal.id;
    let data = new Date();
    let dia = data.getDay();
    let mes = data.getMonth();

    if (dia<10)
      dia = '0'+dia;

    if(mes<10)
      mes = '0'+mes;    

    if(txt.length!==0){

      this.removerTarefa(id);

      let arrayTarefas = this.state.listaCompleta;

      arrayTarefas.push({
        tarefa: txt,
        dataCriacao: criacao,
        dataEdicao: 'Editado dia: '+dia+'/'+mes+'/'+data.getFullYear(),
        id: id});

      this.setState({listaCompleta: arrayTarefas});
      this._storeData(); 
      this.props.atualizarLista();
      this.setState({text: ''});

    }

  }

  removerTarefa(id){
    let index = this.state.listaCompleta.findIndex(x => x.id === id);
    let a = this.state.listaCompleta;
    a.splice(index,1);
    this.setState({listaCompleta: a});
  }

  _storeData = async () => {
    try {
      this.state.listaCompleta.map(item => console.log('tarefas: '+item.tarefa));
      await AsyncStorage.setItem('TAREFA', JSON.stringify(this.state.listaCompleta));
    } catch (error) {
      // Error saving data
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('TAREFA');
      if (value !== null) {
        // We have data!!
        console.log(value);
        let a = JSON.parse(value);
        a.map((item) => console.log('tarefa recarregada: '+item.tarefa));
      }
     } catch (error) {
       // Error retrieving data
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
