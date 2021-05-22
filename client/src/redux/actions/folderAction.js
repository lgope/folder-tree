import axios from 'axios';
import {
  getFolderRoot,
  newFolder,
  removeFolder,
} from '../reducers/folderReducer';

export const fetchFolderRoot = () => dispatch => {
  axios
    .get('api/folders-tree')
    .then(res => {
      dispatch(getFolderRoot(res.data));
    })
    .catch(err => console.log(err));
};

export const addFolder = body => dispatch => {
  axios
    .post('api/folders-tree/create', body)
    .then(res => {
      dispatch(newFolder(res.data));
    })
    .catch(err => console.log(err));
};

export const deleteFolder = body => dispatch => {
  axios
    .patch('api/folders-tree/delete', body)
    .then(res => {
      dispatch(removeFolder(res.data));
    })
    .catch(err => console.log(err));
};
