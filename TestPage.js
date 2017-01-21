import React from 'react';
import { StyleSheet, View, Text,TextInput, Dimensions, TouchableOpacity } from 'react-native';
import HomePage from './HomePage';
import Button from 'react-native-button';
import axios from 'axios';
import InfoPage from './InfoPage';




export default class TestPage extends React.Component {

  static route = {
  title: 'test',
}

constructor(props) {
  super(props);
  this.state = {
    data: {},
    // disease: []
  }
}

componentDidMount() {
  this.getData()
  // this.getDisease()
}

getData() {
  axios.get("https://clinicaltrialsapi.cancer.gov/v1/clinical-trials?diseases.nci_thesaurus_concept_id="+ this.props.route.params.data)
  .then((response)=> {
    let newData = response.data;
    console.log(newData);
    this.setState({
      data: newData
    })
  })
  .catch(function (error) {
  console.log(error);
  })
}

// getDisease() {
//   axios.get("https://clinicaltrialsapi.cancer.gov/v1/terms?term="+ this.props.route.params.disease + "%20n")
//   .then((response)=> {
//     let newDisease = response.data.terms.codes;
//     console.log(newDisease);
//     this.setState({
//       disease: newDisease
//     })
//   })
//   .catch(function (error) {
//   console.log(error);
//   })
// }


//back button functionality
_goBackHome() {
  this.props.navigator.pop();
}

  render(){
    return(
      <View style={styles.container}>
        { (this.state.data.trials && this.state.data.trials.length>1) ? <InfoPage  /> : null }
        <Text style={styles.locationText}>Find Testing Locations</Text>
        <View style={styles.searchCity}>
          <TextInput
            style={styles.textInput}
            placeholder='Enter City'
            onChangeText={(value) => this.setState({value})}
            value={this.state.city}
          />
        </View>

        <View style={styles.searchButton}>
          <Button
            style={styles.buttonStyling}
            styleDisabled={{color: 'red'}}
            // onPress={this.goToMap.bind(this)}>Search
            >Search
          </Button>
        </View>

        <View style={styles.buttonContainer}>
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

      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FED69B',
  },

  locationText: {
    color:'#8E8C8B',
    marginBottom:-10
  },

  searchCity: {
    flexDirection:'row',
    marginTop: 30,
    justifyContent:'center',
    backgroundColor:'transparent'
  },

  textInput: {
    height:40,
    borderRadius: 10,
    width:170,
    textAlign: 'center',
    backgroundColor:'#F0F0F0',
  },


  button: {
    width: 80,
    // paddingHorizontal: 12,
    // alignItems: 'center',
    // marginHorizontal: 10,
    fontSize:22,
    color:'#8E8C8B',
    fontWeight: '200',
  },

  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
  },

  searchButton: {
    alignItems:'center',
    backgroundColor:'transparent',
    marginTop:10
  },

  buttonStyling: {
    // position:'relative',
    textAlign:'center',
    fontSize:20,
    color:'#8E8C8B',
    borderRadius: 5,
    fontWeight: '200',
    borderWidth:1,
    borderColor:'#8E8C8B',
    width:80,
    height:40,
    paddingTop:6
    // width:100
  }




})
