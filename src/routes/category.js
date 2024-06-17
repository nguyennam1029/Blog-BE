import * as controllers from'../controllers';
import express from 'express';
import { verifyToken } from '../middlewares/verify_token';
const router = express.Router()


// router.get('/', controllers.getPosts)
router.use(verifyToken)
router.get('/', controllers.getCategories)
router.post('/', controllers.createNewCategory)
router.put('/', controllers.updateCategory)
router.delete('/', controllers.deleteCategory)
module.exports = router