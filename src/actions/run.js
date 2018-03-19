import uuid from 'uuid';
import database from '../firebase/firebase';

export const addRun = run => ({
  type: 'ADD_RUN',
  run
});

export const startAddRun = (runData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    const {
      date = Number(new Date().getTime()),
      time = 0,
      distance = 0,
    } = runData;
    const run = {
      date,
      time,
      distance
    };

    database
      .ref(`users/${uid}/runs`)
      .push(run)
      .then(ref => {
        dispatch(
          addRun({
            id: ref.key,
            ...run
          })
        );
      });
  };
};

export const removeRun = ({ id } = {}) => ({
  type: 'REMOVE_RUN',
  id
});

export const startRemoveRun = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    database
      .ref(`users/${uid}/runs/${id}`)
      .remove()
      .then(() => {
        dispatch(removeRun({ id }));
      });
  };
};

//
// export const editCustomer = (id, updates) => ({
//   type: 'EDIT_CUSTOMER',
//   id,
//   updates
// });
//
// export const startEditCustomer = (id, state) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     dispatch(editCustomer(id, state));
//     database
//       .ref(`users/${uid}/customers/${id}`)
//       .set(state)
//       .then(() => {});
//   };
// };
//
// export const startEditSingleProp = (id, update) => {
//   return (dispatch, getState) => {
//     const uid = getState().auth.uid;
//     dispatch(editCustomer(id, update));
//     database.ref(`users/${uid}/customers/${id}`).update(update);
//   };
// };
//
// export const addDependant = ({ name = '', age = '' }) => ({
//   id: uuid(),
//   name,
//   age
// });
//

export const setRuns = runs => ({
  type: 'SET_RUNS',
  runs
});

export const startSetRuns = (uid) => {
  return (dispatch, getState) => {
    return uid && database
      .ref(`users/${uid}/runs`)
      .once('value')
      .then(snapshot => {
        const runs = [];
        snapshot.forEach(childSnapshot => {
          runs.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setRuns(runs));
      });
  };
};
