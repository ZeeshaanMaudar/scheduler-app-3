import React, { Component } from 'react';
import { View, Text, Button, AsyncStorage, StyleSheet } from 'react-native';

class MainScreen extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.loadScouts();
    this.loadClients();
    this.loadLocalClientsAndScouts();
  }

  loadScouts = () => {
    const token = '1536660107LWZ2JGK17J72HR4O5NU53FBBSLSMRB';
      fetch('https://sherlock.aerobotics.io/developers/scoutmissions/', {
      headers: {
        Authorization: `${token}`
      }
    })
    .then(res => res.json())
    .then(json => {

      let scoutsObject = {};
      let colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'black'];
      let array = json.results;
      for(let i in array) {
        if(!scoutsObject[array[i].date]) scoutsObject[array[i].date] = {dots: [{...array[i], key: array[i].title, color: colors[i], selectedDotColor: 'white', assigned: false, label: array[i].title, value: array[i].title}]};

        else scoutsObject[array[i].date].dots.push({...array[i], key: array[i].title, color: 'red', selectedDotColor: 'white', assigned: false, label: array[i].title, value: array[i].title})
      }

      AsyncStorage.setItem('localScoutsObject', JSON.stringify(scoutsObject));
    });
  }

  loadClients = () => {
    let newArray = [];
    const token = '1536660107LWZ2JGK17J72HR4O5NU53FBBSLSMRB';
    fetch('https://sherlock.aerobotics.io/developers/clients/', {
      headers: {
        Authorization: `${token}`
      }
    })
    .then(res => res.json())
    .then(json => {
      json.results.map(({ name }) => {
        newArray.push({ label: name, value: name, assigned: false })
      });

      let localClientsObject = {
        clientList: newArray
      }

      AsyncStorage.setItem('localClientsObject', JSON.stringify(localClientsObject));    
    })  
  }

  loadLocalClientsAndScouts = () => {
    let localClientsAndScoutsObject = {};

    AsyncStorage.setItem('localClientsAndScoutsObject', JSON.stringify(localClientsAndScoutsObject));
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.screen}>
        <Text>Welcome to the scheduler app</Text>
        <View style={styles.button}>
          <Button title="View All Schedules" onPress={() => {
            navigation.navigate({routeName: 'Calendar'})
          }} />
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 10,
  }
});

export default MainScreen;
