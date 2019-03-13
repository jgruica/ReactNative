import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client';
// import { NativeRouter, Route } from "react-router-native";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ReservationList from './components/ReservationList';
import ReservationDetails from './components/ReservationDetails';
import AddNewReservation from './components/AddNewReservation';

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri: 'https://us1.prisma.sh/public-luckox-377/reservation-graphql-backend/dev' })
})

const styles = {
  container: {
    marginTop: 50,
    flex: 2,
    backgroundColor: '#F5FCFF',
  }
}

const Navigation = createStackNavigator({
  Home: {screen: ReservationList } ,
  Details: {screen: ReservationDetails },
  AddNew: {screen: AddNewReservation },
  initialRouteName: 'Home',
},
{
  defaultNavigationOptions: {
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#000',
    },
  },
}
);

const AppContainer = createAppContainer(Navigation);

const App = () => {
  return (
    <ApolloProvider client={client}>
        <View style={styles.container}>
          <AppContainer />
        </View>
    </ApolloProvider>
  );
}

export default App;