// import React, { Component } from 'react';
// import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
// import MapView from 'react-native-maps';
// import MarkerImg from './happy.png';
// import MapPage from './MapPage';
// import axios from 'axios';
// // import ChurchDetail from './ChurchDetail';
//
// // import Markers from './Markers';
//
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
// const LATITUDE_DELTA= 0.0922;
// // const LONGITUDE=
// // const LATITUDE= ;
// const ASPECT_RATIO = width / height;
// const { width, height } = Dimensions.get('window');
//
//
// export default class MapWrapper extends React.Component {
//
//   constructor(props){
//     super(props);
//     this.state = {
//       region:{
//         latitude:this.props.center[1],
//         longitude:this.props.center[0],
//         latitudeDelta:LATITUDE_DELTA,
//         longitudeDelta: LONGITUDE_DELTA,
//     },
//     center: {
//         latitude: this.props.center[1],
//         longitude: this.props.center[0],
//       },
//       markers: null,
//       hospitals: this.props.hospitals,
//       description: this.props.description
//     }
//   }
//
//   componentDidMount(){
//     this.setState({
//       latitudeDelta: .0922,
//       longitudeDelta: .0922,
//     })
//     // console.log(this.props.center)
//     // console.log(this.props.churches)
//   }
//
//   componentWillReceiveProps(nextProps){
//     this.setState({
//       hospitals: nextProps.hospitals,
//       description: nextProps.description
//     })
//     console.log(nextProps.hospitals);
//     console.log(nextProps.description);
//   }
//
//   phonePress(){
//     console.log('Pressed!');
//   }
//
//
//   render(){
//     return(
//       <MapView
//           provider={this.props.provider}
//           style={styles.map}
//           region={{
//             latitude: this.props.center[1],
//             longitude: this.props.center[0],
//             latitudeDelta: this.state.latitudeDelta,
//             longitudeDelta: this.state.longitudeDelta
//           }}
//         >
//          {/*Marker Rendering*/}
//          {this.props.hospitals.length === 0 ? null: this.state.hospitals.map((hospital) => {
//            return (
//            <MapView.Marker
//           //  onPress={() => this.show()}
//            key = {hospital.id}
//            coordinate= {{
//              latitude: hospital.geometry.location.lat,
//              longitude: hospital.geometry.location.lng,
//              latitudeDelta: this.state.latitudeDelta,
//              longitudeDelta: this.state.longitudeDelta
//            }}
//            image={MarkerImg}>
//
//            {/* <MapView.Callout style={styles.calloutCont} onPress={this.phonePress.bind(this)}> */}
//
//               {/* <View style={[styles.container, this.props.style]}>
//               <View style={styles.bubble}>
//                 <View style={styles.amount}> */}
//                 {/* <ChurchDetail church={church}  style={styles.churchDetail}/> */}
//                 {/* </View>
//               </View>
//               <View style={styles.arrowBorder} />
//               <View style={styles.arrow} />
//               </View> */}
//
//             {/* </MapView.Callout> */}
//
//            </MapView.Marker>
//          )
//          })}
//
//       </MapView>
//     )
//   }
// }
//
// MapWrapper.propTypes = {
//   provider: MapView.ProviderPropType
// };
//
//   const styles = StyleSheet.create({
//
//     map: {
//       ...StyleSheet.absoluteFillObject
//     },
//
//   //   customView: {
//   //   width: 240,
//   //   height: 100,
//   // },
//     calloutCont: {
//       height:250,
//       width:250
//     },
//
//     bubble: {
//     width: 140,
//     flexDirection: 'row',
//     alignSelf: 'flex-start',
//     backgroundColor: '#005371',
//     paddingHorizontal: 20,
//     paddingVertical: 12,
//     borderRadius: 6,
//     borderColor: '#007a87',
//     borderWidth: 0.5,
//   },
//   amount: {
//     flex: 1,
//   },
//   arrow: {
//     backgroundColor: 'transparent',
//     borderWidth: 16,
//     borderColor: 'transparent',
//     borderTopColor: '#4da2ab',
//     alignSelf: 'center',
//     marginTop: -32,
//   },
//   arrowBorder: {
//     backgroundColor: 'transparent',
//     borderWidth: 16,
//     borderColor: 'transparent',
//     borderTopColor: '#007a87',
//     alignSelf: 'center',
//     marginTop: -0.5,
//   }
//
// })
