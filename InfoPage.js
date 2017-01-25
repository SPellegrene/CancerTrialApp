import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import TestPage from './TestPage';
import axios from 'axios';
import Button from 'react-native-button';
import removeTrialSitesOutsideArea from './removeTrialSitesOutsideArea';
import Router from './Router';
import Autolink from 'react-native-autolink';


export default class InfoPage extends React.Component {

  static route = {
    title: 'info'
  }


  constructor(props) {
    super(props);
    this.state = {
        sites: this.props.sites,
        coords:this.props.coords
      }
    }

  // componentDidMount() {
  //   this.setState({
  //    sites: this.props.sites
  //   })
  //  }


  componentWillReceiveProps(nextProps) {
      this.setState({
        sites:nextProps.sites,
        coords:nextProps.coords
      })
    console.log(nextProps.sites)
    console.log(nextProps.coords[0])
  }

  _goBackHome() {
    this.props.navigator.pop();
  }

  _goToMap() {
    this.props.navigator.push(Router.getRoute('map',{coords:this.state.coords}));
  }

  render() {
      return(
        <ScrollView style={styles.dataContainer}>

        {this.props.sites && this.props.sites.length > 0 ? this.state.sites.map((site) => {
          return(
            <View
            key={site.id}
            style={styles.locationCont}>
              <Text style={styles.testDoc}>Dr. {site.contact_name}</Text>
              <Text style={styles.testName}>{site.org_name}</Text>
              <Autolink
              style={styles.testPhone}
              linkStyle={styles.testPhone}
              text={site.contact_phone}
              />
              <Text style={styles.testAddress}>{site.org_address_line_1}</Text>
              <Text style={styles.testState}>{site.org_city}</Text>
              <Text style={styles.testCity}>{site.org_state_or_province}</Text>
              <Button
                style={styles.mapButton}
                styleDisabled={{color: 'red'}}
                onPress={() => this._goToMap()}>Press for Map
              </Button>
              <TouchableOpacity
                  style={styles.bubble}
                >
                  <Button
                    style={styles.button}
                    styleDisabled={{color: 'red'}}
                    onPress={() => this._goBackHome()}>Back
                  </Button>
                </TouchableOpacity>

            </View>
            )
          }): null }


        </ScrollView>
      )
    }
  }

const styles = StyleSheet.create({

  dataContainer: {
    flexDirection: 'column',
    backgroundColor:'#FED69B'
  },

  locationCont: {
    // borderWidth:1,
    borderRadius:10,
    // borderColor: '#8E8C8B',
    marginTop:50,
    marginLeft:3,
    marginRight:3,
    backgroundColor: '#4989B1',
    marginBottom:10
  },

  button: {
    width: 80,
    fontSize:22,
    color:'white',
    fontWeight: '200',
    marginTop:20,
    alignSelf:'flex-end'
  },

  mapButton: {
    width: 80,
    flex:1,
    flexDirection:'row',
    alignSelf:'center',
    fontSize:18,
    color:'white',
    fontWeight: '200',
    marginTop:15,
    marginBottom:10,
    borderWidth:1,
    borderRadius:10,
    borderColor:'white'
  },

  testName: {
    fontSize:18,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop:20,
    fontWeight: '300',
  },

  testDoc: {
    fontSize:22,
    // fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginTop:20,
    fontWeight: '300',
  },

  testPhone: {
    padding:15,
    fontWeight:'bold',
    alignSelf: 'center',
    marginBottom:10,
    fontSize:32,
    marginTop:10,
    color:'white',
    fontWeight: '200',
  },

  testAddress: {
    alignSelf: 'center',
    marginTop:20,
    fontWeight: '300',
  },

  testCity: {
    alignSelf: 'center',
    marginBottom:5,
    fontWeight: '300',
  },

  testState: {
    alignSelf: 'center',
    fontWeight: '300',
  },

  testCountry: {
    alignSelf: 'center',
    marginBottom:10
  },

  testSummary: {
    padding:10,
    marginBottom: 200,
    borderWidth:1,
    borderRadius:10,
    borderColor: '#8E8C8B',
    width:350
  }
})
