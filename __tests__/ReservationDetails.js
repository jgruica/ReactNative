import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
import { ReservationDetails } from '../src/components/ReservationDetails';
jest.mock('DatePickerIOS', () => 'DatePickerIOS');

describe('Reservation details component', () => {
  const data = {
    reservation: [{
      id: '123',
      name: 'Test Name',
      hotelName: 'Test Hotel',
      arrivalDate: '01/01/2020',
      departureDate: '01/05/2020'
    }]
  }

  it('Details: renders correctly', () => {
    const tree = renderer.create(<ReservationDetails data={data}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});