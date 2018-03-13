import uuid from 'uuid';
import database from '../firebase/firebase';

export const addCustomer = customer => ({
  type: 'ADD_CUSTOMER',
  customer
});

export const startAddCustomer = (customerData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    const {
      firstName = '',
      lastName = '',
      age = 0,
      address = {
        address: '',
        city: '',
        state: ''
      },
      coats = false,
      shoes = false,
      phoneNumber = '',
      dependants = false,
      visits = false
    } = customerData;
    const customer = {
      firstName,
      lastName,
      age,
      address,
      coats,
      shoes,
      phoneNumber,
      dependants,
      visits
    };

    database
      .ref(`users/${uid}/customers`)
      .push(customer)
      .then(ref => {
        dispatch(
          addCustomer({
            id: ref.key,
            coats: [],
            shoes: [],
            dependants: [],
            visits: [],
            ...customer
          })
        );
      });
  };
};

export const removeCustomer = ({ id } = {}) => ({
  type: 'REMOVE_CUSTOMER',
  id
});

export const startRemoveCustomer = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database
      .ref(`users/${uid}/customers/${id}`)
      .remove()
      .then(() => {
        dispatch(removeCustomer({ id }));
      });
  };
};

export const editCustomer = (id, updates) => ({
  type: 'EDIT_CUSTOMER',
  id,
  updates
});

export const startEditCustomer = (id, state) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    dispatch(editCustomer(id, state));
    database
      .ref(`users/${uid}/customers/${id}`)
      .set(state)
      .then(() => {});
  };
};

export const startEditSingleProp = (id, update) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    dispatch(editCustomer(id, update));
    database.ref(`users/${uid}/customers/${id}`).update(update);
  };
};

export const addDependant = ({ name = '', age = '' }) => ({
  id: uuid(),
  name,
  age
});

export const setCustomers = customers => ({
  type: 'SET_CUSTOMERS',
  customers
});

export const startSetCustomers = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database
      .ref(`users/${uid}/customers`)
      .once('value')
      .then(snapshot => {
        const customers = [];
        snapshot.forEach(childSnapshot => {
          customers.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setCustomers(customers));
      });
  };
};
