const express =require('express')
const router = express.Router()
const cartController = require("../controllers/cart.controller")

router.post('/addtocart', cartController.addToCart)
router.post('/cart', cartController.createCart)
router.get('/cart', cartController.getCart)
router.get('/cart/:id', cartController.getCartById);
router.put('/cart/:id', cartController.updateCart);
router.delete('/cart/:id', cartController.deleteAllCart);
router.delete('/decreasecart/:id', cartController.decreaseCart);

module.exports = router