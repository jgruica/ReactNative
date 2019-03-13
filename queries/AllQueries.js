import gql from "graphql-tag";

export const reservations = gql`
query reservations {
  reservations {
    id,
    name,
    hotelName,
    arrivalDate,
    departureDate
  }
}
`;

export const reservationQuery = gql`query reservation($where: ReservationWhereUniqueInput!) { 
  reservation(where: $where) {
    id,
    name,
    hotelName,
    arrivalDate,
    departureDate
}
}`