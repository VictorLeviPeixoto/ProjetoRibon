import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ListView, TouchableOpacity,Image} from 'react-native';

type Props = {};
export default class Lista extends Component<Props> {

    constructor (props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            dataSource: ds.cloneWithRows(['row1','row2','row3','row4'])
        }
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
                    <Text style={styles.txtLista}>{rowData}</Text>
                    
                    <TouchableOpacity
                        style={styles.botaoRemover}>
                        <View>
                         <Text style={styles.txtBotao}>-</Text>
                        </View>
                        
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.botaoEditar}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  containerLista: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  lista: {
    flex:1,
    marginVertical: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
  },
  txtLista: {
    flex: 1,
    fontSize: 20,
    padding: 10,
    color: 'black',
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
