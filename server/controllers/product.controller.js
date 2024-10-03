const prisma = require("../prisma/prisma");
const {uploadCloudinary} = require("../tools/fileupload");

const createProduct = async (req, res) => {
  try {
    const { name, description, gender, size} = req.body;

    const price = parseInt(req.body.price);
    const quantity = parseInt(req.body.quantity);
    const categoryId = parseInt(req.body.categoryId);

    if (isNaN(price) || isNaN(quantity)) {
      return res.status(400).json({ message: "ราคาและจำนวนต้องเป็นตัวเลข" });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "โปรดอัปโหลดรูปภาพ" });
    }
    const imageUrl = await uploadCloudinary(file);
    if (!name ||  !description || !gender || !size || !price || !quantity || !categoryId) {
      return res.status(400).json({ message: "โปรดกรอกข้อมูลให้ครบถ้วน" });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        image: imageUrl,
        description: description,
        gender: gender,
        size: size,
        price: price,
        quantity: quantity,
        categoryId: categoryId,
      },
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
};

const getProduct = async (req, res) => {
  try {
    const DataProduct = await prisma.product.findMany();
    res.send(DataProduct);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const UpdateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, description,gender,size, price, quantity, categoryId } = req.body;

    const newProduct = await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        image: image,
        description: description,
        gender: gender,
        size: size,
        price: price,
        quantity: quantity,
        categoryId: categoryId,
      },
    });
    res.json(newProduct);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json({
      message: "Delete success",
      product,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  UpdateProduct,
  DeleteProduct,
};
