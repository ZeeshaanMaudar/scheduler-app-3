import React, { Component } from 'react';
import { View, Text, Button, Modal, AsyncStorage, StyleSheet } from 'react-native';

import DropDown from './DropDown';

class ScoutsAgenda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoutAndClient: {}
    }
  }

  componentDidMount() {
    this.updateSelectedValue();
  }

  updateSelectedValue = async () => {
    try {
      let selectedValue = await this.fetchClientAndScoutValue();
      this.saveSelectedValue(selectedValue);
      
      this.setState({ scoutAndClient: selectedValue });
  
    } catch (error) {
      console.log('Selected Values Error', error);
    }
  }

  fetchClientAndScoutValue = async () => {

    try {
      let selectedValue = await AsyncStorage.getItem('localClientsAndScoutsObject');
      let selectedValueObject = JSON.parse(selectedValue);

      return selectedValueObject;

    } catch (error) {
      console.log('Error fetching Scout Value', error);
    }
  }

  saveSelectedValue = (selectedValue) => {
    AsyncStorage.setItem('localClientsAndScoutsObject', JSON.stringify(selectedValue));
  }

  getSelectedValues = selectedObject => {
    const { dateString } = this.props;
    const { scoutSelectedValue, clientSelectedValue} = selectedObject[dateString][0];

    if(scoutSelectedValue && clientSelectedValue) {
      this.updateLocalClientAndScout(selectedObject);
    }
  }

  updateLocalClientAndScout = async (selectedObject) => {
    const { dateString } = this.props;

    let clientAndScoutLocalObject = await AsyncStorage.getItem('localClientsAndScoutsObject');

    let parsedObject = JSON.parse(clientAndScoutLocalObject);
    let newObject = {...parsedObject};
    let keysArray = Object.keys(newObject);


    if(!newObject[dateString]) {
      if(keysArray.length < 1) {
        newObject = {...newObject, ...selectedObject}
      } else {
        newObject = {...newObject, ...selectedObject}
      }
    }
    else {
      let newBooleanArray = [];
      newObject[dateString].map(({ scoutSelectedValue, clientSelectedValue }) => {
        if(scoutSelectedValue !== selectedObject[dateString][0].scoutSelectedValue && clientSelectedValue !== selectedObject[dateString][0].clientSelectedValue) {
          newBooleanArray.push(true);
        }
      })

      if(newBooleanArray.length === newObject[dateString].length) {
        newObject[dateString].push(selectedObject[dateString][0]);
      }
    }

    let selectedValueObjectStringify = JSON.stringify(newObject);
    AsyncStorage.setItem('localClientsAndScoutsObject', selectedValueObjectStringify);

    this.setState({ scoutAndClient: newObject });
}

  render() {
    const { visible, closeModal, dateString, scouts, clients } = this.props;
    const { scoutAndClient } = this.state;
    const { getSelectedValues } = this;

    let scoutsArray = scouts[dateString].dots;

    callText = () => {
      if(!!scoutAndClient[dateString] && scoutAndClient[dateString].length > 0) {
        return scoutAndClient[dateString].map(({ scoutSelectedValue, clientSelectedValue }) => (
          <View key={scoutSelectedValue}>
            <Text>{scoutSelectedValue} has been assigned to {clientSelectedValue}</Text>
          </View>
        ));
      }
    }

    return (
      <Modal
        {...{ visible }}
        animationType="slide"
      >
        <Text>Date: {dateString}</Text>
        <DropDown
          {...{ scoutsArray, clients, dateString }}
          submitValue={getSelectedValues}
        />
        {callText()}
        <View style={styles.button}>
          <Button title='Go Back' onPress={() => closeModal()} />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'flex-end',
  }
})

export default ScoutsAgenda;
