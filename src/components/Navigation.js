import { createStackNavigator, createAppContainer } from 'react-navigation';
import ReservationList from './components/ReservationList';
import ReservationDetails from './components/ReservationDetails';
import AddNewReservation from './components/AddNewReservation';

const Root = createStackNavigator({
    Home: { 
      screen: ReservationList,
    },
    Details: { 
      screen: ReservationDetails,
    },
    AddNew: {
      screen: AddNewReservation
    }
});

const Navigation = createAppContainer(Root);
export default Navigation; 