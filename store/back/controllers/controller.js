const db = require("../database/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const dotenv = require('dotenv').config()

const queryAsync = util.promisify(db.query).bind(db);
const secretKey = process.env.SECRET_KEY;

const selectAll = async function (req, res) {
  try {
    const items = await queryAsync("SELECT * FROM item");
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const signUp = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await queryAsync('INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashedPassword, username]);

if (result instanceof Error) {
  console.error('Error executing query:', result.message);
  return res.status(500).json({ error: 'Registration failed' });
}

console.log(result);

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await queryAsync('SELECT * FROM users WHERE email = ?', [email]);
    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const userPassword = rows.password;
    const passwordMatch = await bcrypt.compare(password, userPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId:rows.idusers }, secretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = login;

const selectOne = async function (req, res) {
  try {
    const items = await queryAsync(`SELECT * FROM item where iditem=${req.params.id}`);
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

const add = async function (req, res) {
  try {
    const items = await queryAsync('INSERT INTO item SET ?', req.body);
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

const update = async function (req, res) {
  try {
    const items = await queryAsync(`UPDATE item SET ? WHERE iditem=${req.params.id}`, req.body);
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

const remove = async function (req, res) {
  try {
    const items = await queryAsync(`DELETE FROM item WHERE iditem=${req.params.id}`);
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = { selectAll, add, remove, update, selectOne, signUp, login };
