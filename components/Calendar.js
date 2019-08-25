import React, {Component} from 'react';

import {
  View,
  Text,
  AsyncStorage,
  StyleSheet
} from 'react-native';

import { Calendar } from 'react-native-calendars';

import ScoutsAgenda from './ScoutsAgenda';
import NoScouts from './NoScouts';


class CalendarsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDay: {},
      isModalVisible: false,
      scouts: {},
      clients: []
    };
  }

  componentDidMount() {
    this.fetchScoutsFromStorage();
    this.fetchClientsFromStorage();
  }

  fetchScoutsFromStorage = async () => {
    try {
      let localScoutsObject = await AsyncStorage.getItem('localScoutsObject');
      let parsedScouts = JSON.parse(localScoutsObject);
      this.setState({ scouts: parsedScouts })
    }

    catch(error) {
      console.log('fetchScouts error:', error);
    }
  }

  fetchClientsFromStorage = async () => {
    try {
      let localClientsObject = await AsyncStorage.getItem('localClientsObject');
      let parsedScouts = JSON.parse(localClientsObject);
      this.setState({ clients: parsedScouts['clientList'] });
    }

    catch(error) {
      console.log('fetchClients error:', error);
    }
  }

  onDayPress = day => {
    let selectedDay = {...day};
    this.setState({ isModalVisible: true, selectedDay });
  }

  closeModal = () => {
    this.setState({ isModalVisible: false });
  }

  render() {
    const { selectedDay, isModalVisible, scouts, clients } = this.state;
    const { dateString } = selectedDay;


    if(isModalVisible) {
      if(!scouts[dateString]) {
        return (
          <NoScouts
            {...{ dateString }}
            visible={isModalVisible}
            closeModal={this.closeModal}
          />
        )
      } else {
        return (
          <ScoutsAgenda
            {...{ dateString, scouts, clients }}
            visible={isModalVisible}
            closeModal={this.closeModal}
          />
        );
      }
    }

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Click on a marked Day to assign someone to a Scout</Text>
        <Calendar
          style={styles.calendar}
          current={'2018-09-09'}
          markingType={'multi-dot'}
          markedDates={scouts}
          onDayPress={this.onDayPress}
          hideArrows={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
  }
});

export default CalendarsScreen;
