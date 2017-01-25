import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import Router from './Router';

const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE_DELTA= 0.0922;
const ASPECT_RATIO = width / height;
const { width, height } = Dimensions.get('window');

export default class MapWrapper extends React.Component {

  static route = {
  title: 'map',
}

constructor(props) {
  super(props);
  this.state = {
      region:[{
        latitude:this.props.coords,
        longitude:this.props.coords
      }],
      coords:[{
        latitude:this.props.coords,
        longitude:this.props.coords
      }]
    }
  }

  componentDidMount() {
    this.setState({
        latitudeDelta: .0922,
        longitudeDelta: .0922,
        })
      }




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
      <View>

        <MapView
          provider={this.props.provider}
          style={styles.map}
          region={{
            latitude:this.props.coords,
            longitude:this.props.coords,
            latitudeDelta:this.state.latitudeDelta,
            longitudeDelta:this.state.longitudeDelta
          }}
          >
          {/* {this.props.coords && this.props.coords.length > 0 ? this.state.coords.map((coord) => { */}
            {/* return( */}
              {/* )
            }): null } */}

        </MapView>

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

    map: {
      ...StyleSheet.absoluteFillObject,
      height:500
    },
    button: {
      width: 80,
      fontSize:32,
      color:'#8E8C8B',
      fontWeight: '200',
      marginTop:20
    },

})
