import Folder from './Folder';

const FolderTree = ({folders}: any)  => (
    <div className='folder-tree'>
        <ul>
          {folders.map((folder: any, index: any) => (
            <Folder key={index} folder={folder} />
          ))}
        </ul>
    </div>
  );

export default FolderTree;
