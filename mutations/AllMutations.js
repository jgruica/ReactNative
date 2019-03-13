import gql from "graphql-tag";

export const createReservation = gql`
mutation createReservation($data: ReservationCreateInput!) {
  createReservation(data: $data) {
    id
  }
}`;

export const updateReservation = gql`
mutation updateReservation($data: ReservationUpdateInput!, $where: ReservationWhereUniqueInput!) {
  updateReservation(data: $data, where: $where) {
    name
    hotelName
    arrivalDate
    departureDate
    id
  }
}`;

export const deleteReservation = gql`mutation deleteReservation($where: ReservationWhereUniqueInput!) { 
  deleteReservation(where: $where) {
    id
  }
}`;