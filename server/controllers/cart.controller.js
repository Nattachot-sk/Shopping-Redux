const prisma = require("../prisma/prisma");


const addToCart = async (req, res) => {
  try {
    const { userId, productId, cartQuantity } = req.body;
    let cart = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
      include: {
        product: true,
      },
    });
    if (cart) {
      cart = await prisma.cart.update({
        where: {
          userId_productId: {
            userId: userId,
            productId: productId,
          },
        },
        data: {
          cartQuantity: {
            increment: parseInt(cartQuantity),
          },
        },
      });
    } else {
      cart = await prisma.cart.create({
        data: {
          userId,
          productId,
          cartQuantity: parseInt(cartQuantity),
        },
      });
    }
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createCart = async (req, res) => {
  try {
    const { productId, userId, cartQuantity } = req.body;
    if (!productId || !userId || !cartQuantity) {
      return res.json({ message: "โปรดใส่ให้ครบ" });
    }
    const cart = await prisma.cart.create({
      data: {
        productId: productId,
        userId: userId,
        cartQuantity: cartQuantity,
      },
    });

    res.status(201).json(cart);
  } catch (error) {
    res.status(401).json({ message: "เกิดข้อผิดพลาดในการสร้าง" });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await prisma.cart.findMany({
      include: {
        product: true,
      },
    });
    res.status(201).json(cart);
  } catch (error) {
    res.status(401).json({ message: "เกิดข้อผิดพลาดในการหา" });
  }
};

const getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await prisma.cart.findUnique({
      where: { id: Number(id) },
    });
    res.status(201).json(cart);
  } catch (error) {
    res.status(401).json({ message: "เกิดข้อผิดพลาดในการสร้าง" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, userId, cartQuantity } = req.body;

    const cart = await prisma.cart.update({
      where: {
        id: Number(id),
      },
      data: {
        productId: productId,
        userId: userId,
        cartQuantity: cartQuantity,
      },
    });
    res.status(201).json(cart);
  } catch (error) {
    res.status(401).json({ message: "เกิดข้อผิดพลาดในกาแก้ไข" });
  }
};
const deleteAllCart = async (req, res) => {
  try {
    const userId = Number(req.params.id);
    const cart = await prisma.cart.deleteMany({
      where: {
        userId: userId,
      },
    });
    res.status(201).json({ message: "ลบสำเร็จ", cart });
  } catch (error) {
    res.status(401).json({ message: "เกิดข้อผิดพลาดในการลบ" });
  }
};
const decreaseCart = async (req, res) => {
  try {
    const { userId, productId, cartQuantity } = req.body;
    let cart = await prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
      include: {
        product: true,
      },
    });

    if (cart) {
      const newQuantity = cart.cartQuantity - parseInt(cartQuantity);

      if (newQuantity < 1) {
        res
          .status(400)
          .json({ message: "จำนวนในตะกร้าไม่สามารถน้อยกว่า 1 ได้" });
        return;
      }

      cart = await prisma.cart.update({
        where: {
          userId_productId: {
            userId: userId,
            productId: productId,
          },
        },
        data: {
          cartQuantity: newQuantity,
        },
      });
    }
    res.status(201).json({ message: "ลบสำเร็จ", cart });
  } catch (error) {
    res.status(401).json({ message: "เกิดข้อผิดพลาดในการลบ" });
  }
};

module.exports = {
  addToCart,
  createCart,
  getCart,
  getCartById,
  updateCart,
  deleteAllCart,
  decreaseCart,
};
