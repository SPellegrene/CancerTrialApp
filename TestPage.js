import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput, Dimensions, ScrollView } from 'react-native';
import HomePage from './HomePage';
import axios from 'axios';
import Router from './Router';
import Button from 'react-native-button';
import Icon from './pointing-down.png';

export default class TestPage extends Component {

  static route = {
    title: 'test',
  }

  constructor(props) {
    super(props);
    this.state = {
      cancers: [],
      value: this.props.route.params.id
    }
    console.log(this.state.value)
  }

  componentDidMount(){
    this.onSearch()
  }

  onSearch() {
    axios.get("https://api.seer.cancer.gov/rest/disease/latest?q="+this.state.value+"&api_key=c3cf4524cf1f148637d368fd534e15d3")
    .then((response) =>{
      console.log(response.data)
      this.setState({
        cancers: response.data.results
      });
      console.log(this.state.cancers)
    })
    .catch(function (error) {
      console.log(error);
    })
  }

    _goBackHome() {
    this.props.navigator.pop();
  }

  goToInfo(cancer) {
    // this.state.cancers.map((cancer)=> {
    //   return (
        this.props.navigator.push(Router.getRoute('info',{cancers:cancer}))
    //   );
    // })
  }

  render() {
    return (
      <ScrollView style={styles.dataContainer}>
        <Text style={styles.sloganStyling}>choose cancer type</Text>
        <Image
        style={styles.icon}
        source={Icon}
        />

        <Button
          style={styles.button}
          styleDisabled={{color: 'red'}}
          onPress={() => this._goBackHome()}>Back
        </Button>

        <View style={styles.nameCont}>
        <TextInput onChangeText={this.onSearch.bind(this)} />
        {this.state.cancers.map((cancer)=> {
          return (
              <Text
              key={cancer.name}
              style={styles.nameStyle}
              onPress={() => this.goToInfo(cancer)}>{cancer.name}</Text>
          );
        })}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({

  dataContainer: {
    flexDirection: 'column',
    backgroundColor:'#FED69B',
  },

  sloganStyling: {
    backgroundColor:'transparent',
    fontSize:18,
    marginTop:10,
    color: 'black',
    fontWeight: '300',
    alignSelf:'center',
    marginTop: 35
  },

  button: {
      width: 80,
      fontSize:22,
      color:'#8E8C8B',
      fontWeight: '200',
      alignSelf: 'flex-end',
      marginTop:10
    },

  nameCont: {
    marginBottom:15,
    flexDirection: 'column',
    marginLeft:10,
    marginRight:10
  },

  nameStyle: {
    fontSize:22,
    textAlign: 'center',
    height: 55,
    marginTop:35,
    backgroundColor: '#4989B1',
    color: 'white',
  },
   icon: {
     height:40,
     width:40,
     alignSelf: 'center',
     marginTop:25
   }


})
