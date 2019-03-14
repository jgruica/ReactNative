import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { graphql, compose, withApollo } from 'react-apollo';
import { createReservation } from '../../mutations/AllMutations';
import { reservations } from '../../queries/AllQueries';

import styles from "../../styles/AddNewReservationStyle";

class AddNewReservation extends Component {
  state = {
    name: '',
    hotelName: '',
    arrivalDate: '',
    departureDate: '',
    creatingReservation: false,
    creatingReservationErr: "",
    arrivalDatePickerVisible: false,
    departureDatePickerVisible: false,
  }

  static navigationOptions = {
    title: "Create reservation",
  }

  createNewReservation = () => {
    const { name, hotelName, arrivalDate, departureDate } = this.state;
    if (!name.length || !hotelName.length || !arrivalDate || !departureDate) {
      this.setState({ creatingReservationErr: "Fields can't be empty", creatingReservation: false });
      return;
    }
    this.setState({ creatingReservation: true });
    this.props.createReservation({ name, hotelName, arrivalDate, departureDate })
      .then(() => {
        this.setState({ creatingReservation: false });
        this.props.data.refetch();
        this.props.navigation.navigate('Home');
      })
      .catch(() => {
        this.setState({ creatingReservation: false });
      });
  }

  showDateTimePicker = (field) => {
    this.setState({ [field]: true });
  }

  hideDateTimePicker = (field) => {
    this.setState({ [field]: false });
  }

  handleDatePicked = (date, dateField, hideField) => {
    this.setState({
      [dateField]: date
    })
    this.hideDateTimePicker(hideField);
  };


  render() {
    const { creatingReservationErr, creatingReservation } = this.state;
    const { data } = this.props;

    const arrivalDateValue = this.state.arrivalDate !== '' ?
      moment(this.state.arrivalDate).format('l').toString() : '';
    const departureDateValue = this.state.departureDate !== '' ?
      moment(this.state.departureDate).format('l').toString() : '';


    return (
      <View style={styles.wrapper}>
        {creatingReservationErr ? <Text>{creatingReservationErr}</Text> : null}
        <Text style={styles.text}>Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(name) => this.setState({ name })} />
        <Text style={styles.text}>Hotel name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Hilton"
          onChangeText={(hotelName) => this.setState({ hotelName })} />
        <TouchableOpacity onPress={() => this.showDateTimePicker('arrivalDatePickerVisible')}>
          <TextInput
            style={styles.input}
            placeholder="Choose arrival time"
            value={arrivalDateValue}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.arrivalDatePickerVisible}
          mode='date'
          onConfirm={(date) => this.handleDatePicked(date, 'arrivalDate', 'arrivalDatePickerVisible')}
          onCancel={() => this.hideDateTimePicker('arrivalDatePickerVisible')}
        />
        <TouchableOpacity onPress={() => this.showDateTimePicker('departureDatePickerVisible')}>
          <TextInput
            style={styles.input}
            placeholder="Choose departure time"
            value={departureDateValue}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
        <DateTimePicker
          isVisible={this.state.departureDatePickerVisible}
          mode='date'
          onConfirm={(date) => this.handleDatePicked(date, 'departureDate', 'departureDatePickerVisible')}
          onCancel={() => this.hideDateTimePicker('departureDatePickerVisible')}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={this.createNewReservation}
        >
          <Text style={styles.submitButtonText}>{!creatingReservation ? 'Add reservation' : 'Adding...'} </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default compose(
  withApollo,
  graphql(createReservation, {
    props: ({ mutate }) => ({
      createReservation: (data) => mutate({ variables: { data } })
    })
  }),
  graphql(reservations, {
    options: {
      fetchPolicy: "network-only"
    }
  }),
)(AddNewReservation);