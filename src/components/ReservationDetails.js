import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  TouchableHighlight
} from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';

import moment from 'moment';
import DateTimePicker from 'react-native-modal-datetime-picker';

import Loader from "./Loader";
import { reservationQuery } from '../../queries/AllQueries';
import { updateReservation, deleteReservation } from '../../mutations/AllMutations';

import styles from "../../styles/ReservationDetailsStyle";

export class ReservationDetails extends Component {
  state = {
    name: '',
    hotelName: '',
    arrivalDate: '',
    departureDate: '',
    displayDeleteModal: false,
    updatingReservation: false,
    updatingReservationErr: '',
    arrivalDatePickerVisible: false,
    departureDatePickerVisible: false,
  }

  static navigationOptions = {
    title: "Details",
  }

  toggleDeleteModal = () => {
    this.setState({ displayDeleteModal: !this.state.displayDeleteModal })
  }

  onPressDelete = () => {
    this.toggleDeleteModal();
  }

  componentDidMount() {
    if (this.props.data.reservation) {
      this.setState({
        name: this.props.data.reservation.name,
        hotelName: this.props.data.reservation.hotelName,
        arrivalDate: this.props.data.reservation.arrivalDate,
        departureDate: this.props.data.reservation.departureDate
      })
    }
  }

  componentDidUpdate(lastProps) {
    if (this.props.data.reservation !== lastProps.data.reservation && this.props.data.reservation) {
      this.setState({
        name: this.props.data.reservation.name,
        hotelName: this.props.data.reservation.hotelName,
        arrivalDate: this.props.data.reservation.arrivalDate,
        departureDate: this.props.data.reservation.departureDate
      })
    }
  }

  updateReservation = () => {
    const { name, hotelName, arrivalDate, departureDate } = this.state;
    if (!name.length || !hotelName.length || !arrivalDate.length || !departureDate.length) {
      this.setState({ updatingReservationErr: "Fields can't be empty", updatingReservation: false });
      return;
    }
    this.setState({ updatingReservation: true });
    this.props.updateReservation({ name, hotelName, arrivalDate, departureDate }, { id: this.props.navigation.getParam('id') })
      .then(() => {
        this.setState({ updatingReservation: false });
        this.props.navigation.navigate('Home');
      })
      .catch(() => {
        this.setState({ updatingReservation: false });
      });
  }

  deleteReservation = () => {
    this.props.deleteReservation({ id: this.props.navigation.getParam('id') })
      .then(() => {
        this.toggleDeleteModal();
        this.props.navigation.navigate('Home');
      })
      .catch();
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
    const { updatingReservationErr } = this.state;
    const { data } = this.props;

    const arrivalDateValue = this.state.arrivalDate !== '' ?
      moment(this.state.arrivalDate).format('l').toString() : '';
    const departureDateValue = this.state.departureDate !== '' ?
      moment(this.state.departureDate).format('l').toString() : '';

    return (
      <View style={styles.wrapper}>
        {data.loading ?
          <Loader loading={data.loading} />
          :
          <View style={{ padding: 5 }}>
            {updatingReservationErr ? <Text>{updatingReservationErr}</Text> : null}
            <Text style={styles.text}>Name:</Text>
            <TextInput
              style={styles.input}
              defaultValue={data.reservation.name}
              onChangeText={(name) => this.setState({ name })} />
            <Text style={styles.text}>Hotel name:</Text>
            <TextInput
              style={styles.input}
              defaultValue={data.reservation.hotelName}
              onChangeText={(hotelName) => this.setState({ hotelName })} />
            <Text style={styles.text}>Arrival time:</Text>
            <TouchableOpacity onPress={() => this.showDateTimePicker('arrivalDatePickerVisible')}>
              <TextInput
                style={styles.input}
                defaultValue={arrivalDateValue}
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
              <Text style={styles.text}>Departure time:</Text>
            <TouchableOpacity onPress={() => this.showDateTimePicker('departureDatePickerVisible')}>
              <TextInput
                style={styles.input}
                defaultValue={departureDateValue}
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
          </View>
        }
        <View style={styles.buttonsContainer}>
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={this.onPressDelete}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={this.updateReservation}
          >
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
        </View>
        {this.state.displayDeleteModal &&
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.displayDeleteModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={styles.modalContent}>
              <View>
                <Text style={styles.text}>Are you sure you want to delete this reservation? </Text>
                <View style={styles.buttonsContainer}>
                  <TouchableHighlight
                    style={styles.cancelButon}
                    onPress={() => {
                      this.toggleDeleteModal();
                    }}>
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.deleteButton}
                    onPress={this.deleteReservation}>
                    <Text style={styles.buttonText}>Delete</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        }
      </View>

    )
  }
}


export default compose(
  withApollo,
  graphql(reservationQuery, {
    options: ({ navigation }) => ({
      variables: { where: { id: navigation.getParam('id')} }
    })
  }),
  graphql(updateReservation, {
    props: ({ mutate }) => ({
      updateReservation: (data, where) => mutate({ variables: { data, where } })
    })
  }),
  graphql(deleteReservation, {
    props: ({ mutate }) => ({
      deleteReservation: (where) => mutate({ variables: { where } })
    })
  }),
)(ReservationDetails);