import { admins } from "../firebase/firebase";
import database, { storage } from '../firebase/firebase';
import moment from 'moment';

export const createContent = content => ({
  type: 'CREATE_CONTENT',
  content
});

export const startCreateContent = (contentData) => {

  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    const content = {
      category: '',
      subcategory: '',
      title: '',
      description: '',
      date: Number(moment().format('x')),
      url: '',
      editorState: '{"entityMap":{},"blocks":[{"key":"dg53k","text":"Create a masterpiece!","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}',
      ...contentData
    };

    if ( admins.includes(uid) ){
      database
        .ref(`content`)
        .push(content)
        .then(ref => {
          dispatch(
            createContent({
              id: ref.key,
              ...content
            })
          );
        });
    }
  };
};


export const editContent = (id, updates) => ({
  type: 'EDIT_CONTENT',
  id,
  updates
});

export const startEditContent = (id, state) => {
  return (dispatch, getState) => {
    dispatch(editContent(id, state));
    database
      .ref(`content/${id}`)
      .update(state)
      .then(() => {});
  };
};


export const removeContent = ({ id } = {}) => ({
  type: 'REMOVE_CONTENT',
  id
});

export const startRemoveContent = ({ id } = {}) => {
  return (dispatch, getState) => {
    database
      .ref(`content/${id}`)
      .remove()
      .then(() => {
        dispatch(removeContent({ id }));
      });
  };
};

export const setContent = content => ({
  type: 'SET_CONTENT',
  content
});

export const startSetContent = (category) => {
  return (dispatch, getState) => {
    const ref = database.ref("content");
    return ref
      .orderByChild("category")
      .equalTo(category)
      .once('value')
      .then(snapshot => {
        const content = [];
        snapshot.forEach(childSnapshot => {
          content.push({
            id: childSnapshot.key,
            ...childSnapshot.val()
          });
        });
        dispatch(setContent(content));
      });
  };
};

export const startSetContentById = (id) => {
  return (dispatch, getState) => {
    const ref = database.ref(`content/${id}`);
    return ref
      .once('value')
      .then(snapshot => {
        console.log(snapshot.val());
        const content = [{id, ...snapshot.val()}];
        dispatch(setContent(content));
      });
  };
};

export const startUploadImage = (file, subcategoty) => {
  return (dispatch, getState) => {
    const ref = storage.ref(`${subcategoty}/${String(file)}`);
    return ref
      .put(file)
      .then(snapshot => {
        console.log('Uploaded' , snapshot.totalBytes, 'bytes');
      });
  };
};



