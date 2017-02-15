import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, TextInput, Dimensions } from 'react-native';
import { createRouter, NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import Button from 'react-native-button';
import Router from './Router';
// import MapPage from './MapPage';


export default class HomePage extends Component {

  static route = {
    title: 'home',
  }

  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
  }


  goToTest() {
    if (this.state.value === '' || this.state.value === null || this.state.value === 'undefined'){
      alert('ID Not Valid');
    }
    //pushes to map page and renders the inputted value
    this.props.navigator.push(Router.getRoute('test',{id: this.state.value}));
  }


  render() {
    return(
      <View style={styles.mainContainer}>
        <View style={styles.viewStyling}>
          <Image className="LandingImg"
            source={require('./helpingsketch.jpg')}
            style={styles.landingImg}
          />
          <Text style={styles.logoStyling}>Diagnosed?</Text>
          <Text style={styles.sloganStyling}>get a second opinion</Text>
        </View>

      <View style={styles.searchDisease}>
        <TextInput
          style={styles.textInput}
          placeholder='ex. Lung...'
          onChangeText={(value) => this.setState({value})}
          value={this.state.value}
        />
      </View>

        <View style={styles.goButton}>
          <Button
            style={styles.buttonStyling}
            styleDisabled={{color: 'red'}}
            onPress={this.goToTest.bind(this)}>Go
          </Button>
        </View>
      </View>


    )
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flexDirection:'column'
  },

  viewStyling: {
    alignItems:'center',
    flexDirection:'column'
  },

  logoStyling: {
    backgroundColor:'transparent',
    marginTop:30,
    fontSize:32,
    color:'#E2E2E2',
    fontWeight: '300'
  },

  sloganStyling: {
    backgroundColor:'transparent',
    fontSize:18,
    marginTop:10,
    color: '#E2E2E2',
    fontWeight: '300'
  },

  landingImg: {
    position:'absolute',
    height:700
  },

  searchDisease: {
    flexDirection:'row',
    marginTop: 50,
    justifyContent:'center',
    backgroundColor:'transparent'
  },

  textInput: {
    height:40,
    borderRadius: 5,
    width:170,
    textAlign: 'center',
    backgroundColor:'#F0F0F0',

  },

  goButton: {
    alignSelf:'center',
    marginTop:200,
    // marginLeft:150,
    backgroundColor:'transparent',
    width:70,
    height:70,
  },

  buttonStyling: {
    position:'relative',
    textAlign:'center',
    fontSize:32,
    color:'white',
    borderRadius: 5,
    fontWeight: '200',
    borderWidth:1,
    borderColor:'white',
    width:80,
    height:60,
    padding:10
    // width:100
  }
});
