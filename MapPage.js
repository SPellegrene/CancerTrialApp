// import React from 'react';
// import { StyleSheet, View, Text,TextInput, Dimensions, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import InfoPage from './InfoPage';
// import Button from 'react-native-button';
// import geolib from 'geolib';
// import MapView from 'react-native-maps';
// import Router from './Router';
// import MapWrapper from './MapWrapper';
//
// export default class MapPage extends React.Component {
//
//   static route = {
//   title: 'map',
// }
//
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       coordinates:[0,1],
//       hospitals: [],
//       description: [],
//       center: [],
//       id: ''
//       // region: {
//       //   latitude: this.props.data.trials.sites[0].org_coordinates.lat,
//       //   longitude: this.props.data.trials.sites[0].org_coordinates.lon
//       // }
//     }
//   }
//
//   componentDidMount(){
//   this.setState({
//     latitudeDelta: .0922,
//     longitudeDelta: .0922,
//   })
// }
//
// componentWillReceiveProps(nextProps) {
//   this.setState({
//     data: this.props.data
//   })
//   console.log(nextProps.data);
// }
//
//
//   componentDidMount() {
//     this.getCenter()
//   }
//
//   getCenter() {
//     console.log(this.props.route.params.city);
//     axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + this.props.route.params.city + ".json?access_token=sk.eyJ1Ijoic3BlbGxlZ3JlbmUiLCJhIjoiY2l4Z2prNjdvMDAxcDJ0dzNzYTZ5d284biJ9.ipSnbxgYgLiMmbSUNUJVcQ")
//     .then((response)=> {
//
//       let newCenter = response.data.features[0].center.slice(0);
//       let longLatCoordinates = newCenter;
//       let latLongCoordinates = [longLatCoordinates[1], longLatCoordinates[0]];
//       this.setState({
//         center: newCenter,
//         newItemValue: '',
//         coordinates:latLongCoordinates
//       })
//       // console.log(latLongCoordinates);
//
//       axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=8000&location=" + this.state.coordinates + "&type=hospital&key=AIzaSyC58lupmo-uAjtVGJG_aBA3MM5HavebiR0")
//       .then((response)=> {
//         console.log(response.data);
//         let newHospitals = response.data.results;
//         console.log(newHospitals);
//         this.setState({
//           hospitals: newHospitals
//         })
//       })
//
//       axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=8000&location=" + this.state.coordinates + "&type=hospital&key=AIzaSyC58lupmo-uAjtVGJG_aBA3MM5HavebiR0")
//       .then((response)=> {
//         console.log(response.data);
//         let newID = response.data.results[0].place_id;
//         console.log(newID);
//         this.setState({
//           id: newID
//         })
//       })
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//   }
//
//   _goBackHome() {
//     this.props.navigator.pop();
//   }
//
//
//   // Usage: Find sites within 100 miles of Maryland
//   //
//   // removeTrialSitesOutsideArea(response.data.trials, {
//   //   latitude: 39.1292,
//   //   longitude: -77.2953,
//   //   radius: 100000
//   // }));
//
//   // The request above gets any trials with at least one sites within the geo range.
//   // export default function removeTrialSitesOutsideArea(trialsNearbyWithAllSites, geoOptions) {
//   //
//   //   // Loop through all trials, we need to remove sites that aren't nearby
//   //   let trialsNearby = trialsNearbyWithAllSites.reduce((a, trial) => {
//   //
//   //     // Loop through all sites on each trial
//   //     let sites = trial.sites.filter((site) => {
//   //
//   //       // Make sure we have coordinates to work with
//   //       if(site.org_coordinates && site.org_coordinates.lat && site.org_coordinates.lon) {
//   //
//   //         // We have coordiates so check them for distance from the user
//   //         return (
//   //           geolib.isPointInCircle(
//   //             { latitude: site.org_coordinates.lat, longitude: site.org_coordinates.lon },
//   //             { latitude: geoOptions.latitude, longitude: geoOptions.longitude },
//   //             geoOptions.radius // 5 kilometers
//   //           )
//   //         );
//   //       } else {
//   //         // We don't have coordinates to check so filter out the location
//   //         return false
//   //       }
//   //     });
//   //
//   //     // Only keep the trial if there are still sites
//   //     if(sites && sites.length > 0) {
//   //       return a.concat(sites);
//   //     } else {
//   //       return a;
//   //     }
//   //
//   //   }, []);
//   //
//   //   return trialsNearby;
//   // }
//   //
//   render() {
//     return(
//       <View>
//       <MapWrapper center={this.state.center} hospitals={this.state.hospitals} description={this.state.description}/>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.bubble}
//           >
//             <Button
//               style={styles.button}
//               // styleDisabled={{color: 'red'}}
//               onPress={() => this._goBackHome()}>Back
//             </Button>
//           </TouchableOpacity>
//         </View>
//
//       </View>
//
//     )
//   }
// }
// const styles = StyleSheet.create({
//
//   map: {
//   ...StyleSheet.absoluteFillObject
// },
//
// buttonContainer: {
//   flexDirection: 'row',
//   marginVertical: 20,
//   backgroundColor: 'transparent',
//   alignSelf: 'flex-end',
// },
//
// button: {
//   width: 80,
//   // paddingHorizontal: 12,
//   // alignItems: 'center',
//   // marginHorizontal: 10,
//   fontSize:22,
//   color:'#8E8C8B',
//   fontWeight: '200',
// },
//
//
//
// })
