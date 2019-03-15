import 'jsdom-global/register';
import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import  { ReservationList } from '../src/components/ReservationList';

configure({ adapter: new Adapter() });
import renderer from 'react-test-renderer';

describe("ReservationList", () => {
  const data = {
    loading: false,
    error: null,
    reservations: [{
      id: '123',
      name: 'Test Name',
      hotelName: 'Test Hotel',
      arrivalDate: '01/01/2020',
      departureDate: '01/05/2020'
    }]
  }

  it('renders Reservation List', () => {
    const wrapper = renderer.create(
      <ReservationList 
        data={data}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
