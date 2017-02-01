import React, {Component} from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { MapView }  from 'react-native';
// import MapView from 'react-native-maps';
import Button from 'react-native-button';
import Router from './Router';
import axios from 'axios';
import InfoPage from './InfoPage';
import MarkerImg from './MarkerImg.png';

const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE_DELTA= 0.0922;
const ASPECT_RATIO = width / height;
const { width, height } = Dimensions.get('window');

export default class MapWrapper extends React.Component {

  static route = {
  title: 'map'
}

constructor(props) {
  super(props);
  this.state = {
    region:{
      latitude: this.props.coords.lat,
      longitude:this.props.coords.lon,
    }
  }
}

componentDidMount() {
  this.setState({
    coords:this.props.coords,
    latitudeDelta:LATITUDE_DELTA,
    longitudeDelta:.0922,
  })
  console.log(this.state.coords)
}
      // console.log(this.state.org_coordinates);


componentWillReceiveProps(nextProps) {
    this.setState({
      coords:nextProps.coords
    })
  console.log(nextProps.coords)
}

_goBackHome() {
  this.props.navigator.pop();
}


  render(){
    return(
      <View style={styles.map}>

      {/* {this.props.sites && this.props.sites.length > 0 ? this.state.coords.map((coord) => { */}
        {/* return( */}
        <MapView
          // key={coord}
          style={styles.map}
          region={{
            latitude:this.state.region.latitude,
            longitude:this.state.region.longitude,
            latitudeDelta:.0922,
            longitudeDelta:.0922
          }}
          >
          {console.log(this.state.region.latitude)}
          {console.log(this.state.region.longitude)}

          {/* {this.props.sites.length === 0 ? this.state.region.map((region) => {
           return (
           <MapView.Marker
          //  onPress={() => this.show()}
           key = {region.id}
           coordinate= {{
             latitude: this.state.region.latitude,
             longitude: this.state.region.longitude,
             latitudeDelta: this.state.latitudeDelta,
             longitudeDelta: this.state.longitudeDelta
           }}
           image={MarkerImg}>
           </MapView.Marker> */}

        </MapView>
      {/* )
   }): null } */}

        <Button
          style={styles.button}
          styleDisabled={{color: 'red'}}
          onPress={() => this._goBackHome()}>Back
        </Button>


      </View>
    )
  }
}

// MapWrapper.propTypes = {
//   provider: MapView.ProviderPropType
// };

const styles = StyleSheet.create({

  // mapCont:{
  //   flexDirection: 'column'
  // },

    map: {
      ...StyleSheet.absoluteFillObject,
      // height:500
    },
    button: {
      fontSize:22,
      color:'#8E8C8B',
      fontWeight: '300',
      marginTop:20,
      backgroundColor: 'transparent'
    },

})
