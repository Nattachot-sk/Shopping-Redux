const express =require('express')
const router = express.Router()
const categoryController = require("../controllers/category.controller")

router.post('/category', categoryController.createCategory)
router.get('/category', categoryController.getCategory)
router.get('/category/:id', categoryController.getCategoryById);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

module.exports = router