import React, {Component} from 'react';
import {StyleSheet, Text, View,Modal,TouchableHighlight} from 'react-native';

type Props = {};
export default class ModalEditar extends Component<Props> {
  
    constructor (props){
        super(props);

        this.state = {
            modalVisible: this.props.condicaoModal,
            listaModal: this.props.listaModal
        };

    }

    componentWillReceiveProps(newProps){
      this.setState({
        modalVisible: newProps.condicaoModal,
        listaModal: newProps.listaModal});
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

            <View style={styles.modal}>
              <View>
                <Text>{this.state.listaModal.tarefa}</Text>

                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

       </View>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#FFF',
    marginHorizontal: 40,
    marginVertical: 80,
    elevation: 10,
    borderRadius: 10
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
