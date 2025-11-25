import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/userModel.js";
import { TOKEN_KEY } from "../config/config.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: ['id', 'username', 'email', 'isAnonymous'],
      where: { state: true }
    });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOneUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUsers = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "all input is required" });
    }

    const oldUser = await UserModel.findOne({ where: { email } });
    if (oldUser) {
      return res.status(409).json({ message: "email already exist" });
    }

    const encryptedPassword = await bcrypt.hash(password, 10);
    
    const users = await UserModel.create({
      username,
      email: email.toLowerCase().trim(),
      password: encryptedPassword,
      isAnonymous: false
    });

    const token = jwt.sign(
      { user_id: users.id, email },
      TOKEN_KEY,
      { expiresIn: "1h" }
    );

    const userData = {
      id: users.id,
      username: users.username,
      email: users.email,
      isAnonymous: users.isAnonymous
    };

    res.status(201).json({ user: userData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Nuevo: Crear usuario anónimo
export const createAnonymousUser = async (req, res) => {
  try {
    const anonymousUsername = `Anonymous_${Date.now()}`;
    
    const user = await UserModel.create({
      username: anonymousUsername,
      email: null,
      password: null,
      isAnonymous: true
    });

    const token = jwt.sign(
      { user_id: user.id, isAnonymous: true },
      TOKEN_KEY,
      { expiresIn: "24h" }
    );

    const userData = {
      id: user.id,
      username: user.username,
      isAnonymous: user.isAnonymous
    };

    res.status(201).json({ user: userData, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ message: "username is required" });
    }
    const userD = await UserModel.findOne({ where: { id: req.params.id } });
    if (userD) {
      userD.set({ ...userD, username });
      await userD.save();
      res.status(200).json({ message: "update" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUsersEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    const oldUser = await UserModel.findOne({ where: { email: email } });
    if (oldUser) {
      return res.status(409).json({ message: "email already exist" });
    }
    const userD = await UserModel.findOne({ where: { id: req.params.id } });
    if (userD) {
      userD.set({ ...userD, email: email });
      await userD.save();
      res.status(200).json({ message: "update" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUsersPassword = async (req, res) => {
  try {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ message: "password is required" });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userD = await UserModel.findOne({ where: { id: req.params.id } });
    if (userD) {
      userD.set({ ...userD, password: encryptedPassword });
      await userD.save();
      res.status(200).json({ message: "update" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUsers = async (req, res) => {
  try {
    const user = await UserModel.findOne({ where: { id: req.params.id } });
    if (user) {
      user.set({ ...user, state: false });
      await user.save();
      res.status(200).json({ message: "delete" });
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: "All input is required" });
    }
    const user = await UserModel.findOne({
      where: { email: email.toLowerCase() },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ user_id: user.id, email }, TOKEN_KEY, {
      expiresIn: "1h",
    });
    const dataUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      isAnonymous: user.isAnonymous
    };
    res.status(200).json({ user: dataUser, token: token });
  } catch (err) {
    console.error("Login:", err.message);
    res.status(500).json({ error: err.message });
  }
};