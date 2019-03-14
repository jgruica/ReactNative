import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { graphql, compose, withApollo } from 'react-apollo';
import Icon from 'react-native-vector-icons/Entypo';

import moment from 'moment';
import sortBy from 'lodash/sortBy';

import Loader from './Loader';

import { reservations } from '../../queries/AllQueries';

import styles from "../../styles/ReservationListStyle";

const colors = ['#f1a9a0', '#d2527f', '#e74c3c', '#9f5afd', 
'#913d88', '#81cfe0', '#1e8bc3', '#2ecc71', '#1e824c', '#fef160', '#e67e22', '#f5e51b', '#f27935']
let nextColorIndex = 0
const colorMap = {}
const getHotelColor = (hotelName) => {
  if (!colorMap[hotelName]) {
    colorMap[hotelName] = colors[nextColorIndex]
    nextColorIndex = (nextColorIndex + 1) % colors.length
  }
  return {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomColor: '#A9A9A9',
    borderBottomWidth: 0.2,
    borderLeftColor: colorMap[hotelName],
    borderLeftWidth: 10,
  }
}

class ReservationList extends Component {
  static navigationOptions = {
    title: "Reservations",
  }
  render() {
    const { data } = this.props;
    const sortedReservations = data.reservations && data.reservations.length && sortBy(data.reservations, "hotelName");
    const detailsIcon = <Icon name="chevron-small-right" size={30} color="#A9A9A9" />;
    if (data.loading) {
      return <Loader loading={data.loading} />;
    } else {
      return (
        <View>
          <ScrollView>
            {sortedReservations.map(reservation =>
              <View key={reservation.id} style={getHotelColor(reservation.hotelName)} >
                <Text style={styles.header}>{reservation.name}</Text>
                <Text style={styles.text}>{moment(reservation.arrivalDate).format("ll")} - {moment(reservation.departureDate).format("ll")}</Text>
                <Text style={styles.text}>{reservation.hotelName}</Text>
                <TouchableOpacity onPress={() =>
                  this.props.navigation.navigate('Details', { id: reservation.id })}
                  style={{ position: 'absolute', top: 10, right: 20 }}>
                  <Text>{detailsIcon}</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
          <TouchableOpacity onPress={() =>
            this.props.navigation.navigate('AddNew')
          } style={{
            width: 60, height: 60, borderRadius: 60 / 2, backgroundColor: '#8c14fc',
            position: 'absolute', bottom: 30, right: 20, alignSelf: 'flex-end'
          }} underlayColor="#f0f4f7">
            <Text style={{ fontSize: 25, color: '#FFFFFF', left: 22, top: 12 }}>+</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

export default compose(
  withApollo,
  graphql(reservations, {
    options: {
      fetchPolicy: "network-only"
    }
  }),
)(ReservationList);