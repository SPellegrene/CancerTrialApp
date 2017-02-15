import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView, Image } from 'react-native';
import TestPage from './TestPage';
import axios from 'axios';
import Button from 'react-native-button';
import Router from './Router';
import Autolink from 'react-native-autolink';
import Arrow from './down-arrow-sketch.png';
import Sep from './medical.png';
import Rib from './ribbon.png';

export default class InfoPage extends React.Component {

  static route = {
    title: 'info'
  }

  constructor(props) {
    super(props);
    this.state = {
      data:this.props.cancers,
      info: {
        definition:[{
          value: 'loading'
        }],
        treatment:[{
          value: 'loading'
        }],
        mortality:[{
          value: 'loading'
        }],
      }
    }
    console.log(this.state.data)
  }

  componentDidMount() {
    this.getInfo()
   }


  getInfo() {
    axios.get("https://api.seer.cancer.gov/rest/disease/latest/id/"+this.state.data.id+"?api_key=c3cf4524cf1f148637d368fd534e15d3")
    .then((response) => {
      this.setState({
        info: response.data
      })
    console.log(this.state.info)
    })
  }

  _goBackHome() {
    this.props.navigator.pop();
  }

  _goToMap() {
    this.props.navigator.push(Router.getRoute('map', {coords:this.state.data.name}));
  }

render() {
  return(
    <ScrollView style={styles.dataContainer}>
    <Button
      style={styles.button}
      styleDisabled={{color: 'red'}}
      onPress={() => this._goBackHome()}>Back
    </Button>

      <Text style={styles.cancerName}>{this.state.info.name}</Text>

      <Button
        style={styles.mapButton}
        styleDisabled={{color: 'red'}}
        onPress={() => this._goToMap()}>find second opinion
      </Button>

      <Image
      style={styles.icon}
      source={Arrow}
      />
      <Text style={styles.learnWord}>learn some more</Text>
      <View style={styles.infoCont}>
        <Text style={styles.cancerDesc}>{this.state.info.definition && this.state.info.definition.length>0 ? this.state.info.definition[0].value : 'no description available at this moment' }</Text>
      </View>
      <Image
      style={styles.ast}
      source={Rib}
      />
      <Text style={styles.learnWord}>common treatment</Text>
      <View style={styles.infoCont}>
        <Text style={styles.cancerDesc}>{this.state.info.treatment && this.state.info.treatment.length>0 ? this.state.info.treatment[0].value : 'no treatment info'}</Text>
      </View>
      <Image
      style={styles.ast}
      source={Sep}
      />
      <Text style={styles.learnWord}>diagnosis info</Text>
      <View style={styles.infoCont}>
        <Text style={styles.cancerDesc}>{this.state.info.mortality && this.state.info.mortality.length>0 ? this.state.info.mortality[0].value : 'no diagnosis info' }</Text>
      </View>


      <Button
        style={styles.button}
        styleDisabled={{color: 'red'}}
        onPress={() => this._goBackHome()}>Back
      </Button>

    </ScrollView>
  )
  }
}

const styles = StyleSheet.create({

  dataContainer: {
    flexDirection: 'column',
    backgroundColor:'#FED69B',
  },

  infoCont: {
    backgroundColor:'#E2FDFF',
    marginTop:35,
    alignItems:'center',
    marginLeft:5,
    marginRight:5
  },

  cancerDesc: {
    color:'black',
    fontSize:22,
    padding:15,
    borderRadius:5
  },

  learnWord:{
    color:'black',
    alignSelf: 'center',
    marginTop:25,
    fontSize:22,
    fontWeight:'200'
  },

  cancerName: {
    color:'black',
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    fontSize:28,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: '200',
  },

  button: {
      width: 80,
      fontSize:22,
      color:'#8E8C8B',
      fontWeight: '200',
      alignSelf: 'flex-start',
      marginBottom: 30,
      marginTop:20
    },

  mapButton: {
      width: 80,
      borderWidth:1,
      borderRadius:10,
      fontSize:18,
      color:'black',
      fontWeight: '300',
      alignSelf: 'center',
      marginTop:25,
      padding:5
    },

    icon: {
      height:85,
      width:85,
      alignSelf:'center',
      marginTop:30
    },

    dot: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop:20
    },

    ast: {
      marginTop:20,
      alignSelf: 'center',
      height:60,
      width:60
    }


})
