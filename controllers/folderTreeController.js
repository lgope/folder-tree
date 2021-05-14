// Catch Async Error
import catchAsync from '../utils/catchAsync.js';

// Global Error Handler
import AppError from '../utils/appError.js';

// Folder Model
import Folder from '../models/folderTreeModel.js';

import mongoPkg from 'mongodb';
const { ObjectID } = mongoPkg;

/**
 * update root object based on params
 * @param root @String folder tree object
 * @param method @String method to be perform (create or delete)
 * @param body @String body depend on method if method is 'create' then body is new folder details else folder id and ancestor id;
 */

const updateFolderTree = (root, method, body) => {
  const updateRoot = data => {
    data.forEach(ch => {
      if (ch._id.toString() === body.ancestor.toString()) {
        ch.child =
          method === 'create'
            ? [...ch.child, { ...body }]
            : ch.child.filter(
                folder => folder._id.toString() !== body.id.toString()
              );
      } else if (ch.child.length > 0) updateRoot(ch.child);
    });
  };

  updateRoot([root]);

  return root;
};

export const getFoldersTree = catchAsync(async (req, res, next) => {
  const folders = await Folder.findOne({ designation: 'root' });

  // SEND RESPONSE
  res.status(200).json(folders);
});

/**
 * create a folder controler
 * @param name @String folder name
 * @param ancestor @String ancestor id
 */

export const createFolderTree = catchAsync(async (req, res, next) => {
  const root = await Folder.findOne({ designation: 'root' });

  const { name, ancestor } = req.body;

  const updatedRoot = updateFolderTree(root, 'create', {
    _id: ObjectID(),
    name,
    ancestor,
    child: [],
    designation: 'folder',
  });

  const updatedTree = await Folder.findOneAndUpdate(
    { designation: 'root' },
    { $set: { child: updatedRoot.child } },
    { new: true }
  );

  res.status(201).json(updatedTree);
});

/**
 * delete a folder controler
 * @param id @String folder id
 * @param ancestor @String ancestor id
 */

export const deleteFolder = catchAsync(async (req, res, next) => {
  const root = await Folder.findOne({ designation: 'root' });

  const { id, ancestor } = req.body;

  const updatedRoot = updateFolderTree(root, 'delete', { id, ancestor });

  const updatedTree = await Folder.findOneAndUpdate(
    { designation: 'root' },
    { $set: { child: updatedRoot.child } },
    { new: true }
  );

  res.status(201).json(updatedTree);
});

// create folder tree controller
export const createFolderRoot = catchAsync(async (req, res, next) => {
  const newFolder = await Folder.create({ ...req.body });
  res.status(201).json(newFolder);
});
