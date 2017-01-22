import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import TestPage from './TestPage';
import axios from 'axios';
import removeTrialSitesOutsideArea from './removeTrialSitesOutsideArea';


export default class InfoPage extends React.Component {

  static route = {
    title: 'info'
  }


  constructor(props) {
    super(props);
    console.log('infopage');
    this.state = {
      data: []
    }
  }

  componentDidMount() {
     this.getData();
   }

  getData() {
    console.log('city', this.props.route.params.city)

     // Lat and long here need to be looked up instead of hard coded
    console.log("https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?sites.org_coordinates_lat=39.1292&sites.org_coordinates_lon=-77.2953&sites.org_coordinates_dist=20km&diseases.nci_thesaurus_concept_id="+ this.props.route.params.id);
      axios.get("https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?sites.org_coordinates_lat=39.1292&sites.org_coordinates_lon=-77.2953&sites.org_coordinates_dist=20km&diseases.nci_thesaurus_concept_id="+ this.props.route.params.id)
      .then((response)=> {

        // The request above gets any trials with at least one sites within the geo range.
        let trialsNearbyWithAllSites = response.data.trials;

        console.log('trials', response.data.trials);
        let newData = removeTrialSitesOutsideArea(trialsNearbyWithAllSites, {
          latitude: 39.1292,
          longitude: -77.2953,
          radius: 20000 // 20km might not be big enough. If changed also needs to be changed up in api calls
        })
        console.log('newdata', newData);
        this.setState({
          data: newData
        })
      })
      .catch(function (error) {
      console.log(error);
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        data:nextProps.data
        // disease: nextProps.disease
      })
    }
    console.log(nextProps.data)
  }


  render() {
      return(
        <View style={styles.dataContainer}>
          <Text>Hello World</Text>
          {this.props.trials && this.props.trials.length > 0 ? this.props.trials.map((trial) => {
            return <Text>Trial</Text>
          }) : null }
        </View>
      )
    // }
  }
}

const styles = StyleSheet.create({

  dataContainer: {
    flexDirection: 'column',
    alignItems: 'center',

  },

  testName: {
    padding:15,
    // borderWidth:1,
    fontWeight:'bold',
    alignSelf: 'flex-start',
    marginBottom:10,
    marginTop:10
  },

  testSummary: {
    padding:10,
    marginBottom: 200,
    borderWidth:1,
    borderRadius:10,
    borderColor: '#8E8C8B',
    width:350

  },

  lineStyling: {
    color: 'black'
  }
})
