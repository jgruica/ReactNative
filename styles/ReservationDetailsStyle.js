import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 20
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
  deleteButton: {
    borderRadius: 10,
    backgroundColor: '#cf000f',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  updateButton: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#8c14fc',
    backgroundColor: '#FFFFFF',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  updateButtonText: {
    color: '#8c14fc',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
  },
  modalContent: {
    height: 100,
    marginTop: 150,
    backgroundColor: 'white',
    padding: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20
  },
  cancelButon: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    backgroundColor: '#FFFFFF',
    width: '40%',
    height: 40
  },
  cancelText: {
    color: '#A9A9A9',
    textAlign: 'center',
    alignSelf: 'center',
  },

});