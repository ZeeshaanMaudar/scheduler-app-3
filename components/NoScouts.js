import React from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';

const NoScouts = ({ visible, closeModal, dateString }) => (
  <Modal
    {...{ visible }}
    animationType="slide"
  >
    <View style={styles.container}>
      <Text>No Scouts today!!!</Text>
      <Text>Date: {dateString}</Text>
      <View style={styles.button}>
        <Button title='Go Back' onPress={() => closeModal()} />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginVertical: 10
  }
})

export default NoScouts;
