import mongoose from 'mongoose';

const folderTreeSchema = new mongoose.Schema([{
  name: {
    type: String,
    required: true,
  },
  ancestor: {
    type: mongoose.Types.ObjectId,
    // required: [true, 'Folder Ancestor is Required!'],
    ref: 'folder',
  },
  child: [
    {
      type: Object,
      default: []
    },
  ],
  designation: {
    type: String,
    default: 'folder',
  },
}]);

const FolderTree = mongoose.model('folders-tree', folderTreeSchema);
export default FolderTree;
