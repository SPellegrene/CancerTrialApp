import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import MapView  from 'react-native-maps';
import Button from 'react-native-button';
import Router from './Router';
import axios from 'axios';
import InfoPage from './InfoPage';

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
      latitude:this.props.sites[0].org_coordinates.lat,
      longitude:this.props.sites[0].org_coordinates.lon,
      latitudeDelta:LATITUDE_DELTA,
      longitudeDelta:.0922,
    },
  }
  console.log(this.state.region)
}

componentDidMount() {
  this.setState({
    region:{
      latitude:this.props.sites[0].org_coordinates.lat,
      longitude:this.props.sites[0].org_coordinates.lon,
      latitudeDelta:LATITUDE_DELTA,
      longitudeDelta:.0922,
    },    // org_coordinates:[0,1]
  })
}
      // console.log(this.state.org_coordinates);


// componentWillReceiveProps(nextProps) {
//     this.setState({
//       coords:nextProps.sites
//     })
//   console.log(nextProps.sites.org_coordinates)
// }

_goBackHome() {
  this.props.navigator.pop();
}


  render(){
    return(
      <View style={styles.map}>

      {/* {this.props.sites && this.props.sites.length > 0 ? this.state.sites.map((site) => {
        return( */}
        <MapView
          // key={site}
          provider={this.state.provider}
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

MapWrapper.propTypes = {
  provider: MapView.ProviderPropType
};

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
      fontWeight: '200',
      marginTop:20,
    },

})
