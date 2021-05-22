// Catch Async Error
import catchAsync from '../utils/catchAsync.js';

// Global Error Handler
import AppError from '../utils/appError.js';

// Folder Model
import Folder from '../models/folderTreeModel.js';

import mongoPkg from 'mongodb';
const { ObjectID } = mongoPkg;

/**
 * Update root object based on params
 * @param root @String folder tree object
 * @param method @String method to be perform (create or delete)
 * @param body @String body depend on method 👇
 * if method is 'create' then body is new folder details else folder id and ancestor id;
 */
const updateFolderTree = (method, body) => {
  return new Promise(
    catchAsync(async (resolve, reject) => {
      const root = await Folder.findOne({ designation: 'root' });

      // update folder tree data
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

      const updatedTree = await Folder.findOneAndUpdate(
        { designation: 'root' },
        { $set: { child: root.child } },
        { new: true }
      );

      resolve(updatedTree);
    })
  );
};

/**
 * Get root folder
 */
export const getFoldersTree = catchAsync(async (req, res, next) => {
  const folders = await Folder.findOne({ designation: 'root' });

  // SEND RESPONSE
  res.status(200).json(folders);
});

/**
 * Create a folder controler
 * @param name @String folder name
 * @param ancestor @String ancestor id
 */
export const createFolderTree = catchAsync(async (req, res, next) => {
  const { name, ancestor } = req.body;

  if (!name || !ancestor) {
    return next(new AppError('Please provide name and ancestor!', 400));
  }

  const updatedRoot = await updateFolderTree('create', {
    _id: ObjectID(),
    name,
    ancestor,
    child: [],
    designation: 'folder',
  });

  res.status(201).json(updatedRoot);
});

/**
 * Delete a folder controler
 * @param id @String folder id
 * @param ancestor @String ancestor id
 */
export const deleteFolder = catchAsync(async (req, res, next) => {
  const { id, ancestor } = req.body;

  if (!id || !ancestor) {
    return next(new AppError('Please provide id and ancestor!', 400));
  }

  const updatedRoot = await updateFolderTree('delete', { id, ancestor });

  res.status(202).json(updatedRoot);
});

// Create folder tree controller
export const createFolderRoot = catchAsync(async (req, res, next) => {
  const newFolder = await Folder.create({
    name: 'Root',
    child: [],
    designation: 'root',
  });
  res.status(201).json(newFolder);
});
