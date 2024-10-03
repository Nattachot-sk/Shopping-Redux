const prisma = require("../prisma/prisma");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "โปรดกรอกให้ครบ" });
    }
    const checkcategory = await prisma.category.findUnique({ where: { name: name } });
    if (checkcategory) {
      return res.status(400).json({ message: "มีข้อมูลอยู่แล้ว" });
    }

    const category = await prisma.category.create({
      data: { name: name },
    });

    res.status(201).json({ message: "เพิ่มข้อมูลสำเร็จ", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการสร้างหมวดหมู่" });
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await prisma.category.findMany();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: { name: name },
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const categoryId = Number(req.params.id);
    const category = await prisma.category.delete({
      where: { id: categoryId },
    });
    res.status(201).json( { message: "delete success",category});
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};

module.exports = {
  createCategory,
  getCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
