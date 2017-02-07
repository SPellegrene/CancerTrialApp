import React, {Component} from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import Router from './Router';
import axios from 'axios';
import Autolink from 'react-native-autolink';
import InfoPage from './InfoPage';
import MarkerImg from './map.png';


export default class MapWrapper extends React.Component {

  static route = {
  title: 'map'
}

constructor(props) {
  super(props);
  this.state = {
    name:this.props.coords,
    coords:[],
    sites:[],
    org_coordinates:{
      lat:'loading',
      lon: 'loading'
    },
  }
}

componentDidMount() {
  this.getCoords()
}

getCoords() {
  axios.get('https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?diseases.preferred_name='+this.state.name)
  .then((response) => {
    console.log(response.data)
    // Data transformation
    let allSites = response.data.trials.map((trial)=>{
      return trial.sites;
    })
    // todo:dedupe
    let mergedSites = allSites.reduce((a,v) => {
      return a.concat(v)
    }, []).filter((site)=> {
      return site.org_coordinates && site.org_coordinates.lat && site.org_coordinates.lon
    })
    this.setState({
      coords:mergedSites,
    })
    console.log(this.state.coords)
  })
}

_goBackHome() {
  this.props.navigator.pop();
}

  render(){
    return(
      <MapView style={styles.map}
        provider={this.props.provider}
        style={styles.map}
        region={{
          latitude: 39.8282,
          longitude: -98.5795,
          latitudeDelta: 0,
          longitudeDelta: 0
        }}>
      {this.props.coords.length === 0 ? null:this.state.coords.map((site, index) => {
        return (

          <MapView.Marker
            key={index}
            coordinate= {{
              latitude: site.org_coordinates.lat,
              longitude: site.org_coordinates.lon,
              latitudeDelta: .0922,
              longitudeDelta: .0922
            }}
            image={MarkerImg}>

            <MapView.Callout style={styles.calloutCont}>
              <Text style={styles.docName}>Dr. {site.contact_name}</Text>
              <Text style={styles.orgName}>{site.org_name}</Text>

              <Autolink
              style={styles.orgPhone}
              linkStyle={styles.orgPhone}
              text={site.contact_phone}
              />

              <Text style={styles.orgLoc}>{site.org_address_line_1}</Text>
              <Text style={styles.orgLoc2}>{site.org_city}</Text>
              <Text style={styles.orgLoc2}>{site.org_state_or_province}</Text>
            </MapView.Callout>

        </MapView.Marker>
        )
      })}
        <Button
          style={styles.button}
          styleDisabled={{color: 'red'}}
          onPress={() => this._goBackHome()}>Back
        </Button>
      </MapView>
    )
  }
}

MapWrapper.propTypes = {
  provider: MapView.ProviderPropType
};

const styles = StyleSheet.create({

    map: {
      ...StyleSheet.absoluteFillObject,
    },

    calloutCont: {
      height:200,
      width:250,
      backgroundColor:'#4989B1',
      flexDirection: 'column'
    },

    docName: {
      color:'white',
      fontSize:18,
      alignSelf: 'center',
      padding:1
    },

    orgName: {
      color:'white',
      fontSize:16,
      marginTop:5,
      alignSelf: 'center',
      padding:1
    },

    orgPhone: {
      color:'#FED69B',
      fontSize:22,
      alignSelf:'center',
      marginTop:15,
      marginBottom:5
    },

    orgLoc: {
      color:'white',
      fontSize:12,
      alignSelf:'center',
      marginTop:10
    },

    orgLoc2: {
      color:'white',
      fontSize:12,
      alignSelf:'center',
    },

    button: {
      fontSize:22,
      color:'#8E8C8B',
      fontWeight: '300',
      marginTop:20,
      backgroundColor: 'transparent'
    },
})
