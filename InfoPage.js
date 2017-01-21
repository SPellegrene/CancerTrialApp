import React from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
// import Hr from 'react-native-hr';
import TestPage from './TestPage';

export default class InfoPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // disease: this.props.disease
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      data:this.props.data
      // disease: nextProps.disease
    })
    console.log(nextProps.data.trials[0].diseases[0].preferred_name)
  }


  render() {
    if (this.state.data.trials && this.state.data.trials.length > 0) {
      return(
        <View style={styles.dataContainer}>
          {this.state.data !== null ? this.state.data.trials.diseases.preferred_name : this.props.trials }
          <Text>Summary</Text>
          <Text style={styles.testSummary} >{this.state.data}</Text>

        </View>
      )
    }
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
