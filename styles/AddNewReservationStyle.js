import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 20,
  },
  text: {
    fontSize: 15,
    textAlign: 'left',
    marginLeft: 10,
    color: '#2e3131'
  },
  input: {
    margin: 10,
    height: 40,
    borderColor: '#8c14fc',
    borderWidth: 0.2,
    borderRadius: 10,
    paddingLeft: 10
  },
  submitButton: {
    padding: 10,
    margin: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8c14fc',
    backgroundColor: '#FFFFFF',
    height: 40,
    justifyContent: 'center'
  },
  submitButtonText: {
    color: '#8c14fc',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center'
  }
});