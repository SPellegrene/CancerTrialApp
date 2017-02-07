import React, {Component} from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
// import { MapView }  from 'react-native';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import Router from './Router';
import axios from 'axios';
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
    }
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
    console.log(allSites);
    // todo:dedupe
    let mergedSites = allSites.reduce((a,v) =>{
      return a.concat(v)
    }, []).filter((site)=> {
      return site.org_coordinates && site.org_coordinates.lat && site.org_coordinates.lon
    })
    console.log(mergedSites);

    this.setState({
      coords:mergedSites
    })
    console.log(this.state.coords)
  })
}

componentWillReceiveProps(nextProps){
    this.setState({
      coords: nextProps.coords,
    })
    console.log(nextProps.coords);
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
            {console.log(site.org_coordinates.lat)}
            {console.log(site.org_coordinates.lon)}

            <MapView.Callout>
              <View>
                <Text>Description</Text>
              </View>

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

    button: {
      fontSize:22,
      color:'#8E8C8B',
      fontWeight: '300',
      marginTop:20,
      backgroundColor: 'transparent'
    },
})
