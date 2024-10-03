const prisma = require("../prisma/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const registerUser = async (req, res) => {
  try {
    const { email, password, confirmpassword, firstname, lastname, age } = req.body;


    if (!email || !password || !confirmpassword || !firstname || !lastname || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (age < 18) {
      return res.status(400).json({ message: "อายุต่ำกว่า 18 ปี" });
    }


    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    if (password !== confirmpassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const hash = await bcrypt.hash(password, saltRounds);
    
    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hash,
        firstname: firstname,
        lastname: lastname,
        age: age
      },
    });

    return res.status(201).json({ message: "register success", newUser });
  } catch (error) {
    console.error(error); 
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, `${process.env.JWTSECRET}`, {
      expiresIn: "1d",
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, firstname, lastname, age } = req.body;
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        email: email,
        firstname: firstname,
        lastname: lastname,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    res.json("delete succes");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  registerUser,
  LoginUser,
  getUserById,
  updateUser,
  deleteUser,
};
