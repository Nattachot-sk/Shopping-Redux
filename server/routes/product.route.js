const express =require('express')
const router = express.Router()
const productController = require("../controllers/product.controller")
const  upload = require('../middleware/multer');
const multer = require('multer');



router.post('/product', upload.single('image'), productController.createProduct)
router.get('/product', productController.getProduct)
router.get('/product/:id', productController.getProductById);
router.put('/product/:id', productController.UpdateProduct);
router.delete('/product/:id', productController.DeleteProduct);

module.exports = router