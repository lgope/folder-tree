import express from 'express';
const router = express.Router();

// Folder controller
import * as folderTreeController from '../controllers/folderTreeController.js';

// @route GET api/folders-tree
// @desc Get All folder
// @access Public
router.get('/', folderTreeController.getFoldersTree);

// @route POST api/folders-tree/create
// @desc Create An folder
router.post('/create', folderTreeController.createFolderTree);

// @route DELETE api/folders-tree/delete
// @desc Delete An folder
router.delete('/delete', folderTreeController.deleteFolder);

// router.post('/create-root', folderTreeController.createFolderRoot);
export default router;
