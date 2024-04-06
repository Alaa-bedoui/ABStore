const db = require("../database/index");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const util = require('util');
const dotenv = require('dotenv').config();

const queryAsync = util.promisify(db.query).bind(db);
const secretKey = process.env.SECRET_KEY;

const selectAll = async (req, res) => {
  try {
    const items = await queryAsync("SELECT * FROM item");
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getFavByUser = async (req, res) => {
  try {
    const userId = req.params.iduser;
    const favs = await queryAsync('SELECT i.*, f.idfavourites FROM favourites f JOIN item i ON f.item_iditem = i.iditem WHERE f.users_id = ?', [userId]);
    res.status(200).send(favs);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const addFav = async (req, res) => {
  try {
    const userId = req.params.iduser;
    const itemId = req.params.iditem;
    const result = await queryAsync('INSERT INTO store.favourites (users_id, item_iditem) VALUES (?, ?)', [userId, itemId]);
    res.status(200).send(result);
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

    const userId = result.insertId;
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    const updateResult = await queryAsync('UPDATE users SET token = ? WHERE id = ?', [token, userId]);

    if (updateResult instanceof Error) {
      console.error('Error updating token:', updateResult.message);
      return res.status(500).json({ error: 'Registration failed' });
    }

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [user] = await queryAsync('SELECT idusers, password FROM users WHERE email = ?', [email]);

    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const token = jwt.sign({ userId: user.idusers }, secretKey, { expiresIn: '1h' });
    res.status(200).json({ token, id: user.idusers });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
};

const selectOne = async (req, res) => {
  try {
    const item = await queryAsync('SELECT * FROM item WHERE iditem = ?', [req.params.id]);
    res.status(200).send(item);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const add = async (req, res) => {
  try {
    const result = await queryAsync('INSERT INTO item SET ?', req.body);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const update = async (req, res) => {
  try {
    const result = await queryAsync('UPDATE item SET ? WHERE iditem = ?', [req.body, req.params.id]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const remove = async (req, res) => {
  try {
    const result = await queryAsync('DELETE FROM item WHERE iditem = ?', [req.params.id]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { selectAll, add, remove, update, selectOne, signUp, login, addFav, getFavByUser };
