import { FC, ReactElement, useEffect } from 'react';
import Folders from './components/Folders';
import './App.css';

// redux stuff
import { useSelector, useDispatch } from 'react-redux';
import { selectFolders } from './redux/reducers/folderReducer';
import { fetchFolderRoot } from './redux/actions/folderAction';

const App: FC = (): ReactElement => {
  const folder = useSelector(selectFolders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFolderRoot());
  }, [dispatch]);

  return (
    <div className='App'>
      {folder.isLoading ? (
        <h2>Loading....</h2>
      ) : (
        <div className='folder-root-data'>
          <Folders folders={[folder.folderRoot]} />
        </div>
      )}
    </div>
  );
};

export default App;
