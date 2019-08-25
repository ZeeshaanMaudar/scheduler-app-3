import React, { Component } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';


class ScoutAndClientDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoutSelectedValue: '',
      clientSelectedValue: ''
    }
  }

  changeScoutSelectedValue = itemValue => {
    this.setState({ scoutSelectedValue: itemValue });
  }

  changeClientSelectedValue = itemValue => {
    this.setState({ clientSelectedValue: itemValue });
  }

  assignClientToScout = () => {
    const { scoutSelectedValue, clientSelectedValue } = this.state;
    const { dateString } = this.props;
    let newObject = {[dateString]: [{scoutSelectedValue, clientSelectedValue}]};
    this.props.submitValue(newObject);
  }

  render() {
    const { scoutsArray, clients } = this.props;
  
    return (
      <View>
        <View style={styles.dropDownContainer}>
          <Text>Choose a Scout:</Text>
          <RNPickerSelect
            onValueChange={(itemValue) => this.changeScoutSelectedValue(itemValue)}
            items={scoutsArray}
          />
        </View>
        <View style={styles.dropDownContainer}>
          <Text>Choose a Worker:</Text>
          <RNPickerSelect
            onValueChange={(itemValue) => this.changeClientSelectedValue(itemValue)}
            items={clients}
          />
        </View>
        <View style={styles.button}>
          <Button title="Assign" onPress={this.assignClientToScout} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dropDownContainer: {
    marginVertical: 5,
  },
  button: {
    marginVertical: 10
  }
})

export default ScoutAndClientDropDown;
